
import React from 'react';
import { Siren } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './badge';

interface EmergencyWaspBadgeProps {
  className?: string;
  variant?: 'hero' | 'floating' | 'service-highlight' | 'inline';
  showIcon?: boolean;
  animate?: boolean;
}

const EmergencyWaspBadge = ({
  className,
  variant = 'hero',
  showIcon = true,
  animate = true,
}: EmergencyWaspBadgeProps) => {
  
  if (variant === 'floating') {
    return (
      <div className={cn(
        "fixed right-4 top-1/2 transform -translate-y-1/2 z-50 rotate-12",
        animate && "animate-pulse-subtle",
        className
      )}>
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-5 py-4 rounded-2xl shadow-2xl border-2 border-white backdrop-blur-sm hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-2.5">
            {showIcon && <Siren className="w-6 h-6 animate-pulse" />}
            <div>
              <div className="font-bold text-sm">WESPEN-NOTDIENST</div>
              <div className="text-xs opacity-90">24/7 verfügbar</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={cn(
        "bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 sm:px-5 py-2.5 rounded-full inline-flex items-center gap-2 sm:gap-2.5 shadow-xl border-2 border-red-700 hover:shadow-2xl transition-all duration-300 hover:scale-105",
        className
      )}>
        {showIcon && <Siren className="w-4 h-4 sm:w-5 sm:h-5" />}
        <span className="font-bold text-xs sm:text-sm whitespace-nowrap">24/7 WESPEN-NOTDIENST</span>
        <span className="bg-white text-red-600 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold">VERFÜGBAR</span>
      </div>
    );
  }

  if (variant === 'service-highlight') {
    return (
      <div className={cn(
        "absolute -top-2 -right-2 z-10",
        className
      )}>
        <Badge className={cn(
          "bg-gradient-to-r from-red-600 to-orange-500 text-white px-3.5 py-1.5 font-bold text-xs shadow-xl flex items-center gap-1.5 whitespace-nowrap border-2 border-white hover:scale-105 transition-transform duration-200",
          animate && "animate-pulse-subtle"
        )}>
          {showIcon && <Siren className="w-3.5 h-3.5" />}
          NOTDIENST 24/7
        </Badge>
      </div>
    );
  }

  // inline variant (default)
  return (
    <Badge className={cn(
      "bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-1.5 font-bold text-xs flex items-center gap-1.5 whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105",
      animate && "animate-pulse-subtle",
      className
    )}>
      {showIcon && <Siren className="w-4 h-4" />}
      24/7 WESPEN-NOTDIENST
    </Badge>
  );
};

export default EmergencyWaspBadge;
