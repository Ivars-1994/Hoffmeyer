import React from 'react';
import { Calendar, Star } from 'lucide-react';
import PhoneButton from '../ui/PhoneButton';
import WhatsAppButton from '../ui/WhatsAppButton';
import Logo from '../ui/Logo';
import MoneyBackBadge from '../ui/MoneyBackBadge';
import EmergencyWaspBadge from '../ui/EmergencyWaspBadge';
import { ServiceConfig } from '../../utils/serviceConfig';
const PHONE_NUMBER = "+4915792453526";
interface HeroContentProps {
  cityName: string;
  serviceConfig?: ServiceConfig | null;
}
const HeroContent = ({
  cityName,
  serviceConfig
}: HeroContentProps) => {
  console.log("🎯 HERO CONTENT - Empfange Stadt:", cityName, "Service:", serviceConfig);
  const headline = serviceConfig ? `${serviceConfig.h1} in ${cityName}` : `Ihr Experte für effektive Schädlingsbekämpfung aus ${cityName} und Umgebung`;
  const subheadline = serviceConfig ? `Zertifizierte Profis mit über 20 Jahren Erfahrung. Wir bieten schnelle und diskrete ${serviceConfig.title} in ${cityName} und Umgebung.` : `Zertifizierte Profis mit über 20 Jahren Erfahrung aus ${cityName} und Umgebung. Wir bieten schnelle und diskrete Lösungen für Ihre Schädlingsprobleme.`;
  return <div className="w-full md:w-1/2 mb-6 sm:mb-8 md:mb-0 text-center md:text-left">
      <div className="flex justify-center md:justify-start mb-5 relative z-30">
        <Logo size="large" />
      </div>
      
      <div className="inline-block rounded-full backdrop-blur-md bg-accent/10 border border-accent/20 px-4 py-2 text-sm sm:text-base font-semibold text-accent mb-6 animate-fade-in relative z-10 shadow-sm">
        <span className="break-words mobile-text-boost">
          {serviceConfig ? serviceConfig.title : "Professionelle Schädlingsbekämpfung"}
        </span>
      </div>
      
      <h1 className="headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 animate-fade-in mobile-spacing-boost" style={{
      animationDelay: '100ms',
      letterSpacing: '-0.02em'
    }}>
        {headline}
      </h1>
      
      {/* Wespen-Notdienst Badge direkt unter dem Haupttitel */}
      <div className="flex justify-center md:justify-start mb-4 animate-fade-in" style={{
      animationDelay: '150ms'
    }}>
        <EmergencyWaspBadge variant="hero" />
      </div>
      
      {/* Social Proof - Bewertungen prominent */}
      <div className="flex items-center justify-center md:justify-start gap-2 mb-6 animate-fade-in" style={{
      animationDelay: '175ms'
    }}>
        <div className="flex">
          {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
        </div>
        <span className="text-base font-semibold text-foreground">4.9/5</span>
        <span className="text-sm text-muted-foreground">bei über 500 Bewertungen</span>
      </div>
      
      {/* Telefonnummer RIESIG und prominent */}
      <a href={`tel:${PHONE_NUMBER}`} className="block text-center md:text-left mb-6 animate-fade-in group" style={{
      animationDelay: '200ms'
    }}>
        
      </a>
      
      <p className="subheadline text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto md:mx-0 animate-fade-in mobile-text-boost" style={{
      animationDelay: '250ms',
      lineHeight: '1.5'
    }}>
        {subheadline}
      </p>
      
      <div className="flex flex-col gap-3 justify-center md:justify-start animate-fade-in" style={{
      animationDelay: '300ms'
    }}>
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          <div>
            <PhoneButton phoneNumber={PHONE_NUMBER} size="default" className="bg-[#DC2626] hover:bg-[#B91C1C] text-white text-lg font-bold py-4 px-8 shadow-xl mobile-button-boost animate-pulse-subtle" linkText="JETZT ANRUFEN" />
          </div>
          
          <div>
            <WhatsAppButton phoneNumber={PHONE_NUMBER} size="default" className="bg-green-600 hover:bg-green-700 text-base py-3 shadow-lg mobile-button-boost" />
          </div>
        </div>
        
        <div className="flex justify-center md:justify-start">
          <MoneyBackBadge />
        </div>
      </div>
      
      <div className="mt-5 bg-red-50 text-red-600 rounded-lg py-2.5 px-3 border border-red-200 shadow-sm flex items-center justify-center md:justify-start gap-2 animate-pulse-subtle animate-fade-in mobile-text-boost" style={{
      animationDelay: '400ms'
    }}>
        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
        <p className="text-sm sm:text-base font-medium">
          <span className="font-bold">HEUTE NOCH</span> freie Termine verfügbar!
        </p>
      </div>
    </div>;
};
export default HeroContent;