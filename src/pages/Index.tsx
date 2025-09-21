
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
import { CityData } from '../utils/cityDetection';
import stadtMap from '../data/stadtMap.json';

// Declare gtag as a global function
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

const PHONE_NUMBER = "+4915212124199";

const Index = () => {
  // DIREKTER TEST
  const urlParams = new URLSearchParams(window.location.search);
  const locId = urlParams.get("loc") || urlParams.get("city_id") || urlParams.get("loc_physical_ms");
  
  console.log("=== DIREKTER TEST ===");
  console.log("URL:", window.location.href);
  console.log("Search:", window.location.search);
  console.log("Loc ID:", locId);
  
  // Stadt-Erkennung
  const [cityData, setCityData] = useState<CityData>({ name: "Ihrer Stadt", plz: "00000" });
  
  useEffect(() => {
    console.log("=== USEEFFECT LÄUFT ===");
    
    if (!locId) {
      console.log("Keine loc ID gefunden");
      return;
    }
    
    // Verwende importierte JSON-Daten
    const plz = (stadtMap as any)[locId];
    console.log("JSON Lookup für ID", locId, "=> PLZ:", plz);
    
    if (plz) {
      // PLZ zu Stadt-Name über API
      const fetchCityName = async () => {
        try {
          console.log("Rufe OpenPLZ API auf für PLZ:", plz);
          const response = await fetch(`https://openplzapi.org/de/Localities?postalCode=${plz}`);
          const data = await response.json();
          const cityName = data?.[0]?.name || "Unbekannte Stadt";
          
          console.log("✅ API Response:", data);
          console.log("✅ Stadt erkannt:", cityName);
          
          setCityData({ name: cityName, plz: plz });
        } catch (error) {
          console.error("❌ API Fehler:", error);
          setCityData({ name: "Ihrer Stadt", plz: "00000" });
        }
      };
      
      fetchCityName();
    } else {
      console.log("❌ ID nicht in JSON gefunden:", locId);
    }
  }, [locId]);

  
  const cityName = cityData.name;

  console.log("=== FINALE STADT DATEN ===");
  console.log("City Name:", cityName);
  console.log("City Data:", cityData);

  const pageTitle = `Kammerjäger Hoffmeyer - Professionelle Schädlingsbekämpfung in ${cityName}`;
  const pageDescription = `Sofortige Hilfe bei Schädlingsbefall in ${cityName}. IHK-zertifizierte Schädlingsbekämpfer für Bettwanzen, Insekten, Ratten und mehr. 24/7 Notdienst & kostenlose Anfahrt.`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
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
