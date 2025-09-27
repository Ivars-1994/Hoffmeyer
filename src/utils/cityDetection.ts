// Einfache Stadt-Erkennung über Netlify-Funktion
export interface CityData {
  name: string;
  plz: string;
}

export async function detectCity(): Promise<CityData> {
  console.log("🚀 DETECTCITY GESTARTET!");
  console.log("🚀 URL:", window.location.href);
  
  const urlParams = new URLSearchParams(window.location.search);
  const cityParam = urlParams.get("city"); // Neuer direkter city Parameter
  const kw = urlParams.get("kw");
  const locId = urlParams.get("loc_physical_ms") || urlParams.get("city_id") || urlParams.get("loc");

  console.log("🔍 DEBUG: Stadt-Erkennung startet mit URL:", window.location.href);
  console.log("🔍 DEBUG: Search params:", window.location.search);
  console.log("🔍 DEBUG: city parameter:", cityParam);
  console.log("🔍 DEBUG: kw parameter:", kw);
  console.log("🔍 DEBUG: loc_physical_ms/city_id/loc:", locId);

  // Priorität 1: Direkter city Parameter
  if (cityParam) {
    const cleanedCity = cityParam.replace(/[^a-zA-ZäöüÄÖÜß \-]/g,"").substring(0,40).trim();
    const cityName = cleanedCity.charAt(0).toUpperCase() + cleanedCity.slice(1).toLowerCase();
    
    console.log("✅ DEBUG: Stadt über city Parameter:", cityName);
    
    const cityData = { name: cityName, plz: "00000" };
    sessionStorage.setItem("cityName", cityName);
    sessionStorage.setItem("cityData", JSON.stringify(cityData));
    return cityData;
  }

  // Priorität 2: Wenn kw parameter vorhanden ist, Stadt aus dem Suchbegriff extrahieren
  if (kw) {
    const searchTerm = decodeURIComponent(kw).replace(/\+/g, " ");
    // Extrahiere die Stadt (meist das letzte Wort nach "kammerjaeger" etc.)
    const words = searchTerm.split(" ");
    let cityName = words[words.length - 1]; // Letztes Wort ist meist die Stadt
    
    // Ersten Buchstaben groß schreiben
    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
    
    console.log("✅ DEBUG: Vollständiger Suchbegriff:", searchTerm);
    console.log("✅ DEBUG: Extrahierte Stadt:", cityName);
    
    const cityData = { name: cityName, plz: "00000" };
    
    sessionStorage.setItem("cityName", cityName);
    sessionStorage.setItem("cityData", JSON.stringify(cityData));
    return cityData;
  }

  // Wenn keine kw aber loc_physical_ms/city_id, dann lokale Datei oder API-Aufruf
  if (!locId) {
    console.log("❌ DEBUG: Keine Parameter gefunden");
    return { name: "Ihrer Stadt", plz: "00000" };
  }

  try {
    // Netlify Function nutzen
    console.log("🔍 DEBUG: Versuche Netlify Function zu nutzen für ID:", locId);
    const netlifyUrl = `/.netlify/functions/resolve-id?id=${locId}`;
    console.log("🌐 DEBUG: Netlify Function URL:", netlifyUrl);
    
    const response = await fetch(netlifyUrl);
    console.log("📡 DEBUG: Response Status:", response.status);
    console.log("📡 DEBUG: Response OK:", response.ok);
    console.log("📡 DEBUG: Response Headers:", response.headers);
    
    if (!response.ok) {
      console.error("❌ DEBUG: Response not OK, status:", response.status);
      const errorText = await response.text();
      console.error("❌ DEBUG: Error response text:", errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    console.log("📥 DEBUG: Netlify Function Antwort:", data);
    console.log("📥 DEBUG: Response data type:", typeof data);
    console.log("📥 DEBUG: Response data keys:", Object.keys(data));

    if (data.stadt) {
      const capitalizedCity = data.stadt.charAt(0).toUpperCase() + data.stadt.slice(1).toLowerCase();
      const realPlz = data.plz || "00000";
      const cityData = { name: capitalizedCity, plz: realPlz };
      console.log("✅ DEBUG: Stadt über Netlify Function erkannt:", cityData);
      
      sessionStorage.setItem("cityName", capitalizedCity);
      sessionStorage.setItem("cityPlz", realPlz);
      sessionStorage.setItem("cityData", JSON.stringify(cityData));
      return cityData;
    }
  } catch (error) {
    console.error("❌ DEBUG: Netlify Function fehlgeschlagen:", error);
  }

  return { name: "Ihrer Stadt", plz: "00000" };
}

export function getCityFromParams(): CityData {
  // NICHT aus sessionStorage laden - immer frisch ermitteln
  const urlParams = new URLSearchParams(window.location.search);
  const cityParam = urlParams.get("city");
  const hasLocationId = urlParams.get("kw") || urlParams.get("loc_physical_ms") || urlParams.get("city_id") || urlParams.get("loc");
  
  // Priorität 1: city Parameter
  if (cityParam) {
    const cleanedCity = cityParam.replace(/[^a-zA-ZäöüÄÖÜß \-]/g,"").substring(0,40).trim();
    const cityName = cleanedCity.charAt(0).toUpperCase() + cleanedCity.slice(1).toLowerCase();
    return { name: cityName, plz: "00000" };
  }
  
  if (hasLocationId) {
    // Wenn ID vorhanden, erstmal Platzhalter zurückgeben
    return { name: "Ihrer Stadt", plz: "00000" };
  }
  
  // Nur wenn KEINE ID in URL, dann aus sessionStorage laden
  const storedCity = sessionStorage.getItem("cityName");
  if (storedCity && storedCity !== "Ihrer Stadt") {
    return { name: storedCity, plz: "00000" };
  }

  return { name: "Ihrer Stadt", plz: "00000" };
}

// Neue Funktion für asynchrone Stadt-Erkennung
export async function detectAndUpdateCity(): Promise<CityData> {
  const cityData = await detectCity();
  
  // Trigger custom event für React re-render
  window.dispatchEvent(new CustomEvent('cityDetected', { 
    detail: cityData 
  }));
  
  return cityData;
}

export function updateCityElements(city: string): void {
  // Alle Elemente mit cityName-Klassen aktualisieren
  document.querySelectorAll(".cityName, .city-placeholder, .city-welcome, .cityname").forEach(el => {
    if (el.textContent) {
      el.textContent = city;
    }
  });

  // Data-city Attribute aktualisieren
  document.querySelectorAll("[data-city]").forEach(el => {
    el.setAttribute("data-city", city);
  });
}

export function updateDynamicCityTags(cityData: CityData): void {
  updateCityElements(cityData.name);
}