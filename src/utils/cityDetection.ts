// Einfache Stadt-Erkennung über Netlify-Funktion
export interface CityData {
  name: string;
  plz: string;
}

export async function detectCity(): Promise<CityData> {
  const urlParams = new URLSearchParams(window.location.search);
  const kw = urlParams.get("kw");
  const locId = urlParams.get("loc_physical_ms") || urlParams.get("city_id");

  console.log("🔍 DEBUG: Stadt-Erkennung startet mit URL:", window.location.search);
  console.log("🔍 DEBUG: kw parameter:", kw);
  console.log("🔍 DEBUG: loc_physical_ms/city_id:", locId);

  // Wenn kw parameter vorhanden ist, Stadt aus dem Suchbegriff extrahieren
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

  // Wenn keine kw aber loc_physical_ms/city_id, dann API-Aufruf
  if (!locId) {
    console.log("❌ DEBUG: Keine Parameter gefunden");
    return { name: "Ihrer Stadt", plz: "00000" };
  }

  try {
    const apiUrl = `/.netlify/functions/resolve-id?id=${locId}`;
    console.log("🌐 DEBUG: API-Aufruf:", apiUrl);
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    console.log("📥 DEBUG: API-Antwort:", data);
    console.log("📥 DEBUG: data.stadt Wert:", data.stadt);
    console.log("📥 DEBUG: Vollständige Response:", JSON.stringify(data, null, 2));

    if (data.stadt) {
      // Ersten Buchstaben groß schreiben
      const capitalizedCity = data.stadt.charAt(0).toUpperCase() + data.stadt.slice(1).toLowerCase();
      const realPlz = data.plz || "00000"; // PLZ aus API verwenden
      const cityData = { name: capitalizedCity, plz: realPlz };
      console.log("✅ DEBUG: Stadt erkannt:", cityData);
      
      sessionStorage.setItem("cityName", capitalizedCity);
      sessionStorage.setItem("cityPlz", realPlz);
      sessionStorage.setItem("cityData", JSON.stringify(cityData));
      return cityData;
    } else {
      console.log("❌ DEBUG: Keine Stadt in API-Antwort");
    }
  } catch (e) {
    console.error("❌ DEBUG: Fehler bei API-Aufruf:", e);
  }

  return { name: "Ihrer Stadt", plz: "00000" };
}

export function getCityFromParams(): CityData {
  // NICHT aus sessionStorage laden - immer frisch ermitteln
  const urlParams = new URLSearchParams(window.location.search);
  const hasLocationId = urlParams.get("kw") || urlParams.get("loc_physical_ms") || urlParams.get("city_id");
  
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