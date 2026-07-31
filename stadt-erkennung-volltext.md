# Vollständiger Code-Abschnitt: Stadt-Erkennung per Tabelle

Diese Datei enthält alle relevanten Code-Stellen, die mit der Stadt-Erkennung über die Mapping-Tabelle `stadt_map_complete.json` zusammenhängen.

---

## 1. Inline Stadt-Erkennung in der statischen Startseite

Dateien: `index.html`, `public/index.html`, `public/static-home.html` (identisch)

```html
<!-- ============ INLINE SCRIPTS (city detection + deferred tracking) ============ -->
<script>
(function(){
  // Year
  document.getElementById('yr').textContent = new Date().getFullYear();

  // === City detection (URL params + sessionStorage) ===
  function qp(n){ var v = new URLSearchParams(location.search).get(n); return v ? v.trim() : ''; }
  function clean(raw){ return raw.replace(/[^a-zA-ZäöüÄÖÜß \-]/g,'').substring(0,40).replace(/\s+/g,' ').trim(); }
  function tc(s){ return s.replace(/\w\S*/g, function(t){ return t.charAt(0).toUpperCase()+t.slice(1).toLowerCase(); }); }

  function setCity(name){
    if(!name) return;
    var clean1 = tc(clean(name));
    if(!clean1 || clean1.length < 2) return;
    var el = document.getElementById('cityName');
    if(el) el.textContent = clean1;
    document.title = 'Kammerjäger Oppenheimer in ' + clean1 + ' – 24/7 Notdienst';
    try {
      sessionStorage.setItem('cityName', clean1);
      sessionStorage.setItem('cityData', JSON.stringify({name: clean1, plz: '00000'}));
    } catch(e){}
  }

  function storedFallback(){
    try {
      var stored = sessionStorage.getItem('cityName');
      if(stored) setCity(stored);
    } catch(e){}
  }

  function resolveLocationId(locId){
    var id = (locId || '').replace(/[^0-9]/g,'').substring(0,15);
    if(!id || id.length < 5){ storedFallback(); return; }
    if(id === '9043934'){ setCity('Essen'); return; }
    fetch('/.netlify/functions/resolve-id?id=' + encodeURIComponent(id), {cache:'no-store'})
      .then(function(resp){ return resp.ok ? resp.json() : null; })
      .then(function(data){
        if(data && data.stadt) setCity(data.stadt);
        else storedFallback();
      })
      .catch(storedFallback);
  }

  // 1) URL param ?city=
  var cityParam = qp('city');
  var blocked = /location|\{|\}/i.test(cityParam);
  if(cityParam && !blocked){ setCity(cityParam); }
  else {
    // 2) Google Ads location ID: loc_physical_ms=9043934 -> Essen
    var locId = qp('loc_physical_ms') || qp('mslocid') || qp('lcid') || qp('city_id') || qp('loc');
    if(locId){
      resolveLocationId(locId);
    } else {
      // 3) extract from kw param last word
      var kw = qp('kw');
      if(kw){
        var words = decodeURIComponent(kw).replace(/\+/g,' ').split(' ');
        var last = words[words.length-1];
        if(last && last.length >= 3 && /^[a-zA-ZäöüÄÖÜß]+$/.test(last) &&
           !/^(entfernen|bek(ä|ae)mpfen|hilfe|service|kosten|preise|notdienst|24h|sofort|sch(ä|ae)dlingsbek(ä|ae)mpfung|kammerj(ä|ae)ger|wespen|ratten|bettwanzen|m(ä|ae)use|ungeziefer|sch(ä|ae)dling|desinfektion)$/i.test(last)){
          setCity(last);
        } else {
          storedFallback();
        }
      } else {
        storedFallback();
      }
    }
  }
})();
</script>
```

---

## 2. Netlify Function: `resolve-id.js` (liest die Mapping-Tabelle)

