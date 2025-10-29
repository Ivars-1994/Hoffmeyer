
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PhoneButton from '../components/ui/PhoneButton';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import { CityData } from '../utils/cityDetection';

const PHONE_NUMBER = "+4915212124199";

// Funktion zum Kapitalisieren der Stadt
const capitalizeCity = (cityStr: string) => {
  if (!cityStr) return 'Ihrer Stadt';
  return cityStr.charAt(0).toUpperCase() + cityStr.slice(1).toLowerCase();
};

const Impressum = () => {
  const [cityName, setCityName] = useState<string>(() => {
    // Initiale Stadt aus sessionStorage
    try {
      // Versuch 1: cityData aus sessionStorage
      const storedCity = sessionStorage.getItem('cityData');
      if (storedCity) {
        const cityData = JSON.parse(storedCity);
        if (cityData?.name) return capitalizeCity(cityData.name);
      }
      
      // Versuch 2: cityName direkt aus sessionStorage
      const directCity = sessionStorage.getItem('cityName');
      if (directCity) return capitalizeCity(directCity);
      
      // Versuch 3: detectedCityData aus sessionStorage
      const detectedCity = sessionStorage.getItem('detectedCityData');
      if (detectedCity) {
        const cityData = JSON.parse(detectedCity);
        if (cityData?.name) return capitalizeCity(cityData.name);
      }
    } catch (e) {
      console.error("Error reading city from sessionStorage:", e);
    }
    
    return 'Ihrer Stadt';
  });

  useEffect(() => {
    // NUR Event Listener für Stadt-Updates (keine aktive Erkennung!)
    const handleCityDetected = (event: CustomEvent<CityData>) => {
      if (event.detail?.name) {
        setCityName(capitalizeCity(event.detail.name));
      }
    };

    window.addEventListener('cityDetected', handleCityDetected as EventListener);
    
    return () => {
      window.removeEventListener('cityDetected', handleCityDetected as EventListener);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Impressum - Kammerjäger Hoffmeyer</title>
        <meta name="description" content="Impressum und rechtliche Informationen zu Kammerjäger Hoffmeyer." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-8 text-[#1A1F2C]">Impressum</h1>
            
            <div className="space-y-6 text-gray-700">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-[#1A1F2C]">Angaben gemäß § 5 TMG</h2>
                <div className="space-y-2">
                  <p>Kammerjäger Hoffmeyer</p>
                  <p>Hauptstraße 26–28</p>
                  <p>{cityName}</p>
                  <p>Deutschland</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#1A1F2C]">Kontakt</h3>
                <p>Telefon: <a href="tel:+4915212124199" className="call-link text-[#9b87f5] hover:underline">+49 152 1212 4199</a></p>
                <p>E-Mail: <a href="mailto:info@kammerjaegerhoffmeyer.de" className="text-[#9b87f5] hover:underline">info@kammerjaegerhoffmeyer.de</a></p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#1A1F2C]">Haftungsausschluss</h3>
                <p>Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#1A1F2C]">Plattform der EU-Kommission zur Online-Streitbeilegung</h3>
                <p>
                  <a 
                    href="https://ec.europa.eu/consumers/odr/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#9b87f5] hover:underline"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                </p>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
        
        <PhoneButton phoneNumber={PHONE_NUMBER} variant="fixed" />
        <WhatsAppButton phoneNumber={PHONE_NUMBER} variant="fixed" />
      </div>
    </>
  );
};

export default Impressum;
