import React from 'react';
import { Phone } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const PHONE_NUMBER = "+49 1579 2453526";

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
    <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
      <a
        href={`tel:${formatPhoneForHref(PHONE_NUMBER)}`}
        onClick={handlePhoneClick}
        className="flex items-center gap-4 bg-[#c9a227] text-[#003311] px-6 py-5 rounded-3xl shadow-2xl hover:shadow-[#c9a227]/40 transition-all duration-300 hover:scale-[1.02] backdrop-blur-md border border-[#c9a227]/30"
        aria-label="Jetzt verfügbar - Sofort anrufen"
      >
        {/* Profile Image - lazy loaded */}
        <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-3 border-white shadow-lg">
          <img 
            src="/lovable-uploads/norbert-wolframm.jpg"
            alt="Kammerjäger Hoffmeyer Experte"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Phone Icon */}
        <div className="flex-shrink-0">
          <Phone className="h-11 w-11 text-[#003311]" strokeWidth={2.5} />
        </div>

        {/* Text */}
        <div className="flex-1 text-left">
           <div className="flex items-center gap-1.5 text-xs font-semibold text-[#003311]/80">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              Jetzt verfügbar
            </div>
          <div className="text-xl font-bold text-[#003311] leading-tight">Sofort anrufen</div>
        </div>
      </a>
    </div>
  );
};

export default MobileStickyCTA;