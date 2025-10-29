
import React, { useEffect, useState } from 'react';
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
import FeaturedImage from '../components/home/FeaturedImage';
import { useParams } from 'react-router-dom';
import SeoKeywords from '../components/seo/SeoKeywords';
import CookieConsent from '../components/CookieConsent';
import { detectAndUpdateCity, CityData } from '../utils/cityDetection';

const PHONE_NUMBER = "+4915212124199";
const DEFAULT_CITY = "Ihrer Stadt";

// Erweiterte Liste deutscher Städte für die Erkennung
const cityList = [
  'Aachen', 'Ahaus', 'Ahlen', 'Alfter', 'Altena', 'Altenbeken', 'Anröchte',
  'Arnsberg', 'Ascheberg', 'Attendorn', 'Augustdorf', 
  'Bad Berleburg', 'Bad Honnef', 'Bad Laasphe', 'Bad Oeynhausen', 'Bad Salzuflen', 
  'Beckum', 'Bedburg', 'Bergheim', 'Bergisch Gladbach', 'Bergkamen', 'Bergneustadt',
  'Berlin', 'Bestwig', 'Beverungen', 'Bielefeld', 'Billerbeck', 'Bocholt', 'Bochum', 
  'Bonn', 'Borchen', 'Borgentreich', 'Borgholzhausen', 'Borken', 'Bornheim', 'Bottrop', 
  'Brakel', 'Bremen', 'Brühl', 'Bünde', 'Burbach', 'Burscheid', 
  'Castrop-Rauxel', 'Coesfeld', 
  'Datteln', 'Delbrück', 'Detmold', 'Dinslaken', 'Dormagen', 'Dorsten', 'Dortmund', 
  'Dresden', 'Drolshagen', 'Duisburg', 'Dülmen', 'Düsseldorf', 
  'Emmerich', 'Emsdetten', 'Enge', 'Enger', 'Engelskirchen', 'Ennepetal', 'Ennigerloh', 
  'Erftstadt', 'Erkenschwick', 'Erkrath', 'Erndtebrück', 'Erzgebirge', 'Eschweiler', 'Essen', 'Eslohe', 
  'Espelkamp', 'Essen', 'Extertal', 
  'Frankfurt', 'Frechen', 'Freiburg', 'Freudenberg', 
  'Gelsenkirchen', 'Gescher', 'Geseke', 'Gevelsberg', 'Gladbeck', 'Greven', 'Grevenbroich', 
  'Gütersloh', 'Gummersbach', 
  'Haan', 'Hagen', 'Haltern', 'Haltern am See', 'Halver', 'Hamburg', 'Hamm', 'Hamminkeln', 'Hannover', 
  'Harsewinkel', 'Hattingen', 'Havixbeck', 'Heek', 'Heiligenhaus', 'Herdecke', 'Herford', 'Herne', 'Herten', 
  'Herzogenrath', 'Hilchenbach', 'Hilden', 'Hille', 'Horn-Bad Meinberg', 'Hörstel', 'Hövel', 'Hövelhof', 
  'Höxter', 'Hückeswagen', 'Hünxe', 'Hürth', 'Hüllhorst', 
  'Ibbenbüren', 'Iserlohn', 'Isselburg', 
  'Jüchen', 
  'Kaarst', 'Kamen', 'Kamp-Lintfort', 'Karlsruhe', 'Kerpen', 'Kierspe', 'Kirchhundem', 'Kleve', 'Köln', 
  'Königswinter', 'Korschenbroich', 'Krefeld', 'Kreuztal', 'Kürten', 
  'Lage', 'Langenfeld', 'Leipzig', 'Leichlingen', 'Lemgo', 'Lengerich', 'Lennestadt', 
  'Leverkusen', 'Lichtenau', 'Lindlar', 'Lippspringe', 'Lippstadt', 'Lübbecke', 'Lüdenscheid', 
  'Lüdinghausen', 'Lünen', 
  'Mannheim', 'Marienmünster', 'Marienheide', 'Marl', 'Marsberg', 'Medebach', 'Meerbusch', 
  'Meinerzhagen', 'Menden', 'Meckenheim', 'Meschede', 'Mettmann', 'Minden', 'Moers', 'Monheim', 
  'Monheim am Rhein', 'Monschau', 'Mönchengladbach', 'Morsbach', 'Much', 'München', 'Münster', 
  'Netphen', 'Neuenrade', 'Neunkirchen', 'Neuss', 'Neustadt', 'Niederkassel', 'Nieheim', 
  'Nottuln', 'Nümbrecht', 'Nürnberg', 'Neukirchen-Vluyn',
  'Oberhausen', 'Oberveischede', 'Ochtrup', 'Odenthal', 'Oelde', 'Oer-Erkenschwick', 'Olfen', 
  'Olpe', 'Olsberg', 'Ostbevern', 'Overath', 
  'Paderborn', 'Petershagen', 'Plettenberg', 'Porta Westfalica', 'Preußisch Oldendorf', 'Pulheim', 
  'Radevormwald', 'Raesfeld', 'Ratingen', 'Recklinghausen', 'Rees', 'Reichshof', 'Remscheid', 
  'Rheda-Wiedenbrück', 'Rhede', 'Rheinberg', 'Rheine', 'Rietberg', 'Roetgen', 'Rommerskirchen', 
  'Rosendahl', 'Rösrath', 'Rüthen', 
  'Salzkotten', 'Sankt Augustin', 'Sassenberg', 'Schalksmühle', 'Schermbeck', 'Schieder-Schwalenberg', 
  'Schloß Holte-Stukenbrock', 'Schmallenberg', 'Schwelm', 'Schwerte', 'Selm', 'Senden', 'Sendenhorst', 
  'Siegburg', 'Siegen', 'Simmerath', 'Soest', 'Solingen', 'Sprockhövel', 'Stadtlohn', 'Steinfurt', 
  'Steinhagen', 'Steinheim', 'Stemwede', 'Stolberg', 'Stuttgart', 'Südlohn', 'Sundern', 
  'Telgte', 'Troisdorf', 
  'Unna', 
  'Velbert', 'Verl', 'Viersen', 'Voerde', 'Vreden', 
  'Wadersloh', 'Waldbröl', 'Waltrop', 'Warendorf', 'Warburg', 'Warstein', 'Wenden', 'Werl', 
  'Wermelskirchen', 'Wesel', 'Wesseling', 'Westerkappeln', 'Wetter', 'Wickede', 'Wiehl', 'Willebadessen', 
  'Willich', 'Wilnsdorf', 'Winterberg', 'Wipperfürth', 'Witten', 'Wuppertal', 'Würselen', 
  'Xanten'
];

  const CityPage = () => {
  const { city } = useParams();
  
  // Funktion zum Kapitalisieren der Stadt
  const capitalizeCity = (cityStr: string) => {
    if (!cityStr || cityStr === DEFAULT_CITY) return cityStr;
    return cityStr.charAt(0).toUpperCase() + cityStr.slice(1);
  };
  
  const [cityName, setCityName] = useState(capitalizeCity(city || DEFAULT_CITY));
  const [cityData, setCityData] = useState<CityData>({ name: capitalizeCity(city || DEFAULT_CITY), plz: "00000" });
  
  // Stadt-Erkennung mit dem integrierten System
  useEffect(() => {
    console.log("🔍 CityPage: Stadt-Erkennung wird ausgeführt...");
    
    // Wenn bereits eine Stadt aus den Route-Parametern da ist
    if (city) {
      const capitalizedCity = capitalizeCity(city);
      console.log("✅ CityPage: Stadt aus Route-Parametern:", capitalizedCity);
      setCityName(capitalizedCity);
      setCityData({ name: capitalizedCity, plz: "00000" });
      return;
    }

    // Verwende das integrierte Erkennungssystem
    const runDetection = async () => {
      try {
        console.log("🔍 CityPage: Führe detectAndUpdateCity aus...");
        const detectedCity = await detectAndUpdateCity();
        console.log("✅ CityPage: Stadt erkannt:", detectedCity);
        
        setCityName(detectedCity.name);
        setCityData(detectedCity);
      } catch (error) {
        console.error("❌ CityPage: Fehler bei Stadt-Erkennung:", error);
        setCityName(DEFAULT_CITY);
        setCityData({ name: DEFAULT_CITY, plz: "00000" });
      }
    };

    runDetection();

    // Event Listener für Stadt-Updates
    const handleCityDetected = (event: CustomEvent<CityData>) => {
      console.log("🔄 CityPage: City detected event empfangen:", event.detail);
      setCityName(event.detail.name);
      setCityData(event.detail);
    };

    window.addEventListener('cityDetected', handleCityDetected as EventListener);
    
    return () => {
      window.removeEventListener('cityDetected', handleCityDetected as EventListener);
    };
  }, [city]);

  const pageTitle = `Kammerjäger Adalbert - Professionelle Schädlingsbekämpfung in ${cityName}`;
  const pageDescription = `Sofortige Hilfe bei Schädlingsbefall in ${cityName}. IHK-zertifizierte Schädlingsbekämpfer für Bettwanzen, Insekten, Ratten und mehr. 24/7 Notdienst & kostenlose Anfahrt.`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="preconnect" href="https://storage.googleapis.com" />
        <link rel="preconnect" href="https://www.immoportal.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </Helmet>
      
      <CookieConsent 
        hasCityInUrl={!!city}
        onCityDetected={(detectedCity) => {
          if (!city) {
            setCityName(detectedCity.name);
            setCityData(detectedCity);
          }
        }}
      />
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
        <Navbar />
        
        <main className="flex-grow pt-[76px] md:pt-[80px]">
          <Hero cityName={cityName} />
          <div className="bg-accent text-white py-2">
            <div className="container mx-auto">
              <div className="flex items-center justify-center">
                <p className="text-sm font-medium md:text-base">
                  Willkommen aus <span className="city-welcome font-bold">{cityName}</span>
                </p>
              </div>
            </div>
          </div>
          
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Schnelle Hilfe benötigt? Rufen Sie uns an!" />
          <MovingLogoBanner />
          <FeaturedImage cityName={cityName} defaultCity={DEFAULT_CITY} />
          
          <AboutUs cityName={cityName} />
          
          <Services />
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Schädlingsproblem? Wir helfen sofort!" />
          <Certifications />
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Professionelle Beratung gewünscht?" />
          <Reviews cityName={cityName} />
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Überzeugt? Kontaktieren Sie uns!" />
          <PaymentOptions />
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Fragen zu unseren Zahlungsoptionen?" />
          <Contact />
          
          {/* SEO Keywords für Google-Indexierung */}
          <SeoKeywords />
        </main>
        
        <Footer />
        
        <PhoneButton phoneNumber={PHONE_NUMBER} variant="fixed" />
        <WhatsAppButton phoneNumber={PHONE_NUMBER} variant="fixed" />
      </div>
    </>
  );
};

export default CityPage;
