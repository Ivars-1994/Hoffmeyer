
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
    <div className="py-6 bg-gradient-to-r from-accent/5 to-accent/10">
      <div className="container mx-auto text-center px-3">
        <div className="max-w-3xl mx-auto bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-lg border border-accent/20 relative">
          <p className={`text-lg sm:text-xl md:text-2xl mb-4 md:mb-6 text-accent font-bold mobile-text-boost`}>{text}</p>
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <PhoneButton 
              phoneNumber={phoneNumber} 
              size={isMobile ? "default" : "lg"}
              className="bg-blue-600 hover:bg-blue-700 text-base md:text-lg py-2.5 sm:py-3 md:py-4 shadow-lg transition-colors mobile-button-boost"
            />
            <MoneyBackBadge />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionCTA;
