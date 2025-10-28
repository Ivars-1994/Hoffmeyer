import { CityData } from './cityDetection';

export async function getCityFromGeolocation(): Promise<CityData | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.log('Geolocation API nicht verfügbar');
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          console.log('📍 Geolocation erfolgreich:', latitude, longitude);
          
          // Reverse Geocoding mit Nominatim (OpenStreetMap - kostenlos)
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=de`;
          
          const response = await fetch(url, {
            headers: {
              'User-Agent': 'Hoffmeyer-Kammerjaeger/1.0'
            }
          });
          
          if (!response.ok) {
            console.error('Reverse Geocoding fehlgeschlagen:', response.status);
            resolve(null);
            return;
          }
          
          const data = await response.json();
          console.log('🗺️ Reverse Geocoding Ergebnis:', data);
          
          // Extrahiere Stadt und PLZ
          const city = data.address?.city 
            || data.address?.town 
            || data.address?.village 
            || data.address?.municipality
            || null;
          
          const plz = data.address?.postcode || '00000';
          
          if (city) {
            const cityData: CityData = {
              name: city,
              plz: plz
            };
            
            console.log('✅ Stadt aus Geolocation erkannt:', cityData);
            
            // In sessionStorage speichern
            sessionStorage.setItem('cityName', city);
            sessionStorage.setItem('cityPlz', plz);
            sessionStorage.setItem('cityData', JSON.stringify(cityData));
            sessionStorage.setItem('citySource', 'geolocation');
            
            resolve(cityData);
          } else {
            console.log('❌ Keine Stadt aus Geolocation extrahierbar');
            resolve(null);
          }
        } catch (error) {
          console.error('Fehler beim Reverse Geocoding:', error);
          resolve(null);
        }
      },
      (error) => {
        console.log('❌ Geolocation abgelehnt oder fehlgeschlagen:', error.message);
        resolve(null);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000 // 5 Minuten Cache
      }
    );
  });
}
