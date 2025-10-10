import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const PHONE_NUMBER = "+49 1521 2124199";

const MobileStickyCTA = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const handlePhoneClick = () => {
    // Google Ads Conversion Tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16772701268/8sOcCOaZk-QZEJHsmuI-',
        'value': 1.0,
        'currency': 'EUR'
      });
    }
  };

  const formatPhoneForDisplay = (phone: string) => {
    return phone.replace('+49', '0').replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
  };

  const formatPhoneForHref = (phone: string) => {
    return phone.replace(/\s/g, '');
  };

  const whatsappUrl = `https://wa.me/${PHONE_NUMBER.replace(/\+/g, '')}?text=${encodeURIComponent('Hallo, ich benötige Hilfe bei Schädlingsbekämpfung')}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-primary shadow-lg md:hidden">
      <div className="flex items-stretch h-16">
        {/* Phone Button */}
        <a
          href={`tel:${formatPhoneForHref(PHONE_NUMBER)}`}
          onClick={handlePhoneClick}
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 transition-colors border-r border-white"
          aria-label="Jetzt anrufen"
        >
          <Phone className="h-5 w-5" />
          <span className="font-semibold text-sm">Anrufen</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#1fb855] transition-colors"
          aria-label="WhatsApp Nachricht senden"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="font-semibold text-sm">WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default MobileStickyCTA;