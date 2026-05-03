import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import PhoneButton from '@/components/ui/PhoneButton';
import { CheckCircle2, Clock, Euro, Shield } from 'lucide-react';

const PHONE_NUMBER = "+49 1579 2507705";

const services = [
  {
    slug: "wespen",
    icon: "🐝",
    title: "Wespennest entfernen",
    subtitle: "24h Notdienst vor Ort",
    description: "Sichere Entfernung von Wespennestern durch zertifizierte Experten",
    image: "/lovable-uploads/wespe.jpg",
    alt: "Wespenbekämpfung - Professionelle Entfernung von Wespennestern",
    keywords: "Wespen, Wespennest, Wespenbekämpfung, Wespennest entfernen",
    detailedContent: {
      title: "Professionelle Wespenbekämpfung",
      content: `
        <div class="space-y-4">
          <p><strong>Schnelle Hilfe bei Wespenproblemen:</strong> Wespen können im Sommer zur echten Plage werden. Unsere Experten entfernen Wespennester sicher und effektiv.</p>
          
          <h4 class="font-semibold text-lg mt-4">Unsere Leistungen:</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li>Sichere Entfernung von Wespennestern</li>
            <li>24/7 Notdienst verfügbar</li>
            <li>Umweltschonende Methoden</li>
            <li>Präventive Beratung</li>
          </ul>

          <h4 class="font-semibold text-lg mt-4">Warum professionelle Hilfe?</h4>
          <p>Wespen sind geschützte Tiere und dürfen nur in Ausnahmefällen bekämpft werden. Unsere IHK-zertifizierten Experten kennen die rechtlichen Bestimmungen und wenden nur zugelassene Methoden an.</p>
        </div>
      `
    },
    faqs: [
      {
        question: "Was kostet die Wespenentfernung?",
        answer: "Die Kosten variieren je nach Lage und Größe des Nests. Eine genaue Einschätzung erhalten Sie bei der kostenlosen Erstberatung. Die Anfahrt ist immer kostenlos."
      },
      {
        question: "Wie schnell können Sie kommen?",
        answer: "Bei Notfällen sind wir innerhalb von 30-60 Minuten vor Ort. Reguläre Termine können wir meist am selben oder nächsten Tag vereinbaren."
      },
      {
        question: "Dürfen Wespennester einfach entfernt werden?",
        answer: "Nein, Wespen sind geschützt. Eine Entfernung ist nur bei akuter Gefahr erlaubt. Unsere Experten prüfen vor Ort die rechtliche Lage und beraten Sie zu Alternativen."
      }
    ]
  },
  {
    slug: "bettwanzen",
    icon: "🪲",
    title: "Bettwanzen bekämpfen",
    subtitle: "Soforthilfe vom Profi",
    description: "Effektive Bekämpfung von Bettwanzen mit modernsten Methoden",
    image: "/lovable-uploads/bettwanzen.jpg",
    alt: "Bettwanzenbekämpfung - Professionelle Behandlung gegen Bettwanzen",
    keywords: "Bettwanzen, Bettwanzenbekämpfung, Bettwanzen bekämpfen, Bettwanzen entfernen",
    detailedContent: {
      title: "Professionelle Bettwanzenbekämpfung",
      content: `
        <div class="space-y-4">
          <p><strong>Bettwanzen sind hartnäckig:</strong> Diese Parasiten vermehren sich schnell und sind ohne professionelle Hilfe kaum zu bekämpfen.</p>
          
          <h4 class="font-semibold text-lg mt-4">Unsere Behandlungsmethoden:</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li>Wärmebehandlung (chemikalienfrei)</li>
            <li>Gezielte Insektizidbehandlung</li>
            <li>Kombinierte Verfahren für maximalen Erfolg</li>
            <li>Nachkontrolle inklusive</li>
          </ul>

          <h4 class="font-semibold text-lg mt-4">Anzeichen für Bettwanzen:</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li>Kleine Blutflecken auf der Bettwäsche</li>
            <li>Juckende Bisse in Reihen oder Gruppen</li>
            <li>Dunkle Kotspuren an Matratzen</li>
            <li>Süßlicher Geruch im Schlafzimmer</li>
          </ul>
        </div>
      `
    },
    faqs: [
      {
        question: "Wie erkenne ich Bettwanzen?",
        answer: "Typische Anzeichen sind kleine Blutflecken auf der Bettwäsche, juckende Bisse in Reihen und dunkle Kotspuren an Matratzen. Bei Verdacht sollten Sie sofort Experten kontaktieren."
      },
      {
        question: "Sind Bettwanzen gefährlich?",
        answer: "Bettwanzen übertragen keine Krankheiten, können aber durch ihre Bisse starken Juckreiz und allergische Reaktionen auslösen. Die psychische Belastung ist oft erheblich."
      },
      {
        question: "Wie lange dauert die Behandlung?",
        answer: "Eine Grundbehandlung dauert ca. 2-4 Stunden. Meist sind 2-3 Behandlungen im Abstand von 2 Wochen notwendig, um alle Entwicklungsstadien zu erfassen."
      }
    ]
  },
  {
    slug: "ratten",
    icon: "🐀",
    title: "Ratten bekämpfen",
    subtitle: "Schnell & diskret",
    description: "Professionelle Rattenbekämpfung für Haus, Garten und Gewerbe",
    image: "/lovable-uploads/ratte.jpg",
    alt: "Rattenbekämpfung - Professionelle Bekämpfung von Ratten",
    keywords: "Ratten, Rattenbekämpfung, Ratten bekämpfen, Rattengift, Schädlinge",
    detailedContent: {
      title: "Professionelle Rattenbekämpfung",
      content: `
        <div class="space-y-4">
          <p><strong>Ratten sind Gesundheitsrisiko:</strong> Ratten übertragen Krankheiten und können erhebliche Schäden an Gebäuden verursachen.</p>
          
          <h4 class="font-semibold text-lg mt-4">Unsere Vorgehensweise:</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li>Gründliche Befallsanalyse</li>
            <li>Professionelle Köderauslegung</li>
            <li>Abdichtung von Zugangswegen</li>
            <li>Hygienische Entsorgung</li>
            <li>Präventionsberatung</li>
          </ul>

          <h4 class="font-semibold text-lg mt-4">Warum schnelles Handeln wichtig ist:</h4>
          <p>Ratten vermehren sich extrem schnell. Ein Rattenpaar kann theoretisch bis zu 2000 Nachkommen pro Jahr haben. Je früher Sie handeln, desto einfacher und kostengünstiger ist die Bekämpfung.</p>
        </div>
      `
    },
    faqs: [
      {
        question: "Wie erkenne ich einen Rattenbefall?",
        answer: "Typische Anzeichen sind Kotspuren (länglich, dunkel), Laufspuren, Nagespuren an Kabeln/Holz, Scharrgeräusche in Wänden und ein moschusartiger Geruch."
      },
      {
        question: "Sind die Methoden sicher für Haustiere?",
        answer: "Ja, wir verwenden ausschließlich gesicherte Köderstationen, die für Haustiere und Kinder unzugänglich sind. Bei der Begehung besprechen wir alle Sicherheitsmaßnahmen."
      },
      {
        question: "Wie lange dauert die Bekämpfung?",
        answer: "Die Erstbehandlung dauert 1-2 Stunden. Kontrollen erfolgen nach 3-5 Tagen. Je nach Befallsstärke sind 2-4 Wochen bis zur vollständigen Beseitigung realistisch."
      }
    ]
  },
  {
    slug: "marder",
    icon: "🦝",
    title: "Marder vertreiben",
    subtitle: "Dachboden Schutz 24/7",
    description: "Schonende Marderabwehr und Gebäudesicherung",
    image: "/lovable-uploads/marder.webp",
    alt: "Marderabwehr - Professionelle Vertreibung und Schutz vor Mardern",
    keywords: "Marder, Marderabwehr, Marder vertreiben, Marder Dachboden, Steinmarder",
    detailedContent: {
      title: "Professionelle Marderabwehr",
      content: `
        <div class="space-y-4">
          <p><strong>Marder auf dem Dachboden:</strong> Marder können erhebliche Schäden an Dämmmaterial, Kabeln und Rohren verursachen.</p>
          
          <h4 class="font-semibold text-lg mt-4">Unsere Leistungen:</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li>Tierschonende Vertreibung</li>
            <li>Professionelle Gebäudeabdichtung</li>
            <li>Geruchsneutralisation</li>
            <li>Langfristiger Schutz</li>
            <li>Schadensdokumentation für Versicherung</li>
          </ul>

          <h4 class="font-semibold text-lg mt-4">Warum professionelle Marderabwehr?</h4>
          <p>Marder sind geschützte Tiere und dürfen nicht gefangen oder getötet werden. Nur zertifizierte Fachleute dürfen Marder tierschutzgerecht vertreiben und Gebäude sichern.</p>
        </div>
      `
    },
    faqs: [
      {
        question: "Wie erkenne ich Marder auf dem Dachboden?",
        answer: "Typische Anzeichen sind nächtliche Lauf- und Kratzgeräusche, Kotspuren (wurstförmig, ca. 8-10cm), ein intensiver Geruch und zerrissenes Dämmmaterial."
      },
      {
        question: "Wann sind Marder besonders aktiv?",
        answer: "Marder sind nachtaktiv, besonders laut während der Paarungszeit (Juni-August) und wenn Jungtiere aufgezogen werden (April-Mai). In dieser Zeit ist schnelles Handeln wichtig."
      },
      {
        question: "Übernimmt die Versicherung die Kosten?",
        answer: "Marderschäden am Auto werden meist von der Teilkasko übernommen. Bei Gebäudeschäden kommt es auf Ihre Wohngebäudeversicherung an. Wir erstellen Ihnen eine detaillierte Schadensdokumentation."
      }
    ]
  },
  {
    slug: "maeuse",
    icon: "🐭",
    title: "Mäuse bekämpfen",
    subtitle: "Hygienisch & sicher",
    description: "Effektive Mäusebekämpfung für Wohn- und Geschäftsräume",
    image: "/lovable-uploads/maus.webp",
    alt: "Mäusebekämpfung - Professionelle Bekämpfung von Mäusen",
    keywords: "Mäuse, Mäusebekämpfung, Mäuse bekämpfen, Hausmaus",
    detailedContent: {
      title: "Professionelle Mäusebekämpfung",
      content: `
        <div class="space-y-4">
          <p><strong>Mäuse im Haus:</strong> Mäuse können Lebensmittel kontaminieren und Krankheiten übertragen.</p>
          
          <h4 class="font-semibold text-lg mt-4">Unsere Methoden:</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li>Befallsanalyse und Monitoring</li>
            <li>Köderstationen und Fallen</li>
            <li>Abdichtung von Zugängen</li>
            <li>Hygienische Entsorgung</li>
          </ul>
        </div>
      `
    },
    faqs: [
      {
        question: "Wie gelangen Mäuse ins Haus?",
        answer: "Mäuse können durch Spalten ab 6mm Breite eindringen. Typische Zugänge sind Kabelschächte, Lüftungsöffnungen und Risse im Mauerwerk."
      },
      {
        question: "Sind Mäuse gefährlich?",
        answer: "Mäuse übertragen Krankheiten durch Kot und Urin, kontaminieren Lebensmittel und können Allergien auslösen. Zudem nagen sie an Kabeln und können Brände verursachen."
      }
    ]
  },
  {
    slug: "silberfische",
    icon: "🐛",
    title: "Silberfische entfernen",
    subtitle: "Dauerhaft & gründlich",
    description: "Nachhaltige Bekämpfung von Silberfischen in Bad und Küche",
    image: "/lovable-uploads/silberfische.jpg",
    alt: "Silberfischchen-Bekämpfung",
    keywords: "Silberfische, Silberfischchen, Ungeziefer Bad",
    detailedContent: {
      title: "Professionelle Silberfischchen-Bekämpfung",
      content: `
        <div class="space-y-4">
          <p><strong>Silberfische loswerden:</strong> Diese Insekten lieben feuchte Räume und können auf Feuchtigkeitsprobleme hinweisen.</p>
          
          <h4 class="font-semibold text-lg mt-4">Unsere Vorgehensweise:</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li>Ursachenanalyse (Feuchtigkeit)</li>
            <li>Gezielte Behandlung der Verstecke</li>
            <li>Beratung zur Feuchtigkeitsregulierung</li>
          </ul>
        </div>
      `
    },
    faqs: [
      {
        question: "Woher kommen Silberfische?",
        answer: "Silberfische werden von Feuchtigkeit und Wärme angezogen. Sie ernähren sich von Hautschuppen, Haaren und stärkehaltigen Materialien wie Tapetenkleister."
      },
      {
        question: "Sind Silberfische schädlich?",
        answer: "Silberfische sind ungefährlich für Menschen, können aber Papier, Textilien und Tapeten beschädigen. Ihr Auftreten deutet oft auf zu hohe Luftfeuchtigkeit hin."
      }
    ]
  },
  {
    slug: "kakerlaken",
    icon: "🪳",
    title: "Kakerlaken vernichten",
    subtitle: "Professionell & zuverlässig",
    description: "Schnelle Hilfe bei Schabenbefall in Küche und Gewerbe",
    image: "/lovable-uploads/kakerlaken.jpg",
    alt: "Kakerlakenbekämpfung - Schaben professionell bekämpfen",
    keywords: "Kakerlaken, Schaben, Schabenbekämpfung",
    detailedContent: {
      title: "Professionelle Schabenbekämpfung",
      content: `
        <div class="space-y-4">
          <p><strong>Kakerlaken sind Hygieneschädlinge:</strong> Schaben übertragen gefährliche Krankheitserreger.</p>
          
          <h4 class="font-semibold text-lg mt-4">Bekämpfungsstrategie:</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li>Befallsermittlung</li>
            <li>Gel-Köder und Sprühbehandlung</li>
            <li>Mehrfachbehandlung</li>
            <li>Hygiene-Beratung</li>
          </ul>
        </div>
      `
    },
    faqs: [
      {
        question: "Wie erkenne ich Kakerlaken?",
        answer: "Kakerlaken sind nachtaktiv. Anzeichen sind Kotspuren (schwarze Punkte), Häutungsreste, ein süßlicher Geruch und Eigelege in dunklen Ecken."
      },
      {
        question: "Kann ich Kakerlaken selbst bekämpfen?",
        answer: "Bei Kakerlakenbefall ist professionelle Hilfe unbedingt erforderlich. Die Insekten vermehren sich extrem schnell und sind sehr widerstandsfähig."
      }
    ]
  },
  {
    slug: "floehe",
    icon: "🦟",
    title: "Flöhe eliminieren",
    subtitle: "Für Mensch & Tier sicher",
    description: "Gründliche Flohbekämpfung in Wohnung und Haustierumgebung",
    image: "/lovable-uploads/floh.jpeg",
    alt: "Flohbekämpfung - Professionelle Beseitigung von Flöhen",
    keywords: "Flöhe, Flohbekämpfung, Katzenflöhe, Hundeflöhe",
    detailedContent: {
      title: "Professionelle Flohbekämpfung",
      content: `
        <div class="space-y-4">
          <p><strong>Flöhe in der Wohnung:</strong> Flöhe vermehren sich rasant und befallen Tiere und Menschen.</p>
          
          <h4 class="font-semibold text-lg mt-4">Behandlungsablauf:</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li>Umgebungsbehandlung (Teppiche, Polster)</li>
            <li>Einsatz von Wachstumsregulatoren</li>
            <li>Haustierberatung (Tierarzt empfohlen)</li>
            <li>Nachbehandlung nach 14 Tagen</li>
          </ul>
        </div>
      `
    },
    faqs: [
      {
        question: "Wie bekomme ich Flöhe in die Wohnung?",
        answer: "Meist werden Flöhe durch Haustiere eingeschleppt. Aber auch gebrauchte Möbel oder Wildtiere können Flöhe übertragen."
      },
      {
        question: "Können Flöhe ohne Haustiere überleben?",
        answer: "Ja, Flöhe können mehrere Monate ohne Wirt überleben. Larven entwickeln sich in Teppichen und Polstern. Deshalb ist eine gründliche Umgebungsbehandlung wichtig."
      }
    ]
  }
];

