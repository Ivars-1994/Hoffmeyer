// netlify/functions/nearby-cities.js
// Liefert Nachbarorte im Radius um eine Stadt (OpenPLZ + OSM Overpass + lokaler Fallback)

const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.osm.ch/api/interpreter',
];

const LOCAL_RADIUS_FALLBACKS = {
  essen: [
    { name: 'Gelsenkirchen', km: 8 }, { name: 'Bottrop', km: 9 },
    { name: 'Mülheim an der Ruhr', km: 10 }, { name: 'Oberhausen', km: 11 },
    { name: 'Bochum', km: 14 }, { name: 'Velbert', km: 14 }, { name: 'Hattingen', km: 14 },
    { name: 'Duisburg', km: 17 }, { name: 'Herne', km: 17 }, { name: 'Herten', km: 18 },
    { name: 'Ratingen', km: 21 }, { name: 'Recklinghausen', km: 22 },
    { name: 'Marl', km: 23 }, { name: 'Dorsten', km: 23 }, { name: 'Mettmann', km: 23 },
    { name: 'Wuppertal', km: 24 }, { name: 'Castrop-Rauxel', km: 24 },
    { name: 'Schwelm', km: 27 }, { name: 'Düsseldorf', km: 31 }, { name: 'Dortmund', km: 32 },
  ],
};

const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'public, max-age=3600',
};

function normalizePlaceName(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/,\s*(Stadt|Kreisstadt|Landeshauptstadt)$/i, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function localRadiusFallback(city, limit) {
  const items = LOCAL_RADIUS_FALLBACKS[normalizePlaceName(city)];
  return items ? items.slice(0, limit) : [];
}

async function fetchWithTimeout(url, opts = {}, ms = 6000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try { return await fetch(url, { ...opts, signal: ctrl.signal }); }
  finally { clearTimeout(t); }
}

async function nominatim(q) {
  try {
    const r = await fetchWithTimeout(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=de&q=${encodeURIComponent(q)}`,
      { headers: { 'User-Agent': 'oppenheimer-wespen/1.0 (kammerjaeger-oppenheimer.de)' } },
      6000,
    );
    if (!r.ok) return null;
    const d = await r.json();
    const hit = d?.[0];
    if (!hit) return null;
    return { lat: parseFloat(hit.lat), lon: parseFloat(hit.lon) };
  } catch { return null; }
}

function localityMatches(row, normalizedCity) {
  if (!normalizedCity) return false;
  const rowName = normalizePlaceName(row?.name);
  const municipalityName = normalizePlaceName(row?.municipality?.name);
  return rowName === normalizedCity || municipalityName === normalizedCity;
}

async function openplzByName(name) {
  try {
    const r = await fetchWithTimeout(
      `https://openplzapi.org/de/Localities?name=${encodeURIComponent(name)}`, {}, 2500,
    );
    if (!r.ok) return null;
    const d = await r.json();
    const rows = Array.isArray(d) ? d : [];
    if (!rows.length) return null;
    const wanted = normalizePlaceName(name);
    const exactRows = rows.filter((row) => localityMatches(row, wanted));
    const hit =
      exactRows.find((row) =>
        /,\s*(Stadt|Kreisstadt|Landeshauptstadt)$/i.test(String(row?.municipality?.name || '')),
      ) || exactRows[0] || rows[0] || null;
    return hit?.name ? hit : null;
  } catch { return null; }
}

async function nominatimCanonical(name) {
  try {
    const r = await fetchWithTimeout(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=de&addressdetails=1&q=${encodeURIComponent(name + ', Deutschland')}`,
      { headers: { 'User-Agent': 'oppenheimer-wespen/1.0 (kammerjaeger-oppenheimer.de)' } },
      5000,
    );
    if (!r.ok) return null;
    const d = await r.json();
    const hit = d?.[0];
    if (!hit) return null;
    const addr = hit.address || {};
    const canonical = addr.city || addr.town || addr.village || addr.municipality || hit.name;
    return canonical || null;
  } catch { return null; }
}

async function lookupLocality(city, plz) {
  if (plz && /^\d{5}$/.test(plz)) {
    try {
      const r = await fetchWithTimeout(
        `https://openplzapi.org/de/Localities?postalCode=${encodeURIComponent(plz)}`, {}, 2500,
      );
      if (r.ok) {
        const d = await r.json();
        const hit = Array.isArray(d) ? d[0] : null;
        if (hit?.name) return hit;
      }
    } catch {}
  }
  if (city) {
    const direct = await openplzByName(city);
    if (direct) return direct;
    // Fallback: canonicalize via Nominatim (fixes missing umlauts like Duren -> Düren)
    const canonical = await nominatimCanonical(city);
    if (canonical && canonical.toLowerCase() !== String(city).toLowerCase()) {
      const viaCanonical = await openplzByName(canonical);
      if (viaCanonical) return viaCanonical;
    }
  }
  return null;
}

async function districtCitiesFromLocality(hit, limit) {
  const districtKey = hit?.district?.key;
  if (!districtKey) return [];
  try {
    const r = await fetchWithTimeout(
      `https://openplzapi.org/de/Districts/${encodeURIComponent(districtKey)}/Localities?page=1&pageSize=50`,
      {}, 2500,
    );
    if (!r.ok) return [];
    const rows = await r.json();
    const originKey = String(hit.name || '').toLowerCase();
    const seen = new Set();
    const cities = [];
    for (const row of rows) {
      const rawName = row?.name || row?.municipality?.name;
      if (!rawName) continue;
      const name = String(rawName).replace(/,\s*Stadt$/i, '');
      const key = name.toLowerCase();
      if (key === originKey || seen.has(key)) continue;
      seen.add(key);
      cities.push({ name, km: null });
      if (cities.length >= limit) break;
    }
    return cities;
  } catch { return []; }
}

