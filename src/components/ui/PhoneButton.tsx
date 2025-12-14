
import React from 'react';
import { PhoneIncoming } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhoneButtonProps {
  phoneNumber: string;
  className?: string;
  variant?: 'default' | 'cta' | 'success' | 'outline' | 'ghost' | 'link' | 'fixed';
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
  
  const handleClick = () => {
    // Send GTM dataLayer event for conversion tracking
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        'event': 'phone_click',
        'phone_number': formattedNumber,
        'button_variant': variant
      });
    }
    
    // Fire Google Ads conversion but DON'T prevent default - let the tel: link work naturally
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-17399576460/l7ZeCJ-hl50bElzv4ehA',
        'event_callback': function() {
          console.log('Phone conversion tracked');
        }
      });
    }
    // Don't return false or preventDefault - allow native tel: link to work
  };
  
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg";
  
  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
    cta: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl",
    success: "bg-success text-success-foreground hover:bg-success/90 shadow-md hover:shadow-lg",
    outline: "border-2 border-accent text-accent hover:bg-accent/5",
    ghost: "text-accent hover:text-accent/80 hover:bg-accent/10",
    link: "text-accent underline-offset-4 hover:underline",
    fixed: "fixed bottom-6 right-6 z-50 bg-accent text-accent-foreground shadow-xl rounded-full hover:bg-accent/90"
  };
  
  const sizeStyles = {
    sm: "text-sm px-4 py-2 gap-2 h-9",
    default: "text-base px-6 py-3 gap-2 h-11",
    lg: "text-lg px-8 py-4 gap-2 h-14"
  };
  
  const fixedStyles = variant === 'fixed' 
    ? "w-16 h-16 flex items-center justify-center transition-colors" 
    : "";

  // Add extremely subtle animation classes with much slower animations
  const animationStyles = variant === 'fixed' 
    ? "hover:shadow-accent/30 hover:shadow-xl transition-shadow duration-1000 animate-ultra-slow-pulse" 
    : "hover:shadow-sm transition-all duration-700 hover:-translate-y-0.5";

  // If we're using the fixed variant button, hide it on mobile since we have MobileStickyCTA
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
          "hidden md:flex", // Hide on mobile, show on desktop
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
