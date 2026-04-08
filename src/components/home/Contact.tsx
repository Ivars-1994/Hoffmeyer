import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { Phone, Clock } from 'lucide-react';
import PhoneButton from '../ui/PhoneButton';

const PHONE_NUMBER = "+4915792453526";

const Contact = () => {
  return (
    <AnimatedSection id="contact">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="section-heading">Kontakt</h2>
          <p className="section-subheading">
            Haben Sie ein Schädlingsproblem? Rufen Sie uns jetzt an für sofortige Hilfe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
          <div className="rounded-xl overflow-hidden shadow-sm border border-primary/10 bg-white p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6">Kontaktinformationen</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Telefon</h4>
                  <p className="text-accent font-medium">{PHONE_NUMBER}</p>
                  <p className="text-sm text-muted-foreground mt-1">Für schnelle Hilfe und kostenlose Beratung</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Geschäftszeiten</h4>
                  <p>Mo-Fr: 7:00 - 20:00 Uhr</p>
                  <p>Sa: 7:00 - 19:00 Uhr</p>
                  <p className="text-sm text-muted-foreground mt-1">Notfallservice auch außerhalb der Geschäftszeiten</p>
                  <div className="mt-2 bg-[#E5DEFF] text-accent rounded-md p-2 text-sm font-medium">
                    An Wochenenden & Feiertagen ohne Aufpreis für Sie da!
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-sm border border-primary/10 bg-secondary/20 p-6 md:p-8 flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl font-bold mb-4">Sofortige Hilfe?</h3>
            <p className="mb-6 text-muted-foreground">Rufen Sie uns direkt an – kostenlose Beratung, 24/7 Notdienst</p>
            <PhoneButton phoneNumber={PHONE_NUMBER} size="lg" className="w-full max-w-xs justify-center text-lg py-4" />
            <p className="text-xs text-muted-foreground text-center mt-4">
              Wir sind in der Regel innerhalb von 30–60 Minuten bei Ihnen
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Contact;
