
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
    <div className="grid grid-cols-1 gap-5 md:gap-6 max-w-lg mx-auto">
      {features.map((feature, index) => (
        <div 
          key={index}
          className="glass-card p-6 md:p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in"
          style={{ animationDelay: `${feature.delay}ms` }}
        >
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-accent/10 backdrop-blur-sm p-3.5 md:p-4 flex-shrink-0">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2 text-lg sm:text-lg mobile-text-boost">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mobile-text-boost leading-relaxed">
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
