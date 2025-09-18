import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { Bug, Rat, Sprout, Bed, BugOff, Stethoscope, Mouse } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';
import EmergencyWaspBadge from '../ui/EmergencyWaspBadge';

const services = [
 {
    icon: <Bug className="h-10 w-10" />,
    title: "Wespenbekämpfung",
    description: "Sichere und fachgerechte Entfernung von Wespennestern und Insektenschwärmen an Ihrem Gebäude.",
    image: "https://www.bund-niedersachsen.de/fileadmin/niedersachsen/bilder/artenschutz/wespen/wespennest_wasp-nest-gba3281439_1920_pixabay_com_wespennest-wespen-waben-nest-335984_kundennote_com.jpg",
    alt: "Professionelle Wespenbekämpfung und Nestentfernung",
    keywords: ["Wespenbekämpfung", "Wespennest entfernen", "Wespenplage"]
  },

    {
    icon: <Bug className="h-10 w-10" />,
    title: "Ameisenbekämpfung",
    description: "Gezielte und nachhaltige Bekämpfung von Ameisen in Wohnräumen, Gärten und Terrassen.",
    image: "https://www.swr.de/swr1/swr1leute/1724937119340%2Cameisen-schaedling-oder-chance-ewiges-leben-susanne-foitzik-100~_v-16x9@2dL_-6c42aff4e68b43c7868c3240d3ebfa29867457da.jpg",
    alt: "Professionelle Ameisenbekämpfung im Innen- und Außenbereich",
    keywords: ["Ameisenbekämpfung", "Ameisennest entfernen", "Ameisen loswerden"]
  },


  {
    icon: <Rat className="h-10 w-10" />,
    title: "Rattenbekämpfung",
    description: "Professionelle Beseitigung von Ratten in Wohnhäusern, Gärten und Betrieben mit nachhaltigen Lösungen.",
    image: "https://www.das-tierlexikon.de/wp-content/uploads/2018/08/mongolische-rennmaeuse.jpg",
    alt: "Effektive Rattenbekämpfung durch Fachexperten",
    keywords: ["Rattenbekämpfung", "Rattenbefall", "Rattenplage entfernen"]
  },

   {
    icon: <Bed className="h-10 w-10" />,
    title: "Bettwanzenbekämpfung",
    description: "Spezialisierte Behandlung zur vollständigen Beseitigung von Bettwanzen und deren Eiern in Wohn- und Schlafräumen.",
    image: "https://farmers-cat.de/media/wysiwyg/Bettwanzen/shutterstock_2236348135_.jpg",
    alt: "Spezialisierte Bettwanzenbekämpfung durch qualifizierte Kammerjäger",
    keywords: ["Bettwanzenbekämpfung", "Bettwanzen Behandlung", "Bettwanzen loswerden"]
  },

  {
    icon: <BugOff className="h-10 w-10" />,
    title: "Marderbekämpfung",
    description: "Fachgerechte Vertreibung und Prävention von Mardern in Wohnhäusern, auf Dachböden und in Autos.",
    image: "https://www.ruv.de/dam/ratgeber/images/2017/54-02-2017-486069343.jpg",
    alt: "Marderbekämpfung für Dachböden und Wohnräume durch zertifizierte Experten",
    keywords: ["Marderbekämpfung", "Marderschutz", "Marder Dachboden"]
  },

  {
    icon: <Mouse className="h-10 w-10" />,
    title: "Mäusebekämpfung",
    description: "Effektive Entfernung von Mäusen und anderen Nagetieren aus Ihrem Zuhause oder Geschäftsräumen.",
    image: "https://bk-schaedling.de/wp-content/uploads/2019/12/Maus-am-Kabel-WEB.jpg",
    alt: "Professionelle Mäusebekämpfung durch zertifizierte Kammerjäger",
    keywords: ["Mäusebekämpfung", "Mäusebefall", "Mäusenest entfernen"]
  },


  {
    icon: <Bug className="h-10 w-10" />,
    title: "Silberfisch- & Papierfischbekämpfung",
    description: "Effektive Bekämpfung von Silberfischen und Papierfischen für ein gesundes Raumklima ohne Schädlinge.",
    image: "https://ardap.de/cdn/shop/articles/ofenfischchen_a454c276-fce2-4a2a-9e50-95f0e23de197.jpg?v=1744916439",
    alt: "Spezialisierte Bekämpfung von Silberfischen und Papierfischen",
    keywords: ["Silberfischbekämpfung", "Papierfischbekämpfung", "Feuchtigkeit bekämpfen"]
  },
 
 
  {
    icon: <Bug className="h-10 w-10" />,
    title: "Flohbekämpfung",
    description: "Gründliche Beseitigung von Flöhen in Wohnräumen und Polstermöbeln mit langanhaltender Wirkung.",
    image: "https://kaspar-schaedlingsbekaempfung.de/wp-content/uploads/2020/09/Floh1-shutterstock_1408962617-1024x646.jpg",
    alt: "Professionelle Flohbekämpfung für Wohnräume und Polstermöbel",
    keywords: ["Flohbekämpfung", "Flöhe bekämpfen", "Flohbefall behandeln"]
  },
  {
    icon: <Stethoscope className="h-10 w-10" />,
    title: "Wartungsverträge",
    description: "Vorbeugende Maßnahmen und regelmäßige Inspektionen zum kontinuierlichen Schutz vor Schädlingsbefall.",
    image: "https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=1000",
    alt: "Vorsorgende Schädlingsbekämpfung durch regelmäßige Inspektionen und Wartungsverträge",
    keywords: ["Schädlingsmonitoring", "Präventionsservice", "Wartungsvertrag Schädlinge"]
  },
];

