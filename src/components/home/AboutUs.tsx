import React from 'react';
import { Bug, Clock, Award, Users2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedSection from '../ui/AnimatedSection';

interface AboutUsProps {
  cityName?: string;
}

const AboutUs = ({ cityName = "Ihrer Stadt" }: AboutUsProps) => {
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
    <AnimatedSection className="py-20 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6" style={{ letterSpacing: '-0.02em' }}>Über uns</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Seit über 20 Jahren sind wir Ihr vertrauenswürdiger Partner für professionelle Schädlingsbekämpfung. Unsere Expertise und unser Engagement für Qualität machen uns zu Ihrer ersten Wahl in {cityName}.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <CardContent className="pt-8 px-6 pb-8">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-accent/10 rounded-2xl mb-5 backdrop-blur-sm">
                    <feature.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-3 text-base text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
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
