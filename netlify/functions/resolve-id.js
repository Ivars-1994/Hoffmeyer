// netlify/functions/resolve-id.js
const path = require("path");
const fs = require("fs");

function corsHeaders() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders(), body: "" };
  }
  const headers = corsHeaders();

  const id = event.queryStringParameters?.id?.trim();
  if (!id) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "ID fehlt" }) };
  }

  // JSON liegt neben der Function (wie bei dir)
  const jsonPath = path.join(__dirname, "stadt_map_complete.json");
  let stadtMap;
  try {
    stadtMap = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Fehler beim Lesen der stadt_map_complete.json", details: err.message }),
    };
  }

  const raw = stadtMap[String(id)];
  if (!raw) {
    return { statusCode: 404, headers, body: JSON.stringify({ error: "Unbekannte ID", id }) };
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
      const url = `https://openplzapi.org/de/Localities?postalCode=${encodeURIComponent(plz)}`;
      const resp = await fetch(url);
      if (!resp.ok) {
        return { statusCode: resp.status, headers, body: JSON.stringify({ error: "API nicht OK", status: resp.status }) };
      }
      const data = await resp.json();
      const stadt = data?.[0]?.name || null;
      if (stadt) {
        return { statusCode: 200, headers, body: JSON.stringify({ id, typ: "plz-lookup", stadt, plz }) };
      }
      // Fallback: Keine Stadt gefunden → trotzdem etwas Sinnvolles zurückgeben
      return { statusCode: 404, headers, body: JSON.stringify({ error: "Stadt nicht gefunden", id, plz }) };
    } catch (e) {
      return { statusCode: 502, headers, body: JSON.stringify({ error: "API Fehler", details: String(e) }) };
    }
  }

  // Case C: kein PLZ-Format -> direkter Name
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ id, typ: "direct-name", stadt: val, plz: null }),
  };
};
