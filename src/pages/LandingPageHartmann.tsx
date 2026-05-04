import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import HartmannNavbar from '@/components/hartmann/HartmannNavbar';
import HartmannHero from '@/components/hartmann/HartmannHero';
import { detectAndUpdateCity, getCityFromParams } from '@/utils/cityDetection';
import HartmannService from '@/components/hartmann/HartmannService';
import HartmannTestimonials from '@/components/hartmann/HartmannTestimonials';
import HartmannServices from '@/components/hartmann/HartmannServices';
import HartmannProcess from '@/components/hartmann/HartmannProcess';
import HartmannCertifications from '@/components/hartmann/HartmannCertifications';
import HartmannContact from '@/components/hartmann/HartmannContact';
import HartmannFooter from '@/components/hartmann/HartmannFooter';

const LandingPageHartmann = () => {
  const [cityName, setCityName] = useState<string>(() => getCityFromParams().name);

  useEffect(() => {
    detectAndUpdateCity().then((data) => {
      if (data?.name) setCityName(data.name);
    });
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.name) setCityName(detail.name);
    };
    window.addEventListener('cityDetected', handler);
    return () => window.removeEventListener('cityDetected', handler);
  }, []);

  return (
    <>
      <Helmet>
        <title>Kammerjäger Rothschild | 24/7 Schädlingsbekämpfung | Tel: 01579 2507705</title>
        <meta 
          name="description" 
          content="Kammerjäger Rothschild - Professionelle Schädlingsbekämpfung seit 1998. 24/7 Notdienst, 30-60 Min. Reaktionszeit. Ratten, Wespen, Mäuse, Bettwanzen. Jetzt anrufen!" 
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <div className="min-h-screen bg-[#003311]">
        <HartmannNavbar />
        <HartmannHero cityName={cityName} />
        <HartmannService />
        <HartmannTestimonials />
        <HartmannServices />
        <HartmannProcess />
        <HartmannCertifications />
        <HartmannContact />
        <HartmannFooter />
      </div>
    </>
  );
};

export default LandingPageHartmann;
