
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
  phoneNumber: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'fixed';
  size?: 'sm' | 'default' | 'lg';
  message?: string;
}

const WhatsAppButton = ({
  phoneNumber,
  className,
  variant = 'default',
  size = 'default',
  message = "Hallo, ich habe eine Anfrage bezüglich Schädlingsbekämpfung."
}: WhatsAppButtonProps) => {
  const formattedNumber = phoneNumber.replace(/\s/g, '').replace(/^\+/, '');
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
  
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all ease-in-out duration-300";
  
  const variantStyles = {
    default: "bg-green-600 text-white hover:bg-green-700 rounded-md shadow-sm hover:shadow-md",
    outline: "border border-green-600 text-green-600 hover:bg-green-600/10 rounded-md hover:shadow-md",
    ghost: "text-green-600 hover:bg-green-600/10 rounded-md",
    link: "text-green-600 underline-offset-4 hover:underline",
    fixed: "fixed bottom-24 right-6 z-50 bg-green-600 text-white shadow-lg rounded-full hover:scale-110 active:scale-95 transition-transform"
  };
  
  const sizeStyles = {
    sm: "text-xs px-3 py-1 gap-1",
    default: "text-sm px-4 py-2 gap-2",
    lg: "text-base px-6 py-3 gap-2"
  };
  
  const fixedStyles = variant === 'fixed' 
    ? "w-14 h-14 flex items-center justify-center" 
    : "";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        baseStyles,
        variantStyles[variant],
        variant !== 'fixed' ? sizeStyles[size] : fixedStyles,
        className
      )}
      aria-label="WhatsApp Kontakt"
    >
      {variant === 'fixed' ? (
        <MessageCircle size={24} className="animate-pulse" />
      ) : (
        <>
          <MessageCircle 
            size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} 
            className="flex-shrink-0"
          />
          {variant !== 'ghost' || size !== 'sm' ? (
            <span className="whitespace-nowrap">WhatsApp</span>
          ) : null}
        </>
      )}
    </a>
  );
};

export default WhatsAppButton;
