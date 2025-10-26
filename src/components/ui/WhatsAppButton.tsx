
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
  phoneNumber: string;
  className?: string;
  variant?: 'default' | 'success' | 'outline' | 'ghost' | 'link' | 'fixed';
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
  
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200";
  
  const variantStyles = {
    default: "bg-success text-success-foreground hover:bg-success/90 shadow-md hover:shadow-lg hover:-translate-y-0.5",
    success: "bg-success text-success-foreground hover:bg-success/90 shadow-md hover:shadow-lg hover:-translate-y-0.5",
    outline: "border-2 border-success text-success hover:bg-success/5",
    ghost: "text-success hover:bg-success/10",
    link: "text-success underline-offset-4 hover:underline",
    fixed: "fixed bottom-24 right-6 z-50 bg-success text-success-foreground shadow-xl rounded-full hover:scale-105 active:scale-95"
  };
  
  const sizeStyles = {
    sm: "text-sm px-4 py-2 gap-2 h-9",
    default: "text-base px-6 py-3 gap-2 h-11",
    lg: "text-lg px-8 py-4 gap-2 h-14"
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
