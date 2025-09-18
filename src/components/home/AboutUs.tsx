import React from 'react';
import { Bug, Clock, Award, Users2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedSection from '../ui/AnimatedSection';

const AboutUs = () => {
  const features = [
    {
      icon: Bug,
      title: "Zertifizierte Expertise",
      description: "IHK-geprüfte Schädlingsbekämpfer mit jahrelanger Erfahrung"
    },
    {
      icon: Clock,
      title: "24/7 Notdienst",
      description: "Schnelle Hilfe rund um die Uhr, auch an Wochenenden"
    },
    {
      icon: Award,
      title: "Garantierte Qualität",
      description: "Modernste Methoden und umweltfreundliche Lösungen"
    },
    {
      icon: Users2,
      title: "Persönliche Betreuung",
      description: "Individuelle Beratung und maßgeschneiderte Lösungen"
    }
  ];

  return (
    <AnimatedSection className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary mb-3">Über uns</h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Seit über 20 Jahren sind wir Ihr vertrauenswürdiger Partner für professionelle Schädlingsbekämpfung. Unsere Expertise und unser Engagement für Qualität machen uns zu Ihrer ersten Wahl in <span data-city>Ihrer Stadt</span>.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <Card key={index} className="border-accent/10 hover:shadow-md transition-shadow duration-300">
              <CardContent className="pt-5 px-4">
                <div className="flex flex-col items-center text-center">
                  <div className="p-2 bg-accent/10 rounded-full mb-3">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-1 text-sm">{feature.title}</h3>
                  <p className="text-muted-foreground text-xs">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AboutUs;
