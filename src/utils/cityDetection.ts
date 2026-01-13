// Einfache Stadt-Erkennung über Netlify-Funktion
import { hasGeolocationConsent } from './consentManager';
import { getCityFromGeolocation } from './geolocationService';

export interface CityData {
  name: string;
  plz: string;
}

// Helper für Development-only Logging
const isDev = import.meta.env.DEV;
const debugLog = (...args: unknown[]) => {
  if (isDev) console.log(...args);
};

export async function detectCity(): Promise<CityData> {
  debugLog("Stadt-Erkennung gestartet");
  
  const urlParams = new URLSearchParams(window.location.search);
  const cityParam = urlParams.get("city"); // Neuer direkter city Parameter
  const kw = urlParams.get("kw") || urlParams.get("utm_term");
  const locId = urlParams.get("mslocid") || urlParams.get("loc_physical_ms") || urlParams.get("city_id") || urlParams.get("loc");

  // Priorität 0: Geolocation (wenn Consent vorhanden und keine URL-Parameter)
  if (!cityParam && !kw && !locId && hasGeolocationConsent()) {
    const geoCity = await getCityFromGeolocation();
    if (geoCity) {
      debugLog("Stadt über Geolocation erkannt:", geoCity.name);
      return geoCity;
    }
  }

  // Priorität 1: Direkter city Parameter
  if (cityParam) {
    const cleanedCity = cityParam.replace(/[^a-zA-ZäöüÄÖÜß \-]/g,"").substring(0,40).trim();
    const cityName = cleanedCity.charAt(0).toUpperCase() + cleanedCity.slice(1).toLowerCase();
    
    debugLog("Stadt über city Parameter:", cityName);
    
    const cityData = { name: cityName, plz: "00000" };
    sessionStorage.setItem("cityName", cityName);
    sessionStorage.setItem("cityData", JSON.stringify(cityData));
    return cityData;
  }

  // Priorität 2: mslocid/loc_physical_ms/city_id über Netlify Function
  if (locId) {
    // Validate locId - must be numeric and reasonable length
    const sanitizedLocId = locId.replace(/[^0-9]/g, '').substring(0, 15);
    if (!sanitizedLocId || sanitizedLocId.length < 5) {
      debugLog("Ungültige Location ID");
      return { name: "Ihrer Stadt", plz: "00000" };
    }
    
    try {
      debugLog("Versuche Netlify Function für ID:", sanitizedLocId);
      const netlifyUrl = `/.netlify/functions/resolve-id?id=${encodeURIComponent(sanitizedLocId)}`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(netlifyUrl, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();

      if (data.stadt) {
        const capitalizedCity = data.stadt.charAt(0).toUpperCase() + data.stadt.slice(1).toLowerCase();
        const realPlz = data.plz || "00000";
        const cityData = { name: capitalizedCity, plz: realPlz };
        debugLog("Stadt über Netlify Function erkannt:", capitalizedCity);
        
        sessionStorage.setItem("cityName", capitalizedCity);
        sessionStorage.setItem("cityPlz", realPlz);
        sessionStorage.setItem("cityData", JSON.stringify(cityData));
        return cityData;
      }
    } catch (error) {
      debugLog("Netlify Function fehlgeschlagen");
    }
  }

  // Priorität 3: Wenn kw/utm_term parameter vorhanden ist, Stadt aus dem Suchbegriff extrahieren
  if (kw) {
    const searchTerm = decodeURIComponent(kw).replace(/\+/g, " ");
    // Extrahiere die Stadt (meist das letzte Wort nach "kammerjaeger" etc.)
    const words = searchTerm.split(" ");
    let cityName = words[words.length - 1]; // Letztes Wort ist meist die Stadt
    
    // Ersten Buchstaben groß schreiben
    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
    
    debugLog("Stadt aus kw extrahiert:", cityName);
    
    const cityData = { name: cityName, plz: "00000" };
    
    sessionStorage.setItem("cityName", cityName);
    sessionStorage.setItem("cityData", JSON.stringify(cityData));
    return cityData;
  }

  debugLog("Keine Parameter gefunden");
  return { name: "Ihrer Stadt", plz: "00000" };

}

export function getCityFromParams(): CityData {
  // NICHT aus sessionStorage laden - immer frisch ermitteln
  const urlParams = new URLSearchParams(window.location.search);
  const cityParam = urlParams.get("city");
  const hasLocationId = urlParams.get("mslocid") || urlParams.get("kw") || urlParams.get("utm_term") || urlParams.get("loc_physical_ms") || urlParams.get("city_id") || urlParams.get("loc");
  
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
