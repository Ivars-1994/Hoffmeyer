
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
    <div className="py-8 bg-gradient-to-r from-accent/5 to-accent/10">
      <div className="container mx-auto text-center px-4">
        <div className="max-w-3xl mx-auto card-base p-6 sm:p-8 shadow-xl border-accent/10 relative">
          <p className="text-xl sm:text-2xl md:text-3xl mb-6 text-accent font-bold leading-tight">{text}</p>
          <div className="flex flex-col items-center gap-4">
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
