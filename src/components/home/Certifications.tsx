
import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { Award, CheckCircle } from 'lucide-react';

const certifications = [
  {
    title: "IHK-zertifizierte Fachkraft",
    description: "Wir sind offiziell von der Industrie- und Handelskammer (IHK) zertifizierte Fachkräfte für Schädlingsbekämpfung.",
  },
  {
    title: "Sachkundenachweis nach §4 Biozidverordnung",
    description: "Wir besitzen den erforderlichen Sachkundenachweis für den Umgang mit Bioziden gemäß §4 der Biozidverordnung.",
  },
  {
    title: "Zertifizierung für besondere Schädlingsbekämpfung",
    description: "Spezialisiert und zertifiziert für die Bekämpfung von besonderen Schädlingen wie Bettwanzen und Holzschädlingen.",
  },
];

const qualityFeatures = [
  "Umweltfreundliche und nachhaltige Methoden",
  "Modernste Technologien und Wirkstoffe",
  "Diskrete und schnelle Durchführung",
  "Umfassende Nachbetreuung und Nachkontrolle",
  "Transparente Preisgestaltung ohne versteckte Kosten",
  "Einhaltung aller gesetzlichen Vorschriften",
];

const Certifications = () => {
  return (
    <AnimatedSection id="certifications">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="section-heading">Unsere Zertifizierungen</h2>
          <p className="section-subheading">
            Vertrauen Sie auf nachgewiesene Expertise und höchste Qualitätsstandards bei der Schädlingsbekämpfung.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="rounded-xl overflow-hidden shadow-sm border border-primary/10 bg-white">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-center md:justify-start mb-6">
                <Award className="h-12 w-12 text-accent mr-4" />
                <h3 className="text-2xl font-bold">Zertifizierungen</h3>
              </div>
              
              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mr-4 mt-1">
                      <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-accent" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{cert.title}</h4>
                      <p className="text-sm text-muted-foreground">{cert.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-sm border border-primary/10 bg-secondary/20">
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6 text-center md:text-left">Unser Qualitätsversprechen</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {qualityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-accent" />
                      </div>
                    </div>
                    <p className="text-sm">{feature}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-white p-4 rounded-lg border border-primary/10">
                <p className="text-center font-medium">
                  Als zertifizierte Experten garantieren wir eine professionelle, effektive und nachhaltige Schädlingsbekämpfung für Ihr Zuhause oder Unternehmen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Certifications;
