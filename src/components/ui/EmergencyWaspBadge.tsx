
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
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-3 rounded-lg shadow-xl border-2 border-white">
          <div className="flex items-center gap-2">
            {showIcon && <Siren className="w-5 h-5 animate-pulse" />}
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
        "bg-red-600 text-white px-4 py-2 rounded-full inline-flex items-center gap-2 shadow-lg",
        animate && "animate-pulse-subtle",
        className
      )}>
        {showIcon && <Siren className="w-4 h-4" />}
        <span className="font-bold text-sm whitespace-nowrap">24/7 WESPEN-NOTDIENST</span>
        <span className="bg-white text-red-600 px-2 py-0.5 rounded-full text-xs font-bold">VERFÜGBAR</span>
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
          "bg-red-600 text-white px-3 py-1 font-bold text-xs shadow-lg flex items-center gap-1 whitespace-nowrap border-2 border-white",
          animate && "animate-pulse-subtle"
        )}>
          {showIcon && <Siren className="w-3 h-3" />}
          NOTDIENST 24/7
        </Badge>
      </div>
    );
  }

  // inline variant (default)
  return (
    <Badge className={cn(
      "bg-red-600 text-white px-3 py-1 font-bold text-xs flex items-center gap-1 whitespace-nowrap",
      animate && "animate-pulse-subtle",
      className
    )}>
      {showIcon && <Siren className="w-3.5 h-3.5" />}
      24/7 WESPEN-NOTDIENST
    </Badge>
  );
};

export default EmergencyWaspBadge;