async function geocode(city, plz) {
  const hit = await lookupLocality(city, plz);
  if (hit?.name) {
    const queries = [
      `${hit.name}, ${hit.federalState?.name || ''}, Deutschland`,
      `${hit.name}, Deutschland`,
      [hit.postalCode, hit.name, hit.federalState?.name, 'Deutschland'].filter(Boolean).join(', '),
    ];
    for (const query of queries) {
      const coords = await nominatim(query);
      if (coords) return { name: hit.name, ...coords, locality: hit };
    }
  }
  if (city) {
    const coords = await nominatim(`${city}, Deutschland`);
    if (coords) return { name: city, ...coords };
  }
  return null;
}

async function overpassNearby(lat, lon, radiusMeters) {
  const radiusKm = radiusMeters / 1000;
  const latDelta = radiusKm / 111.32;
  const lonDelta = radiusKm / (111.32 * Math.max(Math.cos((lat * Math.PI) / 180), 0.2));
  const south = lat - latDelta, west = lon - lonDelta;
  const north = lat + latDelta, east = lon + lonDelta;
  const query = `[out:json][timeout:20];
(
  node["place"~"^(city|town|village)$"](${south},${west},${north},${east});
  way["place"~"^(city|town|village)$"](${south},${west},${north},${east});
  relation["place"~"^(city|town|village)$"](${south},${west},${north},${east});
);
out center tags 500;`;
  for (const ep of OVERPASS_ENDPOINTS) {
    try {
      const r = await fetchWithTimeout(ep, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          Accept: 'application/json',
          'User-Agent': 'oppenheimer-wespen/1.0 (kammerjaeger-oppenheimer.de)',
        },
        body: new URLSearchParams({ data: query }).toString(),
      }, 10000);
      if (!r.ok) continue;
      const json = await r.json();
      if (Array.isArray(json?.elements) && json.elements.length > 0) return json;
    } catch {}
  }
  return null;
}

function haversineKm(a, b) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function parsePopulation(value) {
  const n = parseInt(String(value || '').replace(/[.,\s]/g, ''), 10);
  return Number.isFinite(n) ? n : 0;
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };
  if (event.httpMethod !== 'GET') return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: 'Method not allowed' }) };

  const q = event.queryStringParameters || {};
  const city = (q.city || '').trim().substring(0, 60);
  const plz = (q.plz || '').replace(/[^0-9]/g, '').substring(0, 5);
  const radiusKm = Math.min(Math.max(parseInt(q.radius || '50', 10) || 50, 5), 100);
  const limit = Math.min(Math.max(parseInt(q.limit || '20', 10) || 20, 5), 30);
  const fast = q.fast === '1';

  if (!city && !plz) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'city oder plz erforderlich' }) };
  }

  try {
    const locality = await lookupLocality(city, plz);
    if (fast && locality?.name) {
      const cities = await districtCitiesFromLocality(locality, limit);
      const reliableCities = cities.length ? cities : localRadiusFallback(locality.name || city, limit);
      return {
        statusCode: 200, headers: CORS,
        body: JSON.stringify({ origin: locality.name, radiusKm, cities: reliableCities, source: 'district' }),
      };
    }

    const origin = await geocode(city, plz);
    if (!origin) {
      const fb = localRadiusFallback(city, limit);
      if (fb.length) {
        return { statusCode: 200, headers: CORS, body: JSON.stringify({ origin: city, radiusKm, cities: fb, source: 'radius', fallback: true }) };
      }
      return { statusCode: 404, headers: CORS, body: JSON.stringify({ error: 'Ort nicht gefunden' }) };
    }

    const osm = await overpassNearby(origin.lat, origin.lon, radiusKm * 1000);
    if (!osm?.elements) {
      const localCities = localRadiusFallback(origin.name || city, limit);
      const cities = localCities.length
        ? localCities
        : await districtCitiesFromLocality(origin.locality || locality, limit);
      return {
        statusCode: 200, headers: CORS,
        body: JSON.stringify({ origin: origin.name, radiusKm, cities, source: 'district', fallback: true }),
      };
    }

    const normOrigin = normalizePlaceName(origin.name);
    const seen = new Set();
    const items = [];
    const placeRank = { city: 0, town: 1, village: 2 };

    for (const el of osm.elements) {
      const name = el.tags?.name;
      if (!name) continue;
      const key = normalizePlaceName(name);
      if (key === normOrigin || seen.has(key)) continue;
      seen.add(key);

      const lat = el.lat ?? el.center?.lat;
      const lon = el.lon ?? el.center?.lon;
      if (typeof lat !== 'number' || typeof lon !== 'number') continue;

      const pop = parsePopulation(el.tags.population);
      const dist = haversineKm(origin, { lat, lon });
      if (dist > radiusKm) continue;

      items.push({
        name,
        distanceKm: Math.round(dist),
        population: pop,
        rank: placeRank[el.tags.place] ?? 3,
      });
    }

    items.sort((a, b) => {
      if (a.distanceKm !== b.distanceKm) return a.distanceKm - b.distanceKm;
      if (a.rank !== b.rank) return a.rank - b.rank;
      return b.population - a.population;
    });

    const cities = items.slice(0, limit).map((x) => ({ name: x.name, km: x.distanceKm }));
    const reliableCities = cities.length ? cities : localRadiusFallback(origin.name || city, limit);

    return {
      statusCode: 200, headers: CORS,
      body: JSON.stringify({ origin: origin.name, radiusKm, cities: reliableCities, source: 'radius' }),
    };
  } catch (err) {
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: 'Interner Fehler' }) };
  }
};
