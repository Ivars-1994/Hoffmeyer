import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { Phone, MessageSquare, MapPin, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Phone,
    title: "1. Anruf",
    description: "Sie rufen uns an und schildern Ihr Schädlingsproblem. Wir beraten Sie kostenlos und unverbindlich."
  },
  {
    icon: MessageSquare,
    title: "2. Kostenlose Beratung",
    description: "Wir besprechen die Situation und geben Ihnen eine erste Einschätzung. Transparente Festpreise ohne versteckte Kosten."
  },
  {
    icon: MapPin,
    title: "3. Vor-Ort-Termin",
    description: "Unser Experte kommt zu Ihnen und analysiert den Befall. Meist noch am selben Tag verfügbar."
  },
  {
    icon: CheckCircle,
    title: "4. Professionelle Bekämpfung",
    description: "Wir beseitigen das Problem effektiv und diskret. Mit Garantie und Nachkontrolle für Ihre Sicherheit."
  }
];

const ProcessSteps = () => {
  return (
    <AnimatedSection>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-heading">So ist der Ablauf</h2>
          <p className="section-subheading">
            In nur 4 einfachen Schritten sind Sie Ihr Schädlingsproblem los
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className="relative bg-white rounded-xl p-6 shadow-sm border border-primary/10 hover:shadow-md transition-all"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent/30"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ProcessSteps;
