import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PhoneButton from '@/components/ui/PhoneButton';

const PHONE_NUMBER = "+49 1579 2507705";

const services = [
  {
    slug: "wespen",
    icon: "🐝",
    title: "Wespennest entfernen",
    subtitle: "24h Notdienst vor Ort",
    description: "Sichere Entfernung von Wespennestern durch zertifizierte Experten. 24/7 Notdienst verfügbar."
  },
  {
    slug: "bettwanzen",
    icon: "🪲",
    title: "Bettwanzen bekämpfen",
    subtitle: "Soforthilfe vom Profi",
    description: "Effektive Bekämpfung von Bettwanzen mit Wärmebehandlung und modernen Methoden."
  },
  {
    slug: "ratten",
    icon: "🐀",
    title: "Ratten bekämpfen",
    subtitle: "Schnell & diskret",
    description: "Professionelle Rattenbekämpfung für Haus, Garten und Gewerbe. Gesicherte Köderstationen."
  },
  {
    slug: "marder",
    icon: "🦝",
    title: "Marder vertreiben",
    subtitle: "Dachboden Schutz 24/7",
    description: "Tierschonende Marderabwehr und professionelle Gebäudesicherung."
  },
  {
    slug: "maeuse",
    icon: "🐭",
    title: "Mäuse bekämpfen",
    subtitle: "Hygienisch & sicher",
    description: "Effektive Mäusebekämpfung für Wohn- und Geschäftsräume."
  },
  {
    slug: "silberfische",
    icon: "🐛",
    title: "Silberfische entfernen",
    subtitle: "Dauerhaft & gründlich",
    description: "Nachhaltige Bekämpfung von Silberfischen in Bad und Küche."
  },
  {
    slug: "kakerlaken",
    icon: "🪳",
    title: "Kakerlaken vernichten",
    subtitle: "Professionell & zuverlässig",
    description: "Schnelle Hilfe bei Schabenbefall in Küche und Gewerbe."
  },
  {
    slug: "floehe",
    icon: "🦟",
    title: "Flöhe eliminieren",
    subtitle: "Für Mensch & Tier sicher",
    description: "Gründliche Flohbekämpfung in Wohnung und Haustierumgebung."
  }
];

const ServicesSimple = ({ cityName }: { cityName?: string }) => {
  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Unsere Leistungen{cityName ? ` in ${cityName}` : ''}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professionelle Schädlingsbekämpfung für jeden Befall
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service) => (
            <Card key={service.slug} className="hover:shadow-lg transition-shadow bg-white">
              <CardContent className="p-6">
                <div id={service.slug} className="scroll-mt-24">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-blue-600 font-semibold mb-3">
                    {service.subtitle}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {service.description}
                  </p>
                  <PhoneButton 
                    phoneNumber={PHONE_NUMBER}
                    variant="default"
                    size="lg"
                    linkText="Jetzt anrufen"
                    className="w-full text-base font-semibold py-3"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-blue-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-primary">
            Noch Fragen? Wir beraten Sie gerne!
          </h3>
          <p className="text-gray-600 mb-6">
            Kostenlose Erstberatung - Rufen Sie uns an oder schreiben Sie uns
          </p>
          <div className="flex justify-center">
            <PhoneButton 
              phoneNumber={PHONE_NUMBER}
              variant="default"
              size="lg"
              linkText="Jetzt kostenlos anrufen"
              className="text-lg font-bold px-8 py-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSimple;
