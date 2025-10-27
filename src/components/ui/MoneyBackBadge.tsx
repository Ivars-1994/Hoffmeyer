
import React from 'react';
import { BadgePercent } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './badge';

interface MoneyBackBadgeProps {
  className?: string;
  variant?: 'default' | 'outline' | 'floating';
  showIcon?: boolean;
}

const MoneyBackBadge = ({
  className,
  variant = 'default',
  showIcon = true,
}: MoneyBackBadgeProps) => {
  if (variant === 'floating') {
    return (
      <div className={cn(
        "absolute -right-3 -top-3 rotate-12 z-10",
        className
      )}>
        <Badge 
          className="bg-success text-success-foreground px-4 py-2.5 font-bold text-xs shadow-xl flex items-center gap-1.5 whitespace-nowrap border-2 border-white hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          {showIcon && <BadgePercent className="w-4 h-4" />}
          100% Geld-zurück Garantie
        </Badge>
      </div>
    );
  }

  return (
    <Badge 
      className={cn(
        "bg-success text-success-foreground px-5 py-2 font-bold text-sm flex items-center gap-2 whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105",
        variant === 'outline' && "backdrop-blur-md bg-white/80 border-2 border-success text-success hover:bg-white/90",
        className
      )}
    >
      {showIcon && <BadgePercent className="w-5 h-5" />}
      100% Geld-zurück Garantie
    </Badge>
  );
};

export default MoneyBackBadge;
