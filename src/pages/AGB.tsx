import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PhoneButton from '../components/ui/PhoneButton';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import { useParams, useLocation } from 'react-router-dom';
import { getCityFromParams } from '../utils/cityDetection';

const PHONE_NUMBER = "+491782581987";
const DEFAULT_CITY = "Hagen";

const AGB = () => {
  const { city: routeCity } = useParams();
  const location = useLocation();
  const [cityInfo, setCityInfo] = useState({ city: DEFAULT_CITY });
  
  useEffect(() => {
    const runCityDetection = async () => {
      console.log("AGB: Stadt-Erkennung wird ausgeführt...");
      
      try {
        // Erst versuchen, Stadt aus URL-Parametern zu erkennen
        let detectedCityData = getCityFromParams();
        console.log("AGB: Stadt aus URL-Parametern:", detectedCityData);
        let detectedCity = detectedCityData.name;
        
        // Falls keine Stadt aus URL erkannt wurde, prüfe sessionStorage
        if (detectedCity === "Ihrer Stadt") {
          const storedCity = sessionStorage.getItem('cityName');
          if (storedCity && storedCity !== "Ihrer Stadt") {
            detectedCity = storedCity;
            console.log("AGB: Stadt aus sessionStorage übernommen:", detectedCity);
          }
        } else {
          // Stadt in sessionStorage speichern für andere Seiten
          sessionStorage.setItem('detectedCity', detectedCity);
        }
        
        console.log("AGB: Finale erkannte Stadt:", detectedCity);
        
        setCityInfo({ 
          city: detectedCity
        });
      } catch (error) {
        console.error("AGB: Fehler bei der Stadt-Erkennung:", error);
        setCityInfo({ city: DEFAULT_CITY });
      }
    };
    
    // Sofort ausführen
    runCityDetection();
    
    // Und nach Verzögerung nochmals
    const timeoutId = setTimeout(runCityDetection, 500);
    
    return () => clearTimeout(timeoutId);
  }, [routeCity, location]);
  
  return (
    <>
      <Helmet>
        <title>Allgemeine Geschäftsbedingungen - Kammerjäger Schneider</title>
        <meta name="description" content={`Allgemeine Geschäftsbedingungen (AGB) für die Dienstleistungen von Kammerjäger Schneider in ${cityInfo.city}.`} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-8 text-[#1A1F2C]">Allgemeine Geschäftsbedingungen (AGB)</h1>
            
            <section className="mb-8">
              <div className="space-y-2 mb-6">
                <p>Kammerjäger Schneider</p>
                <p>Hauptstraße 26–36, {cityInfo.city}</p>
                <p>E-Mail: <a href="mailto:info.kammerjaegerschneider.de" className="text-[#9b87f5] hover:underline">info.kammerjaegerschneider.de</a></p>
                <p>Telefon: <a href="tel:+491782581987" className="text-[#9b87f5] hover:underline">+49 178 2581987</a></p>
              </div>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">§1 Geltungsbereich</h2>
              <p className="text-gray-700">
                Diese AGB gelten für alle Verträge über Dienstleistungen im Bereich der Schädlingsbekämpfung, die zwischen Kammerjäger Schneider (nachfolgend „Dienstleister") und Kunden (Verbraucher und Unternehmer) abgeschlossen werden.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">§2 Leistungen</h2>
              <p className="text-gray-700">
                Der Dienstleister bietet die Beseitigung von Schädlingen wie Insekten, Nagetieren, Bettwanzen, Wespen u. Ä. sowie präventive Maßnahmen an. Der genaue Leistungsumfang ergibt sich aus der individuellen Vereinbarung.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">§3 Auftragserteilung</h2>
              <p className="text-gray-700">
                Die Beauftragung erfolgt telefonisch, per WhatsApp, E-Mail oder über andere Kontaktwege. Mit Annahme des Angebots gilt der Auftrag als verbindlich erteilt.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">§4 Preise und Zahlung</h2>
              <p className="text-gray-700">
                Die Preise richten sich nach Art, Umfang und Dringlichkeit der Dienstleistung und werden dem Kunden vor Beginn mitgeteilt. Zahlungen erfolgen – sofern nicht anders vereinbart – unmittelbar nach Leistungserbringung in bar oder per Überweisung.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">§5 Terminvereinbarung und Stornierung</h2>
              <p className="text-gray-700">
                Vereinbarte Termine sind verbindlich. Bei kurzfristiger Stornierung (weniger als 24 Stunden vor dem Termin) kann eine Ausfallpauschale in Rechnung gestellt werden. Bei Nichterscheinen des Kunden behält sich der Dienstleister vor, den vollen Preis zu berechnen.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">§6 Haftung</h2>
              <p className="text-gray-700">
                Der Dienstleister haftet nur bei Vorsatz oder grober Fahrlässigkeit. Eine Haftung für Folgeschäden durch unsachgemäße Nachbehandlung durch den Kunden ist ausgeschlossen.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">§7 Widerrufsrecht</h2>
              <p className="text-gray-700">
                Bei Dienstleistungen, die auf ausdrücklichen Wunsch des Kunden kurzfristig (z. B. als Notfall) begonnen werden, erlischt das Widerrufsrecht gemäß § 356 Abs. 4 BGB mit vollständiger Vertragserfüllung.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">§8 Datenschutz</h2>
              <p className="text-gray-700">
                Die im Rahmen der Auftragsabwicklung erhobenen personenbezogenen Daten werden ausschließlich zur Vertragsabwicklung genutzt und nicht an Dritte weitergegeben. Weitere Infos siehe Datenschutzerklärung.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">§9 Gerichtsstand</h2>
              <p className="text-gray-700">
                Gerichtsstand ist – soweit gesetzlich zulässig – der Sitz des Dienstleisters.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">§10 Schlussbestimmungen</h2>
              <p className="text-gray-700">
                Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein, bleibt die Wirksamkeit der übrigen Regelungen unberührt.
              </p>
            </section>
          </div>
        </main>
        
        <Footer />
        
        {/* Fixed Buttons */}
        <PhoneButton phoneNumber={PHONE_NUMBER} variant="fixed" />
        <WhatsAppButton phoneNumber={PHONE_NUMBER} variant="fixed" />
      </div>
    </>
  );
};

export default AGB;
