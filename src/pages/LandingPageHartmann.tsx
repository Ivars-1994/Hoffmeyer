import { Helmet } from 'react-helmet-async';
import HartmannNavbar from '@/components/hartmann/HartmannNavbar';
import HartmannHero from '@/components/hartmann/HartmannHero';
import HartmannService from '@/components/hartmann/HartmannService';
import HartmannTestimonials from '@/components/hartmann/HartmannTestimonials';
import HartmannServices from '@/components/hartmann/HartmannServices';
import HartmannProcess from '@/components/hartmann/HartmannProcess';
import HartmannContact from '@/components/hartmann/HartmannContact';
import HartmannFooter from '@/components/hartmann/HartmannFooter';

const LandingPageHartmann = () => {
  return (
    <>
      <Helmet>
        <title>Kammerjäger Hoffmeyer | 24/7 Schädlingsbekämpfung | Tel: 01579 2453 526</title>
        <meta 
          name="description" 
          content="Kammerjäger Hoffmeyer - Professionelle Schädlingsbekämpfung seit 1998. 24/7 Notdienst, 30-60 Min. Reaktionszeit. Ratten, Wespen, Mäuse, Bettwanzen. Jetzt anrufen!" 
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <div className="min-h-screen bg-[#003311]">
        <HartmannNavbar />
        <HartmannHero />
        <HartmannService />
        <HartmannTestimonials />
        <HartmannServices />
        <HartmannProcess />
        <HartmannContact />
        <HartmannFooter />
      </div>
    </>
  );
};

export default LandingPageHartmann;
