const path = require('path');
const fs = require('fs');

exports.handler = async (event) => {
  const id = event.queryStringParameters?.id;
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "ID fehlt" }),
    };
  }

  const jsonPath = path.join(__dirname, 'stadt_map.json');
  let stadtMap = {};
  try {
    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    stadtMap = JSON.parse(rawData);
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Fehler beim Lesen der stadt_map.json", details: err.message }),
    };
  }

  const value = stadtMap[id];
  if (!value) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Unbekannte ID", id }),
    };
  }

  const apiUrl = `https://openplzapi.org/de/Localities?postalCode=${value}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const stadt = data?.[0]?.name || null;
    if (!stadt) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Stadt nicht gefunden", id }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ id, typ: "plz-lookup", stadt, plz: value }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API Fehler", details: err.message }),
    };
  }
};
