
import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroContent from './HeroContent';
import HeroFeatures from './HeroFeatures';
import { ServiceConfig } from '../../utils/serviceConfig';

const PHONE_NUMBER = "+4915212124199";

interface HeroProps {
  cityName: string;
  serviceConfig?: ServiceConfig | null;
}

const Hero = ({ cityName, serviceConfig }: HeroProps) => {
  console.log("Hero: Render mit cityName:", cityName, "serviceConfig:", serviceConfig);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Kammerjäger Hoffmeyer",
    "description": serviceConfig 
      ? `${serviceConfig.schemaServiceType} in ${cityName}. 24/7 Notdienst verfügbar.`
      : `Professionelle Schädlingsbekämpfung mit IHK-zertifizierten Experten in ${cityName}. 24/7 Notdienst verfügbar.`,
    "telephone": PHONE_NUMBER,
    "url": "https://kammerjaeger-hoffmeyer.de",
    "image": "/lovable-uploads/4ae74c53-cd9c-47d4-ba9e-e38058eef4e3.png",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "DE"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    ],
    "priceRange": "€€"
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <section className="pb-16 sm:pb-20 md:pb-24 overflow-hidden relative bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <HeroContent cityName={cityName} serviceConfig={serviceConfig} />
            <div className="w-full md:w-1/2">
              <HeroFeatures />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
