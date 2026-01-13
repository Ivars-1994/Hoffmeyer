
import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import PhoneButton from '../components/ui/PhoneButton';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import MobileStickyCTA from '../components/ui/MobileStickyCTA';
import { Helmet } from 'react-helmet-async';
import SectionCTA from '../components/ui/SectionCTA';
import MovingLogoBanner from '../components/home/MovingLogoBanner';
import CityWelcomeBanner from '../components/home/CityWelcomeBanner';
import FeaturedImage from '../components/home/FeaturedImage';
// SeoKeywords entfernt - versteckter Text ist ein Google Spam-Signal
import { CityData } from '../utils/cityDetection';
import { getServiceConfig } from '../utils/serviceConfig';
import { 
  LazyCertifications, 
  LazyReviews, 
  LazyPaymentOptions, 
  LazyContact, 
  LazyAboutUs,
  LazyProcessSteps,
  LazyGeneralFAQ,
  LazyServices
} from '../components/LazyComponents';
import TrustBadges from '../components/ui/TrustBadges';


// Declare gtag as a global function
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

const PHONE_NUMBER = "+4915792337877";

const Index = () => {
  const { service: serviceSlug } = useParams<{ service?: string }>();
  
  // Extrahiere URL-Parameter für Stadt-Erkennung
  const urlParams = new URLSearchParams(window.location.search);
  const cityParam = urlParams.get("city");
  const kwParam = urlParams.get("kw");
  const locId = urlParams.get("lcid") || urlParams.get("loc") || urlParams.get("city_id") || urlParams.get("loc_physical_ms");
  
  // Get service config if on a service route
  const serviceConfig = serviceSlug ? getServiceConfig(serviceSlug) : null;
  
  // Development-only logging
  const isDev = import.meta.env.DEV;
  if (isDev) {
    console.log("Stadt-Parameter:", { cityParam, kwParam, locId });
  }
  
  const [cityData, setCityData] = useState<CityData | null>(null);
  
  // Event-Listener für cityDetected Event (z.B. nach Cookie-Consent Geolocation)
  useEffect(() => {
    const handleCityDetected = (event: CustomEvent<CityData>) => {
      setCityData(event.detail);
    };
    
    window.addEventListener('cityDetected', handleCityDetected as EventListener);
    
    return () => {
      window.removeEventListener('cityDetected', handleCityDetected as EventListener);
    };
  }, []);
  
  useEffect(() => {
    // Priorität 1: Direkter city Parameter (aber nur wenn es eine echte Stadt ist)
    if (cityParam) {
      // Google Ads Platzhalter abfangen - diese sollen NICHT als Stadt verwendet werden
      const isGoogleAdsPlaceholder = cityParam.toLowerCase().includes('location') || 
                                   cityParam.includes('{') || 
                                   cityParam.includes('}') || 
                                   cityParam.toLowerCase() === 'locationcity';
      
      if (!isGoogleAdsPlaceholder) {
        // Echte Stadt erkannt
        const cleanedCity = cityParam.replace(/[^a-zA-ZäöüÄÖÜß \-]/g,"").substring(0,40).trim();
        const cityName = cleanedCity.charAt(0).toUpperCase() + cleanedCity.slice(1).toLowerCase();
        const newCityData = { name: cityName, plz: "00000" };
        
        setCityData(newCityData);
        
        sessionStorage.setItem('cityName', cityName);
        sessionStorage.setItem('cityData', JSON.stringify(newCityData));
        window.dispatchEvent(new CustomEvent('cityDetected', { detail: newCityData }));
        return;
      }
    }
    
    // Priorität 2: Stadt aus kw Parameter extrahieren
    if (kwParam) {
      const searchTerm = decodeURIComponent(kwParam).replace(/\+/g, " ");
      // Extrahiere die Stadt (meist das letzte Wort nach "kammerjaeger" etc.)
      const words = searchTerm.split(" ");
      let cityName = words[words.length - 1]; // Letztes Wort ist meist die Stadt
      
      // Prüfe ob das letzte Wort eine echte Stadt sein könnte
      const isValidCity = cityName.length >= 3 && 
                         !/^(entfernen|bekämpfen|hilfe|service|kosten|preise|notdienst|24h|sofort|schädlingsbekämpfung|kammerjäger|wespen|ratten|bettwanzen|mäuse|ungeziefer|schädling|desinfektion)$/i.test(cityName) &&
                         /^[a-zA-ZäöüÄÖÜß]+$/.test(cityName);
      
      if (isValidCity) {
        // Ersten Buchstaben groß schreiben
        cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
        
        const newCityData = { name: cityName, plz: "00000" };
        setCityData(newCityData);
        
        sessionStorage.setItem('cityName', cityName);
        sessionStorage.setItem('cityData', JSON.stringify(newCityData));
        window.dispatchEvent(new CustomEvent('cityDetected', { detail: newCityData }));
        return;
      }
    }
    
    // Priorität 3: Netlify Function mit lcid/loc_physical_ms
    if (!locId) {
      return;
    }
    
    // Validate locId - must be numeric
    const sanitizedLocId = locId.replace(/[^0-9]/g, '').substring(0, 15);
    if (!sanitizedLocId || sanitizedLocId.length < 5) {
      return;
    }
    
    // Non-blocking city detection
    const fetchCityFromFunction = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout
        
        const response = await fetch(`/.netlify/functions/resolve-id?id=${encodeURIComponent(sanitizedLocId)}`, {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          
          // Prüfe ob bereits eine Stadt aus kw extrahiert wurde
          const existingCityData = sessionStorage.getItem('cityData');
          if (existingCityData) {
            return;
          }
          
          const newCityData = { name: data.stadt, plz: data.plz };
          setCityData(newCityData);
          
          // Speichere in sessionStorage für andere Komponenten
          sessionStorage.setItem('detectedCityData', JSON.stringify(newCityData));
          
          // Dispatch Event für andere Komponenten
          window.dispatchEvent(new CustomEvent('cityDetected', { detail: newCityData }));
        }
      } catch {
        // Silently fail - not critical for page function
      }
    };
    
    // Don't block rendering - run after paint
    setTimeout(fetchCityFromFunction, 100);
  }, [cityParam, kwParam, locId]);

  
  // Einheitliche Stadt-Prioritäts-Logik für alle Komponenten
  const getDisplayCityName = () => {
    // Priorität 1: kw-Parameter (wird in 'cityData' gespeichert)
    const storedFromKw = sessionStorage.getItem('cityData');
    if (storedFromKw) {
      try {
        const data = JSON.parse(storedFromKw);
        return data.name;
      } catch {
        // Ignore parse errors
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
      } catch {
        // Ignore parse errors
      }
    }
    
    return "Ihrer Stadt";
  };
  
  const cityName = getDisplayCityName();

  console.log("=== FINALE STADT DATEN ===");
  console.log("City Name:", cityName);

  // Dynamic Meta Tags for Hash URLs (SEO)
  useEffect(() => {
    const SERVICE_TITLES: Record<string, { title: string; description: string }> = {
      wespen: {
        title: "Wespennest entfernen | 24h Notdienst | Kammerjäger Hoffmeyer",
        description: "Professionelle Wespenbekämpfung ✓ Schnelle Entfernung von Wespennestern ✓ IHK-zertifiziert ✓ Kostenlose Anfahrt ✓ 30-60 Min vor Ort"
      },
      bettwanzen: {
        title: "Bettwanzen bekämpfen | Soforthilfe | Kammerjäger Hoffmeyer",
        description: "Effektive Bettwanzenbekämpfung ✓ Wärmebehandlung & Insektizide ✓ Diskret & gründlich ✓ Nachkontrolle inklusive ✓ 24/7 Notdienst"
      },
      ratten: {
        title: "Ratten bekämpfen | Schnell & diskret | Kammerjäger Hoffmeyer",
        description: "Professionelle Rattenbekämpfung ✓ Gesicherte Köderstationen ✓ Hygienische Entsorgung ✓ Präventionsberatung ✓ Kostenlose Anfahrt"
      },
      marder: {
        title: "Marder vertreiben | Dachboden Schutz | Kammerjäger Hoffmeyer",
        description: "Tierschonende Marderabwehr ✓ Gebäudeabdichtung ✓ Geruchsneutralisation ✓ Langfristiger Schutz ✓ 24/7 verfügbar"
      },
      maeuse: {
        title: "Mäuse bekämpfen | Hygienisch & sicher | Kammerjäger Hoffmeyer",
        description: "Effektive Mäusebekämpfung ✓ Befallsanalyse ✓ Köderstationen & Fallen ✓ Abdichtung ✓ Kostenlose Erstberatung"
      },
      silberfische: {
        title: "Silberfische entfernen | Dauerhaft | Kammerjäger Hoffmeyer",
        description: "Nachhaltige Silberfischbekämpfung ✓ Ursachenanalyse ✓ Feuchtigkeitsberatung ✓ Gründliche Behandlung ✓ Langfristige Lösung"
      },
      kakerlaken: {
        title: "Kakerlaken vernichten | Professionell | Kammerjäger Hoffmeyer",
        description: "Schnelle Schabenbekämpfung ✓ Gel-Köder & Sprühbehandlung ✓ Hygiene-Beratung ✓ Mehrfachbehandlung ✓ Diskret & zuverlässig"
      },
      floehe: {
        title: "Flöhe eliminieren | Für Mensch & Tier sicher | Hoffmeyer",
        description: "Gründliche Flohbekämpfung ✓ Umgebungsbehandlung ✓ Wachstumsregulatoren ✓ Haustierfreundlich ✓ Nachbehandlung inklusive"
      }
    };

    const updateMetaTags = () => {
      const hash = window.location.hash.replace("#", "");
      
      if (hash && SERVICE_TITLES[hash]) {
        document.title = SERVICE_TITLES[hash].title;
        
        // Update meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.setAttribute('name', 'description');
          document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', SERVICE_TITLES[hash].description);
        
        // Meta tags updated for hash
      } else {
        // Reset to default
        document.title = `Kammerjäger Hoffmeyer | Professionelle Schädlingsbekämpfung${cityName !== 'Ihrer Stadt' ? ` in ${cityName}` : ''}`;
      }
    };

    updateMetaTags();
    window.addEventListener("hashchange", updateMetaTags);
    
    return () => window.removeEventListener("hashchange", updateMetaTags);
  }, [cityName]);

  // Dynamic title and description based on service route
  const pageTitle = serviceConfig 
    ? `${serviceConfig.metaTitle} ${cityName !== 'Ihrer Stadt' ? `in ${cityName}` : ''} | Kammerjäger Hoffmeyer`
    : `Kammerjäger Hoffmeyer - Professionelle Schädlingsbekämpfung in ${cityName}`;
  
  const pageDescription = serviceConfig 
    ? `${serviceConfig.metaDescription} Schnelle Hilfe in ${cityName}.`
    : `Sofortige Hilfe bei Schädlingsbefall in ${cityName}. IHK-zertifizierte Schädlingsbekämpfer für Bettwanzen, Insekten, Ratten und mehr. 24/7 Notdienst & kostenlose Anfahrt.`;
  
  const canonicalUrl = serviceConfig 
    ? `https://kammerjaeger-hoffmeyer.de/svc/${serviceConfig.slug}`
    : 'https://kammerjaeger-hoffmeyer.de/';

  // Service-specific Schema.org markup
  const serviceSchema = serviceConfig ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceConfig.schemaServiceType,
    "provider": {
      "@type": "ProfessionalService",
      "name": "Kammerjäger Hoffmeyer",
      "telephone": PHONE_NUMBER,
      "url": "https://kammerjaeger-hoffmeyer.de",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "DE",
        "addressLocality": cityName !== 'Ihrer Stadt' ? cityName : undefined
      }
    },
    "areaServed": {
      "@type": "City",
      "name": cityName !== 'Ihrer Stadt' ? cityName : "Deutschland"
    },
    "description": serviceConfig.metaDescription
  } : null;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <link rel="canonical" href={canonicalUrl} />
        {serviceConfig && (
          <meta name="keywords" content={serviceConfig.keywords.join(', ')} />
        )}
        {serviceSchema && (
          <script type="application/ld+json">
            {JSON.stringify(serviceSchema)}
          </script>
        )}
      </Helmet>
      
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
        <Navbar />
        
        <main className="flex-grow pt-[83px] md:pt-28">
          {/* Critical above-the-fold content loads first */}
          <Hero cityName={cityName} serviceConfig={serviceConfig} />
          <CityWelcomeBanner cityName={cityName} />
          <MovingLogoBanner />
          <FeaturedImage cityName={cityName} defaultCity="Ihrer Stadt" />
          
          {/* Below-the-fold content is lazy loaded */}
          <Suspense fallback={<div className="h-20 bg-muted/20 animate-pulse rounded-lg mx-4" />}>
            <LazyAboutUs />
          </Suspense>
          
          {/* Trust Badges - Zertifizierungen Bild */}
          <TrustBadges />
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Schnelle Hilfe benötigt? Rufen Sie uns an!" />
          
          {/* Prozess-Ablauf */}
          <Suspense fallback={<div className="h-32 bg-muted/20 animate-pulse rounded-lg mx-4" />}>
            <LazyProcessSteps />
          </Suspense>
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Bereit für den ersten Schritt?" />
          
          {/* Zertifizierungen */}
          <Suspense fallback={<div className="h-32 bg-muted/20 animate-pulse" />}>
            <LazyCertifications />
          </Suspense>
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Professionelle Beratung gewünscht?" />
          
          {/* Services - Full version with anchor IDs for SEO */}
          <Suspense fallback={<div className="h-96 bg-muted/20 animate-pulse rounded-lg mx-4" />}>
            <LazyServices cityName={cityName} />
          </Suspense>
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Schädlingsproblem? Wir helfen sofort!" />
          
          {/* Kundenbewertungen */}
          <Suspense fallback={<div className="h-40 bg-muted/20 animate-pulse" />}>
            <LazyReviews cityName={cityName} />
          </Suspense>
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Überzeugt? Kontaktieren Sie uns!" />
          
          {/* Zahlungsmöglichkeiten */}
          <Suspense fallback={<div className="h-32 bg-muted/20 animate-pulse" />}>
            <LazyPaymentOptions />
          </Suspense>
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Fragen zu unseren Zahlungsoptionen?" />
          
          <Suspense fallback={<div className="h-40 bg-muted/20 animate-pulse" />}>
            <LazyContact />
          </Suspense>
          
          {/* FAQ Section with SEO-optimized Schema.org markup */}
          <Suspense fallback={<div className="h-32 bg-muted/20 animate-pulse rounded-lg mx-4" />}>
            <LazyGeneralFAQ cityName={cityName} />
          </Suspense>
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Noch Fragen? Jetzt kostenlos anrufen!" />
          
          {/* SEO Keywords entfernt - versteckter Text ist ein Google Spam-Signal */}
        </main>
        
        <Footer />
        
        <PhoneButton phoneNumber={PHONE_NUMBER} variant="fixed" />
        <MobileStickyCTA />
      </div>
    </>
  );
};

export default Index;
