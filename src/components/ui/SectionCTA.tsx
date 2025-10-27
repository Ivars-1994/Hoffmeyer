
import React from 'react';
import PhoneButton from './PhoneButton';
import MoneyBackBadge from './MoneyBackBadge';
import { useIsMobile } from '@/hooks/use-mobile';

interface SectionCTAProps {
  text?: string;
  phoneNumber: string;
}

const SectionCTA = ({ 
  text = "Jetzt kostenlos beraten lassen!", 
  phoneNumber 
}: SectionCTAProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="py-16 bg-gradient-to-r from-accent/5 via-accent/8 to-accent/5">
      <div className="container mx-auto text-center px-4">
        <div className="max-w-4xl mx-auto glass-card p-10 sm:p-12 shadow-2xl relative">
          <p className="text-2xl sm:text-3xl md:text-4xl mb-8 text-accent font-bold leading-tight">{text}</p>
          <div className="flex flex-col items-center gap-6">
            <PhoneButton 
              phoneNumber={phoneNumber} 
              size={isMobile ? "default" : "lg"}
              variant="cta"
              className="w-full sm:w-auto mobile-button-boost"
            />
            <MoneyBackBadge />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionCTA;
