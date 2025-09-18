
import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import Certifications from '../components/home/Certifications';
import Reviews from '../components/home/Reviews';
import Contact from '../components/home/Contact';
import PhoneButton from '../components/ui/PhoneButton';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import PaymentOptions from '../components/home/PaymentOptions';
import { Helmet } from 'react-helmet-async';
import SectionCTA from '../components/ui/SectionCTA';
import AboutUs from '../components/home/AboutUs';
import MovingLogoBanner from '../components/home/MovingLogoBanner';
import CityWelcomeBanner from '../components/home/CityWelcomeBanner';
import FeaturedImage from '../components/home/FeaturedImage';
import SeoKeywords from '../components/seo/SeoKeywords';
import { getCityFromParams, updateDynamicCityTags, detectAndUpdateCity, CityData } from '../utils/cityDetection';

// Declare gtag as a global function
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

const PHONE_NUMBER = "+491782581987";

const Index = () => {
  // Stadt-Erkennung mit verbesserter Logik  
  const [cityData, setCityData] = useState(() => {
    const result = getCityFromParams();
    console.log("🏙️ FINALE STADT-DATEN:", result);
    return result;
  });
  
  const cityName = cityData.name;

  // Async Stadt-Erkennung starten
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const hasLocationId = urlParams.get("kw") || urlParams.get("loc_physical_ms") || urlParams.get("city_id");
    
    if (hasLocationId) {
      detectAndUpdateCity().then(newCityData => {
        console.log("🌟 Stadt asynchron erkannt:", newCityData);
        setCityData(newCityData);
      });
    }
  }, []);

  // DOM-Updates nach dem ersten Render
  useEffect(() => {
    console.log("🔄 Führe DOM-Updates aus für:", cityData);
    
    // Speichere in sessionStorage für andere Komponenten
    sessionStorage.setItem("detectedCity", cityData.name);
    sessionStorage.setItem("detectedZip", cityData.plz);
    
    // Aktualisiere alle DOM-Elemente mit data-city Attributen
    updateDynamicCityTags(cityData);
    
    console.log("✅ DOM-Updates abgeschlossen");
  }, [cityData]);

  const pageTitle = `Kammerjäger Schneider - Professionelle Schädlingsbekämpfung in ${cityName}`;
  const pageDescription = `Sofortige Hilfe bei Schädlingsbefall in ${cityName}. IHK-zertifizierte Schädlingsbekämpfer für Bettwanzen, Insekten, Ratten und mehr. 24/7 Notdienst & kostenlose Anfahrt.`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        
        <main className="flex-grow pt-[83px] md:pt-28">
          <Hero cityName={cityName} />
          <CityWelcomeBanner cityName={cityName} />
          <MovingLogoBanner />
          <FeaturedImage cityName={cityName} defaultCity="Ihrer Stadt" />
          <AboutUs />
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Schnelle Hilfe benötigt? Rufen Sie uns an!" />
          <Services />
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Schädlingsproblem? Wir helfen sofort!" />
          <Certifications />
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Professionelle Beratung gewünscht?" />
          <Reviews cityName={cityName} />
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Überzeugt? Kontaktieren Sie uns!" />
          <PaymentOptions />
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Fragen zu unseren Zahlungsoptionen?" />
          <Contact />
          <SeoKeywords />
        </main>
        
        <Footer />
        
        <PhoneButton phoneNumber={PHONE_NUMBER} variant="fixed" />
        <WhatsAppButton phoneNumber={PHONE_NUMBER} variant="fixed" />
      </div>
    </>
  );
};

export default Index;
