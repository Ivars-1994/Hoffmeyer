import React from 'react';
import { Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PromoBannerProps {
  className?: string;
  text?: string;
}

const PromoBanner = ({ 
  className, 
  text = 'Heute: kostenlose Anfahrt' 
}: PromoBannerProps) => {
  return (
    <div className={cn(
      'w-full bg-[#c9a227] text-[#003311] py-2.5 px-4 text-center font-bold text-sm sm:text-base flex items-center justify-center gap-2',
      className
    )}>
      <Truck className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
      <span>{text}</span>
    </div>
  );
};

export default PromoBanner;