```javascript
// netlify/functions/resolve-id.js
const path = require("path");
const fs = require("fs");

const ALLOWED_ORIGINS = [
  'https://kammerjaeger-oppenheimer.de',
  'https://www.kammerjaeger-oppenheimer.de',
  'http://localhost:5173',
  'http://localhost:8888'
];

function corsHeaders(origin) {
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

exports.handler = async (event) => {
  const origin = event.headers.origin || event.headers.Origin || '';
  const headers = corsHeaders(origin);

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const rawId = event.queryStringParameters?.id;

  if (!rawId) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "ID fehlt" }) };
  }

  // Sanitize: only allow digits, max 15 chars
  const id = rawId.replace(/[^0-9]/g, '').substring(0, 15);

  if (!id || id.length < 5) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Ungültige ID" }) };
  }

  // JSON liegt neben der Function
  const jsonPath = path.join(__dirname, "stadt_map_complete.json");
  let stadtMap;
  try {
    stadtMap = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Interner Fehler" }),
    };
  }

  const raw = stadtMap[String(id)];
  if (!raw) {
    return { statusCode: 404, headers, body: JSON.stringify({ error: "Unbekannte ID" }) };
  }

  const val = String(raw).trim();

  // Case A: 5-stellige PLZ
  const isFiveDigit = /^\d{5}$/.test(val);
  // Case B: 4-stellig -> führende 0 ergänzen
  const isFourDigit = /^\d{4}$/.test(val);
  const plz = isFiveDigit ? val : (isFourDigit ? ("0" + val) : null);

  // Wenn wir eine PLZ haben, versuche OpenPLZ
  if (plz) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const url = `https://openplzapi.org/de/Localities?postalCode=${encodeURIComponent(plz)}`;
      const resp = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!resp.ok) {
        return { statusCode: 502, headers, body: JSON.stringify({ error: "Externe API nicht erreichbar" }) };
      }
      const data = await resp.json();
      const stadt = data?.[0]?.name || null;
      if (stadt) {
        return { statusCode: 200, headers, body: JSON.stringify({ id, typ: "plz-lookup", stadt, plz }) };
      }
      return { statusCode: 404, headers, body: JSON.stringify({ error: "Stadt nicht gefunden" }) };
    } catch (e) {
      return { statusCode: 502, headers, body: JSON.stringify({ error: "Externe API nicht erreichbar" }) };
    }
  }

  // Case C: kein PLZ-Format -> direkter Name
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ id, typ: "direct-name", stadt: val, plz: null }),
  };
};
```

### Mapping-Tabelle

- Datei: `netlify/functions/stadt_map_complete.json`
- Format: `{ "<loc_id>": "<postleitzahl oder stadtname>" }`
- Beispiel: `{ "9043934": "45141" }` → wird via OpenPLZ zu **Essen** aufgelöst.
- Konfiguration in `netlify.toml`:
  ```toml
  [functions]
    included_files = ["netlify/functions/stadt_map_complete.json"]
  ```

---

## 3. React-Logik: `src/pages/Index.tsx`

```typescript
const Index = () => {
  const { service: serviceSlug } = useParams<{ service?: string }>();

  const urlParams = new URLSearchParams(window.location.search);
  const cityParam = urlParams.get("city");
  const kwParam = urlParams.get("kw");
  const locId = urlParams.get("loc_physical_ms") || urlParams.get("mslocid") || urlParams.get("lcid") || urlParams.get("loc") || urlParams.get("city_id");

  const serviceConfig = serviceSlug ? getServiceConfig(serviceSlug) : null;

  const [cityData, setCityData] = useState<CityData | null>(null);

  useEffect(() => {
    const handleCityDetected = (event: CustomEvent<CityData>) => {
      setCityData(event.detail);
    };
    window.addEventListener('cityDetected', handleCityDetected as EventListener);
    return () => window.removeEventListener('cityDetected', handleCityDetected as EventListener);
  }, []);

  useEffect(() => {
    // Priorität 1: Direkter city Parameter
    if (cityParam) {
      const isGoogleAdsPlaceholder = cityParam.toLowerCase().includes('location') ||
                                   cityParam.includes('{') ||
                                   cityParam.includes('}') ||
                                   cityParam.toLowerCase() === 'locationcity';

      if (!isGoogleAdsPlaceholder) {
        const cleanedCity = cityParam.replace(/[^a-zA-ZäöüÄÖÜß \-]/g,"").substring(0,40).trim();
        const cityName = cleanedCity.charAt(0).toUpperCase() + cleanedCity.slice(1).toLowerCase();
        const newCityData = { name: cityName, plz: "00000" };
        setCityData(newCityData);
        sessionStorage.setItem('cityName', cityName);
        sessionStorage.setItem('cityData', JSON.stringify(newCityData));
        window.dispatchEvent(new CustomEvent('cityDetected', { detail: newCityData }));
        return;
      }
    }

    // Priorität 2: Stadt aus kw Parameter extrahieren
    if (kwParam) {
      const searchTerm = decodeURIComponent(kwParam).replace(/\+/g, " ");
      const words = searchTerm.split(" ");
      let cityName = words[words.length - 1];

      const isValidCity = cityName.length >= 3 &&
                         !/^(entfernen|bekämpfen|hilfe|service|kosten|preise|notdienst|24h|sofort|schädlingsbekämpfung|kammerjäger|wespen|ratten|bettwanzen|mäuse|ungeziefer|schädling|desinfektion)$/i.test(cityName) &&
                         /^[a-zA-ZäöüÄÖÜß]+$/.test(cityName);

      if (isValidCity) {
        cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
        const newCityData = { name: cityName, plz: "00000" };
        setCityData(newCityData);
        sessionStorage.setItem('cityName', cityName);
        sessionStorage.setItem('cityData', JSON.stringify(newCityData));
        window.dispatchEvent(new CustomEvent('cityDetected', { detail: newCityData }));
        return;
      }
    }

    // Priorität 3: Netlify Function mit lcid/loc_physical_ms
    if (!locId) return;

    const sanitizedLocId = locId.replace(/[^0-9]/g, '').substring(0, 15);
    if (!sanitizedLocId || sanitizedLocId.length < 5) return;

    if (sanitizedLocId === '9043934') {
      const newCityData = { name: 'Essen', plz: '45141' };
      setCityData(newCityData);
      sessionStorage.setItem('cityData', JSON.stringify(newCityData));
      sessionStorage.setItem('cityName', newCityData.name);
      sessionStorage.setItem('detectedCityData', JSON.stringify(newCityData));
      window.dispatchEvent(new CustomEvent('cityDetected', { detail: newCityData }));
      return;
    }

    const fetchCityFromFunction = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const response = await fetch(`/.netlify/functions/resolve-id?id=${encodeURIComponent(sanitizedLocId)}`, {
          signal: controller.signal,
          cache: 'no-store'
        });
        clearTimeout(timeoutId);
        if (response.ok) {
          const data = await response.json();
          if (!data.stadt) return;
          const newCityData = { name: data.stadt, plz: data.plz || '00000' };
          setCityData(newCityData);
          sessionStorage.setItem('cityData', JSON.stringify(newCityData));
          sessionStorage.setItem('cityName', data.stadt);
          sessionStorage.setItem('detectedCityData', JSON.stringify(newCityData));
          window.dispatchEvent(new CustomEvent('cityDetected', { detail: newCityData }));
        }
      } catch {}
    };
    setTimeout(fetchCityFromFunction, 100);
  }, [cityParam, kwParam, locId]);

  const getDisplayCityName = () => {
    const storedFromKw = sessionStorage.getItem('cityData');
    if (storedFromKw) {
      try {
        const data = JSON.parse(storedFromKw);
        return data.name;
      } catch {}
    }
    if (cityData?.name) return cityData.name;
    const storedFromLcid = sessionStorage.getItem('detectedCityData');
    if (storedFromLcid) {
      try {
        const data = JSON.parse(storedFromLcid);
        return data.name;
      } catch {}
    }
    return "Ihrer Stadt";
  };

  const cityName = getDisplayCityName();

  return (
    <HartmannHero cityName={cityName} brandName="Oppenheimer" />
  );
};
```

---

## 4. Utility: `src/utils/cityDetection.ts`

```typescript
export interface CityData {
  name: string;
  plz: string;
}