const Services = () => {
  return (
    <AnimatedSection id="services" className="bg-secondary/50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="section-heading">
            Unsere Schädlingsbekämpfung-Dienstleistungen
          </h2>
          <p className="section-subheading">
            Wir bekämpfen gezielt Ratten, Mäuse, Marder, Ameisen, Silberfische, Papierfische, Wespen, Bettwanzen und Flöhe mit professionellen und nachhaltigen Methoden.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12 rounded-xl overflow-hidden shadow-md">
          <AspectRatio ratio={16/9}>
            <img 
              src="https://www.immoportal.com/sites/default/files/2022-01/kammerjaeger_andreypopov_immoportal.jpg" 
              alt="Professionelle Schädlingsbekämpfung in Aktion durch zertifizierte Experten" 
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              width="840"
              height="473"
              loading="lazy"
              decoding="async"
            />
          </AspectRatio>
          <div className="bg-white p-4 text-center text-sm text-muted-foreground">
            Unsere zertifizierten Kammerjäger bekämpfen alle Arten von Schädlingen in Ihrem Zuhause oder Geschäft
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((service, index) => {
            // Wespenbekämpfung ist der 6. Service (Index 5)
            const isWaspService = service.title === "Wespenbekämpfung";
            
            return (
              <Card
                key={index}
                className={cn(
                  "border transition-all duration-300 hover:shadow-md hover:translate-y-[-5px] relative",
                  isWaspService ? "border-red-500 border-2" : "border-primary/10"
                )}
              >
                {/* Notdienst-Badge nur für Wespenbekämpfung */}
                {isWaspService && (
                  <EmergencyWaspBadge variant="service-highlight" />
                )}
                
                <div className="mb-5 rounded-lg overflow-hidden">
                  <AspectRatio ratio={16/9}>
                    <img 
                      src={service.image} 
                      alt={service.alt} 
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                      width="400"
                      height="225"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        // Fallback for image loading errors
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/placeholder.svg';
                      }}
                    />
                  </AspectRatio>
                </div>
                
                <CardContent className="pt-6">
                  <div className={cn(
                    "rounded-full p-4 inline-flex mb-5",
                    isWaspService ? "bg-red-100 text-red-600" : "bg-accent/10 text-accent"
                  )}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                  
                  <div className="sr-only">
                    <h4>Stichworte zur {service.title}</h4>
                    <ul>
                      {service.keywords.map((keyword, idx) => (
                        <li key={idx}>{keyword}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg mb-6">
            Alle Leistungen werden in NRW mit einer <span className="font-semibold text-accent">kostenlosen Anfahrt</span> und einem <span className="font-semibold text-accent">transparenten Preismodell</span> angeboten.
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-accent text-accent-foreground hover:bg-accent/90 font-medium transition-colors shadow-sm"
          >
            Kostenlose Beratung anfordern
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Services;
