// netlify/functions/resolve-id.js
const path = require("path");
const fs = require("fs");

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://kammerjaeger-hoffmeyer.de',
  'https://www.kammerjaeger-hoffmeyer.de',
  'http://localhost:5173',
  'http://localhost:8888'
];

function corsHeaders(origin) {
  // Check if origin is in the allowed list
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) 
    ? origin 
    : ALLOWED_ORIGINS[0];
    
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

  // Only allow GET requests
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const rawId = event.queryStringParameters?.id;
  
  // Input validation: ID must exist and be numeric with reasonable length
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
      // Fallback: Keine Stadt gefunden
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
