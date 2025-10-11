import React from 'react';
import { Phone } from 'lucide-react';
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

  const formatPhoneForHref = (phone: string) => {
    return phone.replace(/\s/g, '');
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <a
        href={`tel:${formatPhoneForHref(PHONE_NUMBER)}`}
        onClick={handlePhoneClick}
        className="flex items-center gap-4 bg-gradient-to-r from-accent to-accent/90 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105"
        aria-label="Jetzt verfügbar - Sofort anrufen"
      >
        {/* Profile Image */}
        <div className="flex-shrink-0 w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces"
            alt="Kundenservice Mitarbeiterin"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Phone Icon */}
        <div className="flex-shrink-0">
          <Phone className="h-10 w-10 text-white" strokeWidth={2.5} />
        </div>

        {/* Text */}
        <div className="flex-1 text-left">
          <div className="text-xs font-semibold text-white/95">Jetzt verfügbar</div>
          <div className="text-xl font-bold text-white leading-tight">Sofort anrufen</div>
        </div>
      </a>
    </div>
  );
};

export default MobileStickyCTA;