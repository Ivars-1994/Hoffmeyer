
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
  const kwParam = urlParams.get("kw");
  const locId = urlParams.get("lcid") || urlParams.get("loc") || urlParams.get("city_id") || urlParams.get("loc_physical_ms");
  
  console.log("=== DIREKTER TEST ===");
  console.log("URL:", window.location.href);
  console.log("Search:", window.location.search);
  console.log("City Param:", cityParam);
  console.log("KW Param:", kwParam);
  console.log("Loc ID:", locId);
  
  const [cityData, setCityData] = useState<CityData | null>(null);
  
  useEffect(() => {
    console.log("=== USEEFFECT LÄUFT ===");
    
    // Priorität 1: Direkter city Parameter (aber nur wenn es eine echte Stadt ist)
    if (cityParam) {
      console.log("✅ Original cityParam:", cityParam);
      
      // Google Ads Platzhalter abfangen - diese sollen NICHT als Stadt verwendet werden
      const isGoogleAdsPlaceholder = cityParam.toLowerCase().includes('location') || 
                                   cityParam.includes('{') || 
                                   cityParam.includes('}') || 
                                   cityParam.toLowerCase() === 'locationcity';
      
      if (isGoogleAdsPlaceholder) {
        console.log("⚠️ Google Ads Platzhalter nicht ersetzt:", cityParam, "-> verwende kw oder loc ID");
        // Weiter zu kw und loc ID Erkennung
      } else {
        // Echte Stadt erkannt
        const cleanedCity = cityParam.replace(/[^a-zA-ZäöüÄÖÜß \-]/g,"").substring(0,40).trim();
        const cityName = cleanedCity.charAt(0).toUpperCase() + cleanedCity.slice(1).toLowerCase();
        const newCityData = { name: cityName, plz: "00000" };
        
        console.log("✅ Echte Stadt über city Parameter erkannt:", cityName);
        setCityData(newCityData);
        
        sessionStorage.setItem('cityName', cityName);
        sessionStorage.setItem('cityData', JSON.stringify(newCityData));
        window.dispatchEvent(new CustomEvent('cityDetected', { detail: newCityData }));
        return;
      }
    }
    
    // Priorität 2: Stadt aus kw Parameter extrahieren
    if (kwParam) {
      console.log("✅ KW Parameter gefunden:", kwParam);
      console.log("🔍 KW Parameter Raw:", urlParams.get("kw"));
      console.log("🔍 KW Parameter Decoded:", decodeURIComponent(kwParam));
      const searchTerm = decodeURIComponent(kwParam).replace(/\+/g, " ");
      console.log("🔍 Search Term after decode/replace:", searchTerm);
      // Extrahiere die Stadt (meist das letzte Wort nach "kammerjaeger" etc.)
      const words = searchTerm.split(" ");
      console.log("🔍 Words array:", words);
      let cityName = words[words.length - 1]; // Letztes Wort ist meist die Stadt
      console.log("🔍 Extracted city name:", cityName);
      
      // Prüfe ob das letzte Wort eine echte Stadt sein könnte
      const isValidCity = cityName.length >= 3 && 
                         !/^(entfernen|bekämpfen|hilfe|service|kosten|preise|notdienst|24h|sofort)$/i.test(cityName) &&
                         /^[a-zA-ZäöüÄÖÜß]+$/.test(cityName);
      
      if (isValidCity) {
        // Ersten Buchstaben groß schreiben
        cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
        
        console.log("✅ Vollständiger Suchbegriff:", searchTerm);
        console.log("✅ Gültige Stadt aus kw extrahiert:", cityName);
        
        const newCityData = { name: cityName, plz: "00000" };
        setCityData(newCityData);
        
        sessionStorage.setItem('cityName', cityName);
        sessionStorage.setItem('cityData', JSON.stringify(newCityData));
        window.dispatchEvent(new CustomEvent('cityDetected', { detail: newCityData }));
        return;
      } else {
        console.log("⚠️ Letztes Wort aus kw ist keine gültige Stadt:", cityName, "-> verwende lcid");
        // Weiter zu lcid Erkennung
      }
    }
    
    // Priorität 3: Netlify Function mit lcid/loc_physical_ms
    if (!locId) {
      console.log("Keine Parameter gefunden (city, kw, oder loc ID)");
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
          
          // Prüfe ob bereits eine Stadt aus kw extrahiert wurde
          const existingCityData = sessionStorage.getItem('cityData');
          if (existingCityData) {
            const parsedCityData = JSON.parse(existingCityData);
            console.log("⚠️ Stadt bereits aus kw erkannt:", parsedCityData.name, "-> überspringe Netlify Function");
            return;
          }
          
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
  }, [cityParam, kwParam, locId]);

  
  // Einheitliche Stadt-Prioritäts-Logik für alle Komponenten
  const getDisplayCityName = () => {
    // Priorität 1: kw-Parameter (wird in 'cityData' gespeichert)
    const storedFromKw = sessionStorage.getItem('cityData');
    if (storedFromKw) {
      try {
        const data = JSON.parse(storedFromKw);
        return data.name;
      } catch (e) {
        console.error("Error parsing cityData from sessionStorage:", e);
      }
    }
    
    // Priorität 2: Current state (falls kw nicht verfügbar)
    if (cityData?.name) {
      return cityData.name;
    }
    
    // Priorität 3: lcid-Parameter (wird in 'detectedCityData' gespeichert)
    const storedFromLcid = sessionStorage.getItem('detectedCityData');
    if (storedFromLcid) {
      try {
        const data = JSON.parse(storedFromLcid);
        return data.name;
      } catch (e) {
        console.error("Error parsing detectedCityData from sessionStorage:", e);
      }
    }
    
    return "Ihrer Stadt";
  };
  
  const cityName = getDisplayCityName();

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
