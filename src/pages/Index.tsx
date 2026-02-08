
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import HartmannNavbar from '@/components/hartmann/HartmannNavbar';
import HartmannHero from '@/components/hartmann/HartmannHero';
import HartmannService from '@/components/hartmann/HartmannService';
import HartmannTestimonials from '@/components/hartmann/HartmannTestimonials';
import HartmannServices from '@/components/hartmann/HartmannServices';
import HartmannProcess from '@/components/hartmann/HartmannProcess';
import HartmannCertifications from '@/components/hartmann/HartmannCertifications';
import HartmannContact from '@/components/hartmann/HartmannContact';
import HartmannFooter from '@/components/hartmann/HartmannFooter';
import MobileStickyCTA from '../components/ui/MobileStickyCTA';
import { CityData } from '../utils/cityDetection';
import { getServiceConfig } from '../utils/serviceConfig';

// Declare gtag as a global function
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

const PHONE_NUMBER = "+4915792453526";

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
      const isGoogleAdsPlaceholder = cityParam.toLowerCase().includes('location') || 
                                   cityParam.includes('{') || 
                                   cityParam.includes('}') || 
                                   cityParam.toLowerCase() === 'locationcity';
      
      if (!isGoogleAdsPlaceholder) {
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
      const words = searchTerm.split(" ");
      let cityName = words[words.length - 1];
      
      const isValidCity = cityName.length >= 3 && 
                         !/^(entfernen|bekämpfen|hilfe|service|kosten|preise|notdienst|24h|sofort|schädlingsbekämpfung|kammerjäger|wespen|ratten|bettwanzen|mäuse|ungeziefer|schädling|desinfektion)$/i.test(cityName) &&
                         /^[a-zA-ZäöüÄÖÜß]+$/.test(cityName);
      
      if (isValidCity) {
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
    
    const sanitizedLocId = locId.replace(/[^0-9]/g, '').substring(0, 15);
    if (!sanitizedLocId || sanitizedLocId.length < 5) {
      return;
    }
    
    const fetchCityFromFunction = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch('/data/stadt_map.json', {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const stadtMap = await response.json();
          const value = stadtMap[sanitizedLocId];
          
          if (!value) return;
          
          const existingCityData = sessionStorage.getItem('cityData');
          if (existingCityData) return;
          
          // Check if value is a PLZ (4-5 digits) or direct city name
          const val = String(value).trim();
          const isPlz = /^\d{4,5}$/.test(val);
          
          if (isPlz) {
            const plz = val.length === 4 ? '0' + val : val;
            try {
              const plzResp = await fetch(`https://openplzapi.org/de/Localities?postalCode=${encodeURIComponent(plz)}`);
              if (plzResp.ok) {
                const plzData = await plzResp.json();
                const stadt = plzData?.[0]?.name;
                if (stadt) {
                  const newCityData = { name: stadt, plz };
                  setCityData(newCityData);
                  sessionStorage.setItem('detectedCityData', JSON.stringify(newCityData));
                  window.dispatchEvent(new CustomEvent('cityDetected', { detail: newCityData }));
                }
              }
            } catch { /* ignore */ }
          } else {
            const cityName = val.charAt(0).toUpperCase() + val.slice(1);
            const newCityData = { name: cityName, plz: '00000' };
            setCityData(newCityData);
            sessionStorage.setItem('detectedCityData', JSON.stringify(newCityData));
            window.dispatchEvent(new CustomEvent('cityDetected', { detail: newCityData }));
          }
        }
      } catch {
        // Silently fail - not critical for page function
      }
    };
    
    setTimeout(fetchCityFromFunction, 100);
  }, [cityParam, kwParam, locId]);

  
  // Einheitliche Stadt-Prioritäts-Logik für alle Komponenten
  const getDisplayCityName = () => {
    const storedFromKw = sessionStorage.getItem('cityData');
    if (storedFromKw) {
      try {
        const data = JSON.parse(storedFromKw);
        return data.name;
      } catch {
        // Ignore parse errors
      }
    }
    
    if (cityData?.name) {
      return cityData.name;
    }
    
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
        
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.setAttribute('name', 'description');
          document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', SERVICE_TITLES[hash].description);
      } else {
        document.title = `Kammerjäger Hoffmeyer | Professionelle Schädlingsbekämpfung${cityName !== 'Ihrer Stadt' ? ` in ${cityName}` : ''}`;
      }
    };

    updateMetaTags();
    window.addEventListener("hashchange", updateMetaTags);
    
    return () => window.removeEventListener("hashchange", updateMetaTags);
  }, [cityName]);

  const pageTitle = serviceConfig 
    ? `${serviceConfig.metaTitle} ${cityName !== 'Ihrer Stadt' ? `in ${cityName}` : ''} | Kammerjäger Hoffmeyer`
    : `Kammerjäger Hoffmeyer - Professionelle Schädlingsbekämpfung in ${cityName}`;
  
  const pageDescription = serviceConfig 
    ? `${serviceConfig.metaDescription} Schnelle Hilfe in ${cityName}.`
    : `Sofortige Hilfe bei Schädlingsbefall in ${cityName}. IHK-zertifizierte Schädlingsbekämpfer für Bettwanzen, Insekten, Ratten und mehr. 24/7 Notdienst & kostenlose Anfahrt.`;
  
  const canonicalUrl = serviceConfig 
    ? `https://kammerjaeger-hoffmeyer.de/svc/${serviceConfig.slug}`
    : 'https://kammerjaeger-hoffmeyer.de/';

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
      
      <div className="min-h-screen bg-[#003311]">
        <HartmannNavbar />
        <HartmannHero cityName={cityName} />
        <HartmannService />
        <HartmannTestimonials />
        <HartmannServices />
        <HartmannProcess />
        <HartmannCertifications />
        <HartmannContact />
        <HartmannFooter />
        <MobileStickyCTA />
      </div>
    </>
  );
};

export default Index;
