
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo = ({ size = 'medium', className }: LogoProps) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-20 h-20',
  };

  return (
    <div className={cn(sizeClasses[size], 'relative flex items-center justify-center', className)}>
      {/* Inline SVG for instant load - no HTTP request needed */}
      <svg 
        viewBox="0 0 150 150" 
        className="w-full h-full z-10 relative"
        style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.1))' }}
        aria-label="Kammerjäger Hoffmeyer Logo"
      >
        <circle cx="75" cy="75" r="70" fill="#9b87f5" opacity="0.1"/>
        <circle cx="75" cy="75" r="60" fill="none" stroke="#9b87f5" strokeWidth="3"/>
        <path d="M75 30 L75 50 M75 100 L75 120 M30 75 L50 75 M100 75 L120 75" 
          stroke="#9b87f5" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="75" cy="75" r="15" fill="#9b87f5"/>
        <text x="75" y="145" textAnchor="middle" fontSize="12" fill="#9b87f5" fontWeight="bold">
          Hoffmeyer
        </text>
      </svg>
    </div>
  );
};

export default Logo;
