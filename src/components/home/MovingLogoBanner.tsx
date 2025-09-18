
import React from 'react';
import { Badge } from '@/components/ui/badge';
import AnimatedSection from '../ui/AnimatedSection';
import { Award } from 'lucide-react';

const MovingLogoBanner = () => {
  const logos = [
    {
      name: "IHK Ausbildungsbetrieb",
      variant: "secondary" as const,
      icon: <Award className="h-5 w-5 mr-2" />,
      text: "IHK Ausbildungsbetrieb"
    },
    {
      name: "Das Handwerk",
      variant: "secondary" as const,
      icon: <Award className="h-5 w-5 mr-2" />,
      text: "Das Handwerk"
    },
    {
      name: "Mitglied der Handwerkskammer",
      variant: "secondary" as const,
      icon: <Award className="h-5 w-5 mr-2" />,
      text: "Handwerkskammer"
    }
  ];

  return (
    <AnimatedSection className="py-6 bg-primary/5 overflow-hidden">
      <div className="relative whitespace-nowrap animate-[scroll_20s_linear_infinite]">
        <div className="inline-flex gap-6">
          {logos.map((logo, index) => (
            <Badge
              key={index}
              variant={logo.variant}
              className="px-4 py-3 text-base whitespace-nowrap bg-white shadow-sm hover:bg-white/90 h-auto flex items-center"
            >
              <div className="flex items-center">
                {logo.icon}
                <span>{logo.text}</span>
              </div>
            </Badge>
          ))}
          {/* Duplicate logos for seamless scrolling */}
          {logos.map((logo, index) => (
            <Badge
              key={`duplicate-${index}`}
              variant={logo.variant}
              className="px-4 py-3 text-base whitespace-nowrap bg-white shadow-sm hover:bg-white/90 h-auto flex items-center"
            >
              <div className="flex items-center">
                {logo.icon}
                <span>{logo.text}</span>
              </div>
            </Badge>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default MovingLogoBanner;
