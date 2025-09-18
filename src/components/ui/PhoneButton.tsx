
import React from 'react';
import { PhoneIncoming } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhoneButtonProps {
  phoneNumber: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'fixed';
  size?: 'sm' | 'default' | 'lg';
  linkText?: string;
}

const PhoneButton = ({
  phoneNumber,
  className,
  variant = 'default',
  size = 'default',
  linkText = "Jetzt anrufen",
}: PhoneButtonProps) => {
  // Format the displayed number with spaces as +49 178 2581987
  const displayNumber = phoneNumber.replace(/(\+\d{2})(\d{3})(\d{7})/, '$1 $2 $3');
  
  // Keep the href format without spaces
  const formattedNumber = phoneNumber.replace(/\s/g, '');
  
  const handleClick = (e: React.MouseEvent) => {
    // Call Google Ads conversion tracking function
    // @ts-ignore
    if (typeof gtag_report_conversion === 'function') {
      // @ts-ignore
      gtag_report_conversion();
      
      // Add a small delay to ensure tracking fires before navigation
      if (variant !== 'fixed') {
        e.preventDefault();
        setTimeout(() => {
          window.location.href = `tel:${formattedNumber}`;
        }, 300);
        return false;
      }
    }
  };
  
  const baseStyles = "inline-flex items-center justify-center font-medium";
  
  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700 rounded-md",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-md",
    ghost: "text-accent hover:text-accent/80 rounded-md",
    link: "text-accent underline-offset-4 hover:underline",
    fixed: "fixed bottom-6 right-6 z-50 bg-blue-600 text-white shadow-xl rounded-full hover:bg-blue-700"
  };
  
  const sizeStyles = {
    sm: "text-xs px-3 py-1 gap-1",
    default: "text-sm px-4 py-2 gap-2",
    lg: "text-base px-6 py-3 gap-2 font-bold"
  };
  
  const fixedStyles = variant === 'fixed' 
    ? "w-16 h-16 flex items-center justify-center transition-colors" 
    : "";

  // Add extremely subtle animation classes with much slower animations
  const animationStyles = variant === 'fixed' 
    ? "hover:shadow-accent/30 hover:shadow-xl transition-shadow duration-1000 animate-ultra-slow-pulse" 
    : "hover:shadow-sm transition-all duration-700 hover:-translate-y-0.5";

  // If we're using the fixed variant button, we'll show only the icon
  // Otherwise, show the standard button with text and icon
  if (variant === 'fixed') {
    return (
      <a
        href={`tel:${formattedNumber}`}
        className={cn(
          baseStyles,
          variantStyles[variant],
          fixedStyles,
          animationStyles,
          "call-link ring-offset-background transition-all",
          "after:absolute after:inset-0 after:rounded-full after:border-4 after:border-blue-500/30 after:opacity-0 hover:after:opacity-100 after:animate-ping-very-slow after:animation-delay-500",
          className
        )}
        aria-label={displayNumber}
        onClick={handleClick}
      >
        <div className="relative">
          <PhoneIncoming size={28} className="text-white" />
        </div>
      </a>
    );
  }

  // Standard button with text
  return (
    <a
      href={`tel:${formattedNumber}`}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        animationStyles,
        "transition-all duration-700 hover:shadow",
        "call-link",
        className
      )}
      aria-label={displayNumber}
      onClick={handleClick}
    >
      <PhoneIncoming 
        size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16}
        className="flex-shrink-0"
      />
      {/* Display the formatted phone number */}
      {variant !== 'ghost' || size !== 'sm' ? (
        <span className="whitespace-nowrap font-bold">{displayNumber}</span>
      ) : null}
    </a>
  );
};

export default PhoneButton;