const KNOWN_LOCATION_IDS: Record<string, CityData> = {
  "9043934": { name: "Essen", plz: "45141" },
};

export async function detectCity(): Promise<CityData> {
  const urlParams = new URLSearchParams(window.location.search);
  const cityParam = urlParams.get("city");
  const kw = urlParams.get("kw") || urlParams.get("utm_term");
  const locId = urlParams.get("loc_physical_ms") || urlParams.get("mslocid") || urlParams.get("lcid") || urlParams.get("city_id") || urlParams.get("loc");

  // Priorität 0: Geolocation (wenn Consent vorhanden und keine URL-Parameter)
  if (!cityParam && !kw && !locId && hasGeolocationConsent()) {
    const geoCity = await getCityFromGeolocation();
    if (geoCity) return geoCity;
  }

  // Priorität 1: Direkter city Parameter
  if (cityParam) {
    const cleanedCity = cityParam.replace(/[^a-zA-ZäöüÄÖÜß \-]/g,"").substring(0,40).trim();
    const cityName = cleanedCity.charAt(0).toUpperCase() + cleanedCity.slice(1).toLowerCase();
    const cityData = { name: cityName, plz: "00000" };
    sessionStorage.setItem("cityName", cityName);
    sessionStorage.setItem("cityData", JSON.stringify(cityData));
    return cityData;
  }

  // Priorität 2: mslocid/loc_physical_ms/city_id über Netlify Function
  if (locId) {
    const sanitizedLocId = locId.replace(/[^0-9]/g, '').substring(0, 15);
    if (!sanitizedLocId || sanitizedLocId.length < 5) {
      return { name: "Ihrer Stadt", plz: "00000" };
    }

    const knownCity = KNOWN_LOCATION_IDS[sanitizedLocId];
    if (knownCity) {
      sessionStorage.setItem("cityName", knownCity.name);
      sessionStorage.setItem("cityData", JSON.stringify(knownCity));
      return knownCity;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const response = await fetch(`/.netlify/functions/resolve-id?id=${encodeURIComponent(sanitizedLocId)}`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (data.stadt) {
        const capitalizedCity = data.stadt.charAt(0).toUpperCase() + data.stadt.slice(1);
        const plz = data.plz || "00000";
        const cityData = { name: capitalizedCity, plz };
        sessionStorage.setItem("cityName", capitalizedCity);
        sessionStorage.setItem("cityData", JSON.stringify(cityData));
        return cityData;
      }
    } catch {}
  }

  // Priorität 3: Wenn kw/utm_term parameter vorhanden ist
  if (kw) {
    const searchTerm = decodeURIComponent(kw).replace(/\+/g, " ");
    const words = searchTerm.split(" ");
    let cityName = words[words.length - 1];
    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
    const cityData = { name: cityName, plz: "00000" };
    sessionStorage.setItem("cityName", cityName);
    sessionStorage.setItem("cityData", JSON.stringify(cityData));
    return cityData;
  }

  return { name: "Ihrer Stadt", plz: "00000" };
}

export async function detectAndUpdateCity(): Promise<CityData> {
  const cityData = await detectCity();
  window.dispatchEvent(new CustomEvent('cityDetected', { detail: cityData }));
  return cityData;
}
```

---

## 5. Darstellung: `src/components/hartmann/HartmannHero.tsx`

```tsx
interface HartmannHeroProps {
  cityName?: string;
  brandName?: string;
}

const HartmannHero = ({ cityName = "Ihrer Stadt", brandName = "Oppenheimer" }: HartmannHeroProps) => {
  return (
    <section className="bg-[#003311] pt-8 pb-6 md:py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Kammerjäger<br />
              <span className="relative inline-block">
                {cityName}
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#c9a227] origin-left animate-underline-draw"></span>
              </span>
            </h1>
            <p className="text-gray-200 text-lg mb-6 leading-relaxed">
              Wenn Sie einen Schädlingsbefall haben, ist Kammerjäger {brandName} Ihr Partner!
              Wir helfen Ihnen sofort bei jedem Schädlingsbefall weiter. Rufen Sie uns jetzt
              an oder senden Sie eine Anfrage.
            </p>
            ...
          </div>
        </div>
      </div>
    </section>
  );
};
```

---

## 6. Auslieferung & Routing

### `netlify.toml`

```toml
# Statische Homepage auf / (Rewrite, URL bleibt /)
[[redirects]]
  from = "/"
  to = "/static-home.html"
  status = 200

# SPA Fallback für alle anderen Routen
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[functions]
  included_files = ["netlify/functions/stadt_map_complete.json"]
```

### `netlify/edge-functions/prerender.ts` (relevante Stelle)

```typescript
export default async function handler(request: Request, context: Context) {
  if (request.method !== 'GET') return context.next();
  const url = new URL(request.url);

  if (url.pathname === '/' || url.pathname === '') {
    if (!shouldPrerender(request)) {
      try {
        const staticUrl = new URL('/static-home.html', url.origin);
        const staticResp = await fetch(staticUrl.href, {
          headers: { 'x-internal-static-fetch': '1' },
        });
        if (staticResp.ok) {
          const html = await staticResp.text();
          return new Response(html, {
            status: 200,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'public, max-age=0, must-revalidate',
              'X-Static-Home': 'true',
            },
          });
        }
      } catch (e) {
        console.error('[StaticHome] Fehler:', e);
      }
    }
  }
  ...
}
```

---

## Zusammenfassung des Datenflusses

1. Nutzer landet auf `/` mit z. B. `?loc_physical_ms=9043934`.
2. Die statische `static-home.html` (bzw. `index.html`) wird ausgeliefert.
3. Das inline `<script>` prüft zuerst `?city=`, dann `loc_physical_ms`, `mslocid`, `lcid`, `city_id`, `loc`.
4. Bekannte ID `9043934` wird direkt lokal auf **Essen** gemappt.
5. Unbekannte IDs werden an `/.netlify/functions/resolve-id?id=...` geschickt.
6. Die Function liest `stadt_map_complete.json`, ermittelt PLZ oder direkten Namen und frägt bei PLZ die OpenPLZ-API ab.
7. Die Function gibt `{ stadt, plz }` zurück, das Script schreibt `cityName` ins DOM und `sessionStorage`.
8. Die React-App (`/index.html`) wiederholt die gleiche Logik für alle SPA-Routen außer `/`.
