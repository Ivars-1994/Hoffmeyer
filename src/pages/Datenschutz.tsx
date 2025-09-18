
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

const Datenschutz = () => {
  const { city: routeCity } = useParams();
  const location = useLocation();
  const [cityInfo, setCityInfo] = useState({ city: DEFAULT_CITY });
  
  useEffect(() => {
    const runCityDetection = async () => {
      console.log("Datenschutz: Stadt-Erkennung wird ausgeführt...");
      
      try {
        // Erst versuchen, Stadt aus URL-Parametern zu erkennen
        let detectedCityData = getCityFromParams();
        console.log("Datenschutz: Stadt aus URL-Parametern:", detectedCityData);
        let detectedCity = detectedCityData.name;
        
        // Falls keine Stadt aus URL erkannt wurde, prüfe sessionStorage
        if (detectedCity === "Ihrer Stadt") {
          const storedCity = sessionStorage.getItem('cityName');
          if (storedCity && storedCity !== "Ihrer Stadt") {
            detectedCity = storedCity;
            console.log("Datenschutz: Stadt aus sessionStorage übernommen:", detectedCity);
          }
        } else {
          // Stadt in sessionStorage speichern für andere Seiten
          sessionStorage.setItem('detectedCity', detectedCity);
        }
        
        console.log("Datenschutz: Finale erkannte Stadt:", detectedCity);
        
        setCityInfo({ 
          city: detectedCity
        });
      } catch (error) {
        console.error("Datenschutz: Fehler bei der Stadt-Erkennung:", error);
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
        <title>Datenschutzerklärung - Kammerjäger Schneider</title>
        <meta name="description" content={`Datenschutzerklärung für die Dienstleistungen von Kammerjäger Schneider in ${cityInfo.city}.`} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-8 text-[#1A1F2C]">Datenschutzerklärung</h1>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-[#1A1F2C]">Verantwortlicher</h2>
              <div className="space-y-2">
                <p>Kammerjäger Schneider</p>
                <p>Hauptstraße 26–36</p>
                <p>{cityInfo.city}</p>
                <p>Deutschland</p>
                <p>Telefon: <a href="tel:+491782581987" className="text-[#9b87f5] hover:underline">+49 178 2581987</a></p>
                <p>E-Mail: <a href="mailto:info.kammerjaegerschneider.de" className="text-[#9b87f5] hover:underline">info.kammerjaegerschneider.de</a></p>
              </div>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">1. Allgemeine Hinweise</h2>
              <p className="text-gray-700">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">2. Datenerfassung auf unserer Website</h2>
              <h3 className="text-lg font-medium mb-2 text-[#1A1F2C]">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
              <p className="text-gray-700 mb-3">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
              </p>
              <h3 className="text-lg font-medium mb-2 text-[#1A1F2C]">Wie erfassen wir Ihre Daten?</h3>
              <p className="text-gray-700">
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben oder bei einem Anruf übermitteln.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">3. Rechtsgrundlage für die Verarbeitung</h2>
              <p className="text-gray-700">
                Die Verarbeitung Ihrer personenbezogenen Daten erfolgt auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">4. Ihre Rechte</h2>
              <p className="text-gray-700">
                Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">5. Server-Log-Dateien</h2>
              <p className="text-gray-700">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">6. Kontaktformular</h2>
              <p className="text-gray-700">
                Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">7. Widerspruch gegen Werbe-E-Mails</h2>
              <p className="text-gray-700">
                Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen.
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

export default Datenschutz;
