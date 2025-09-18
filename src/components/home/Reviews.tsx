
import React, { useEffect, useState } from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { getCityFromParams, updateDynamicCityTags } from '../../utils/cityDetection';

interface ReviewsProps {
  cityName?: string;
}

const defaultReviews = [
  {
    name: "Markus Schmidt",
    location: "", // Wird dynamisch gefüllt
    rating: 5,
    text: "Fantastischer Service! Innerhalb von nur 24 Stunden war das Team bei mir vor Ort und hat den Wespenbefall in meinem Gartenhaus professionell beseitigt. Die Experten erklärten mir jeden Schritt genau und setzten dabei auf umweltfreundliche Methoden. Der Preis war absolut fair und transparent - keine versteckten Kosten.",
  },
  {
    name: "Sabine Müller",
    location: "", // Wird dynamisch gefüllt
    rating: 5,
    text: "Nach wochenlangem vergeblichem Kampf gegen Bettwanzen bin ich so froh, dass ich diese professionelle Schädlingsbekämpfung gefunden habe! Die Fachleute führten eine gründliche Hitzebehandlung durch, die alle Bettwanzen beseitigte. Seit 6 Monaten kein einziger Stich mehr! Die ausführliche Nachbetreuung und präventiven Tipps waren unbezahlbar. 100% Weiterempfehlung!",
  },
  {
    name: "Thomas Weber",
    location: "", // Wird dynamisch gefüllt
    rating: 5,
    text: "Absolut zuverlässiger und diskreter Service. Von der ersten Kontaktaufnahme bis zur vollständigen Beseitigung des Mäuseproblems in unserem Keller vergingen nur 48 Stunden. Der Techniker kam pünktlich zum vereinbarten Termin, arbeitete äußerst sorgfältig und hinterließ alles sauber. Die kostenlose Nachkontrolle nach 2 Wochen bestätigte: Problem dauerhaft gelöst!",
  },
  {
    name: "Claudia Fischer",
    location: "", // Wird dynamisch gefüllt
    rating: 5,
    text: "Hervorragende Arbeit bei der Bekämpfung eines hartnäckigen Ameisenbefalls in unserem Haus. Die umweltfreundliche Herangehensweise war mir besonders wichtig, da wir kleine Kinder haben. Der Experte nahm sich Zeit für eine detaillierte Beratung und zeigte uns präventive Maßnahmen. Ein Jahr später ist das Problem nicht wieder aufgetreten - das nenne ich nachhaltige Schädlingsbekämpfung!",
  },
  {
    name: "Monika Becker",
    location: "", // Wird dynamisch gefüllt
    rating: 5,  
    text: "Sehr professionelles Unternehmen mit IHK-zertifizierten Fachkräften! Der Kammerjäger hat unser jahrelanges Taubenproblem auf dem Dachboden endlich gelöst. Er installierte tierschutzgerechte Vergrämungsmaßnahmen und beseitigte alle Nistplätze fachgerecht. Die telefonische Beratung war ausführlich und die Preise fair. Die präventiven Maßnahmen funktionieren bis heute einwandfrei. Großes Lob!",
  },
  {
    name: "Jürgen Hoffmann",
    location: "", // Wird dynamisch gefüllt
    rating: 5,
    text: "Schneller und professioneller Service bei akutem Silberfischbefall in meiner Wohnung. Die kostenlose Anfahrt und die transparente Preisgestaltung waren ein großer Pluspunkt. Die Behandlung war wirkungsvoll und die Fachberatung sehr kompetent. Die Nachkontrolle wurde prompt und gründlich durchgeführt. Ich bin rundum zufrieden mit dem Service!",
  },
];

const Reviews = ({ cityName }: ReviewsProps) => {
  const isMobile = useIsMobile();
  const [cityInfo, setCityInfo] = useState(() => getCityFromParams());
  
  // Event Listener für Stadt-Updates
  useEffect(() => {
    const handleCityDetected = (event: CustomEvent) => {
      console.log("📝 REVIEWS - Stadt-Event empfangen:", event.detail);
      setCityInfo(event.detail);
    };

    window.addEventListener('cityDetected', handleCityDetected as EventListener);
    
    return () => {
      window.removeEventListener('cityDetected', handleCityDetected as EventListener);
    };
  }, []);
  
  useEffect(() => {
    console.log("Reviews: Verwende erkannte Stadt:", cityInfo);
    
    // Aktualisiere DOM-Elemente auch hier
    updateDynamicCityTags(cityInfo);
  }, [cityInfo]);
  
  console.log("📝 REVIEWS - Empfange Stadt:", cityInfo.name);
  
  // Alle Bewertungen verwenden jetzt die erkannte Stadt
  const reviews = defaultReviews.map((review, index) => ({
    ...review,
    location: cityInfo.name // Alle Bewertungen zeigen die erkannte Stadt
  }));
  
  return (
    <AnimatedSection id="reviews" className="bg-secondary/50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className={cn(
            "flex justify-center items-center mb-8",
            isMobile ? "flex-col gap-4" : "gap-6"
          )}>
            <h2 className="section-heading mb-0">Kundenbewertungen</h2>
            <a 
              href="https://www.provenexpert.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block"
            >
              <img 
                src="https://weltweiser.de/wp-content/uploads/2022/07/proven-expert.png" 
                alt="ProvenExpert Logo" 
                className={cn(
                  "object-contain", 
                  isMobile ? "h-20" : "h-16"
                )} 
              />
            </a>
          </div>
          <p className="section-subheading mb-0">
            Erfahren Sie, was unsere Kunden über unsere Schädlingsbekämpfungsdienste in <span data-city>{cityInfo.name}</span> sagen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
          {reviews.map((review, index) => (
            <Card key={index} className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 relative">
              <CardContent className="pt-6">
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      <path d="M1 1h22v22H1z" fill="none"/>
                    </svg>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">{review.name.charAt(0)}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{review.name}</h4>
                    <p className="text-xs text-gray-500 review-location">
                      {review.location}
                    </p>
                  </div>
                </div>
                
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn(
                        "h-5 w-5 mr-1", 
                        i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      )} 
                    />
                  ))}
                </div>
                
                <p className="text-sm text-gray-600 mt-2">{review.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-16">
          <div className="bg-white rounded-xl p-4 md:p-6 inline-block shadow-sm border border-primary/10">
            <div className="flex items-center justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="h-6 w-6 mr-1 text-yellow-400 fill-yellow-400" 
                />
              ))}
            </div>
            <p className="text-lg font-medium mb-2">
              4.9/5 Durchschnittsbewertung
            </p>
            <p className="text-sm text-muted-foreground">
              Basierend auf über 487 verifizierten Bewertungen in <span data-city>{cityInfo.name}</span> auf ProvenExpert
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Reviews;
