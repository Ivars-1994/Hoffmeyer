
import React from 'react';
import { Shield, Home, Zap } from 'lucide-react';

const HeroFeatures = () => {
  const features = [
    {
      icon: <Shield className="w-5 h-5 md:w-6 md:h-6 text-accent" />,
      title: "IHK zertifizierte Experten",
      description: "Von der IHK anerkannte Fachkräfte für Schädlingsbekämpfung",
      delay: 400,
    },
    {
      icon: <Home className="w-5 h-5 md:w-6 md:h-6 text-accent" />,
      title: "Kostenlose Anfahrt",
      description: "Keine versteckten Kosten - transparente Preise garantiert",
      delay: 500,
    },
    {
      icon: <Zap className="w-5 h-5 md:w-6 md:h-6 text-accent" />,
      title: "Schnelle Reaktionszeit",
      description: "Wir sind innerhalb von 30-60 Minuten bei Ihnen vor Ort",
      delay: 600,
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6 max-w-md mx-auto">
      {features.map((feature, index) => (
        <div 
          key={index}
          className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-primary/10 transition-all duration-300 hover:shadow-md animate-fade-in"
          style={{ animationDelay: `${feature.delay}ms` }}
        >
          <div className="flex items-start">
            <div className="rounded-full bg-accent/10 p-2.5 md:p-3 mr-3 flex-shrink-0">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-1 md:mb-1 text-base sm:text-base mobile-text-boost">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-sm text-muted-foreground mobile-text-boost">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroFeatures;