const Services = ({ cityName }: { cityName?: string }) => {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  
  useEffect(() => {
    // Scroll to hash on mount and when hash changes
    const scrollToHash = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            // Calculate offset: emergency banner (39px) + navbar height (~56px) + spacing (20px)
            const yOffset = -115;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 100);
      }
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  return (
    <section id="services" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Unsere Leistungen{cityName ? ` in ${cityName}` : ''}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professionelle Schädlingsbekämpfung für jeden Befall
          </p>
        </div>

        {/* Service Sections - Visible in DOM for SEO */}
        <div className="space-y-16">
          {services.map((service) => (
            <section 
              key={service.slug} 
              id={service.slug}
              className="scroll-mt-32 bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200"
            >
              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Left: Content */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{service.icon}</span>
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-primary">
                        {service.title}
                      </h1>
                      <h2 className="text-lg text-accent font-semibold">
                        {service.subtitle}
                      </h2>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 text-lg">
                    {service.description}
                  </p>

                  {/* Detailed Content */}
                  <div 
                    className="prose prose-sm max-w-none mb-6 text-gray-700"
                    dangerouslySetInnerHTML={{ __html: service.detailedContent.content }}
                  />

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-4 mb-6">
                    <PhoneButton 
                      phoneNumber={PHONE_NUMBER}
                      variant="default"
                      size="lg"
                      linkText="Jetzt anrufen"
                      className="text-xl py-6 font-bold"
                    />
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="lg" onClick={() => setSelectedService(service)}>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Mehr Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2 text-2xl">
                            <span>{service.icon}</span>
                            {service.detailedContent.title}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <img 
                            src={service.image} 
                            alt={service.alt}
                            width="400"
                            height="225"
                            className="w-full h-64 object-cover rounded-lg mb-6"
                            loading="lazy"
                            decoding="async"
                          />
                          <div 
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: service.detailedContent.content }}
                          />
                          <div className="flex gap-4 mt-6">
                            <PhoneButton 
                              phoneNumber={PHONE_NUMBER}
                              variant="default"
                              size="lg"
                              className="text-xl py-6 font-bold"
                            />
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {/* Right: Image */}
                <div>
                  <img 
                    src={service.image}
                    alt={service.alt}
                    width="400"
                    height="225"
                    className="w-full h-64 md:h-80 object-cover rounded-xl shadow-md"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* USP Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900">Kostenlose Anfahrt</h4>
                      <p className="text-xs text-gray-600">Keine versteckten Kosten</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <Clock className="w-8 h-8 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900">30-60 Min vor Ort</h4>
                      <p className="text-xs text-gray-600">Bei Notfällen</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
                    <Shield className="w-8 h-8 text-yellow-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900">100% Geld-zurück</h4>
                      <p className="text-xs text-gray-600">Garantie auf alle Leistungen</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-blue-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-primary">
            Noch Fragen? Wir beraten Sie gerne!
          </h3>
          <p className="text-gray-600 mb-6">
            Kostenlose Erstberatung - Rufen Sie uns jetzt an
          </p>
          <div className="flex justify-center">
            <PhoneButton 
              phoneNumber={PHONE_NUMBER}
              variant="default"
              size="lg"
              linkText="Kostenlos anrufen"
              className="text-xl py-6 font-bold min-w-[280px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
