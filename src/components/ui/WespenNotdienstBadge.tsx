import React from 'react';
import { Siren } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WespenNotdienstBadgeProps {
  className?: string;
  showIcon?: boolean;
  animate?: boolean;
}

const WespenNotdienstBadge = ({
  className,
  showIcon = true,
  animate = true,
}: WespenNotdienstBadgeProps) => {
  return (
    <div className={cn(
      'inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#c9a227] bg-[#003311] text-[#c9a227] font-bold text-xs sm:text-sm shadow-lg',
      animate && 'animate-pulse-subtle',
      className
    )}>
      {showIcon && <Siren className="w-4 h-4 sm:w-5 sm:h-5" />}
      <span className="whitespace-nowrap">WESPEN-NOTDIENST</span>
      <span className="bg-[#c9a227] text-[#003311] px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold">
        24/7
      </span>
    </div>
  );
};

export default WespenNotdienstBadge;
