
import React, { useState, useEffect, Suspense } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import PhoneButton from '../components/ui/PhoneButton';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import { Helmet } from 'react-helmet-async';
import SectionCTA from '../components/ui/SectionCTA';
import MovingLogoBanner from '../components/home/MovingLogoBanner';
import CityWelcomeBanner from '../components/home/CityWelcomeBanner';
import FeaturedImage from '../components/home/FeaturedImage';
import SeoKeywords from '../components/seo/SeoKeywords';
import { CityData } from '../utils/cityDetection';
import { 
  LazyServices, 
  LazyCertifications, 
  LazyReviews, 
  LazyPaymentOptions, 
  LazyContact, 
  LazyAboutUs 
} from '../components/LazyComponents';


// Declare gtag as a global function
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

const PHONE_NUMBER = "+4915212124199";

const Index = () => {
  // Extrahiere URL-Parameter für Stadt-Erkennung
  const urlParams = new URLSearchParams(window.location.search);
  const cityParam = urlParams.get("city");
  const locId = urlParams.get("loc") || urlParams.get("city_id") || urlParams.get("loc_physical_ms");
  
  console.log("=== DIREKTER TEST ===");
  console.log("URL:", window.location.href);
  console.log("Search:", window.location.search);
  console.log("City Param:", cityParam);
  console.log("Loc ID:", locId);
  
  const [cityData, setCityData] = useState<CityData | null>(null);
  
  useEffect(() => {
    console.log("=== USEEFFECT LÄUFT ===");
    
    // Priorität 1: Direkter city Parameter
    if (cityParam) {
      console.log("✅ Original cityParam:", cityParam);
      
      // Google Ads Platzhalter abfangen
      if (cityParam.toLowerCase().includes('location') || cityParam.includes('{') || cityParam.includes('}')) {
        console.log("⚠️ Google Ads Platzhalter erkannt, überspringe city Parameter");
        // Fahre mit loc ID Erkennung fort anstatt Fallback
      } else {
        const cleanedCity = cityParam.replace(/[^a-zA-ZäöüÄÖÜß \-]/g,"").substring(0,40).trim();
        const cityName = cleanedCity.charAt(0).toUpperCase() + cleanedCity.slice(1).toLowerCase();
        const newCityData = { name: cityName, plz: "00000" };
        
        console.log("✅ Stadt über city Parameter erkannt:", cityName);
        console.log("✅ Cleaned cityParam:", cleanedCity);
        setCityData(newCityData);
        
        // Speichere in sessionStorage
        sessionStorage.setItem('cityName', cityName);
        sessionStorage.setItem('cityData', JSON.stringify(newCityData));
        
        // Dispatch Event
        window.dispatchEvent(new CustomEvent('cityDetected', { detail: newCityData }));
        return;
      }
    }
    
    if (!locId) {
      console.log("Keine loc ID oder city Parameter gefunden");
      return;
    }
    
    // Non-blocking city detection
    const testNetlifyFunction = async () => {
      try {
        console.log("Teste Netlify Function...");
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout
        
        const response = await fetch(`/.netlify/functions/resolve-id?id=${locId}`, {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        console.log("Response status:", response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log("✅ Netlify Function Response:", data);
          const newCityData = { name: data.stadt, plz: data.plz };
          setCityData(newCityData);
          
          // Speichere in sessionStorage für andere Komponenten
          sessionStorage.setItem('detectedCityData', JSON.stringify(newCityData));
          
          // Dispatch Event für andere Komponenten
          const event = new CustomEvent('cityDetected', { 
            detail: newCityData 
          });
          window.dispatchEvent(event);
        } else {
          console.log("Netlify Function failed:", response.status);
        }
      } catch (error) {
        console.error("❌ Netlify Function Error:", error);
      }
    };
    
    // Don't block rendering - run after paint
    setTimeout(testNetlifyFunction, 100);
  }, [cityParam, locId]);

  
  const cityName = cityData?.name || "Ihrer Stadt";

  console.log("=== FINALE STADT DATEN ===");
  console.log("City Name:", cityName);
  console.log("City Data:", cityData);
  console.log("Window location:", window.location.href);
  console.log("URL Params:", urlParams.toString());

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
          {/* Critical above-the-fold content loads first */}
          <Hero cityName={cityName} />
          <CityWelcomeBanner cityName={cityName} />
          <MovingLogoBanner />
          <FeaturedImage cityName={cityName} defaultCity="Ihrer Stadt" />
          
          {/* Below-the-fold content is lazy loaded */}
          <Suspense fallback={<div className="h-20 bg-muted/20 animate-pulse" />}>
            <LazyAboutUs />
          </Suspense>
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Schnelle Hilfe benötigt? Rufen Sie uns an!" />
          
          <Suspense fallback={<div className="h-40 bg-muted/20 animate-pulse" />}>
            <LazyServices />
          </Suspense>
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Schädlingsproblem? Wir helfen sofort!" />
          
          <Suspense fallback={<div className="h-32 bg-muted/20 animate-pulse" />}>
            <LazyCertifications />
          </Suspense>
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Professionelle Beratung gewünscht?" />
          
          <Suspense fallback={<div className="h-40 bg-muted/20 animate-pulse" />}>
            <LazyReviews cityName={cityName} />
          </Suspense>
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Überzeugt? Kontaktieren Sie uns!" />
          
          <Suspense fallback={<div className="h-32 bg-muted/20 animate-pulse" />}>
            <LazyPaymentOptions />
          </Suspense>
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Fragen zu unseren Zahlungsoptionen?" />
          
          <Suspense fallback={<div className="h-40 bg-muted/20 animate-pulse" />}>
            <LazyContact />
          </Suspense>
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
