
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
          className="bg-green-600 text-white px-3 py-2 font-bold text-xs shadow-lg flex items-center gap-1 whitespace-nowrap border-2 border-white"
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
        "bg-green-600 text-white px-3 py-1 font-bold text-xs flex items-center gap-1 whitespace-nowrap",
        variant === 'outline' && "bg-transparent border-2 border-green-600 text-green-600",
        className
      )}
    >
      {showIcon && <BadgePercent className="w-3.5 h-3.5" />}
      100% Geld-zurück Garantie
    </Badge>
  );
};

export default MoneyBackBadge;
