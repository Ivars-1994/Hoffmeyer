import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PhoneButton from '../components/ui/PhoneButton';

import { Helmet } from 'react-helmet-async';
import { Phone, Clock, Shield, MapPin, CheckCircle, Star, Award, Users, Truck, BadgeCheck } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import AnimatedSection from '../components/ui/AnimatedSection';

const PHONE_NUMBER = "+4915212124199";

// Essener Stadtteile für lokale Relevanz
const STADTTEILE = [
  'Rüttenscheid', 'Stadtmitte', 'Altenessen', 'Steele', 'Kettwig',
  'Werden', 'Bredeney', 'Holsterhausen', 'Frohnhausen', 'Borbeck'
];

// Services mit Essen-Bezug
const SERVICES = [
  {
    title: 'Wespenbekämpfung Essen',
    description: 'Wespennester sicher entfernen in Essen – ob am Balkon in Rüttenscheid oder im Garten in Kettwig. Schnelle und sichere Entfernung durch IHK-zertifizierte Experten.',
    icon: '🐝'
  },
  {
    title: 'Bettwanzen Essen',
    description: 'Bettwanzen bekämpfen in Essen – diskret und effektiv. Von der Mietwohnung in Altenessen bis zum Hotel in der Stadtmitte. Thermische und chemische Verfahren.',
    icon: '🛏️'
  },
  {
    title: 'Rattenbekämpfung Essen',
    description: 'Ratten vertreiben in Essen – professionell und nachhaltig. Befallsanalyse, Bekämpfung und Prävention für Privat und Gewerbe in allen Essener Stadtteilen.',
    icon: '🐀'
  },
  {
    title: 'Mäusebekämpfung Essen',
    description: 'Mäuse loswerden in Essen – schnell und tiergerecht. Moderne Methoden für dauerhafte Lösungen in Steele, Werden und ganz Essen.',
    icon: '🐭'
  },
  {
    title: 'Silberfische Essen',
    description: 'Silberfische entfernen in Essen – nachhaltige Bekämpfung in feuchten Räumen. Ursachenforschung und präventive Maßnahmen für Ihr Zuhause.',
    icon: '🪲'
  },
  {
    title: 'Kakerlaken Essen',
    description: 'Schaben bekämpfen in Essen – hygienisch und gründlich. Speziell für Gastronomie, Hotels und Privathaushalte in der Essener Innenstadt und Umgebung.',
    icon: '🪳'
  }
];

// FAQ Daten für Schema und Accordion
const FAQ_DATA = [
  {
    question: 'Was kostet ein Kammerjäger in Essen?',
    answer: 'Die Kosten für einen Kammerjäger-Einsatz in Essen hängen von Art und Ausmaß des Befalls ab. In vielen Fällen liegen typische Einsätze im Bereich von etwa 90 bis 180 Euro. Nach einer kurzen telefonischen Einschätzung erhalten Sie von uns einen transparenten Festpreis vor Beginn der Maßnahme.'
  },
  {
    question: 'Wie schnell ist der Kammerjäger in Essen vor Ort?',
    answer: 'In der Regel sind wir in Essen innerhalb von 30 bis 60 Minuten vor Ort. Im 24/7 Notdienst behandeln wir Einsätze in allen Essener Stadtteilen, zum Beispiel Rüttenscheid, Stadtmitte, Altenessen, Steele und Kettwig, so schnell wie möglich.'
  },
  {
    question: 'Bieten Sie einen 24h Notdienst für Essen an?',
    answer: 'Ja, für Essen bieten wir einen 24/7 Notdienst an. Akute Befälle wie Wespennester, Ratten oder Bettwanzen können jederzeit gemeldet werden. Sie erreichen unseren Notdienst rund um die Uhr unter der angegebenen Telefonnummer.'
  },
  {
    question: 'Welche Schädlinge bekämpfen Sie in Essen?',
    answer: 'In Essen bekämpfen wir unter anderem Wespen, Bettwanzen, Ratten, Mäuse, Silberfische, Kakerlaken, Flöhe und weitere Schädlinge. Wir betreuen sowohl Privathaushalte als auch Gewerbekunden wie Gastronomie, Hotels und Wohnungsverwaltungen.'
  },
  {
    question: 'Sind Ihre Methoden der Schädlingsbekämpfung in Essen sicher für Menschen und Haustiere?',
    answer: 'Wir setzen in Essen ausschließlich zugelassene und fachgerecht dosierte Mittel ein. Wo möglich arbeiten wir mit mechanischen, physikalischen oder biologischen Verfahren. Vor jeder Maßnahme erklären wir Ihnen genau, welche Mittel eingesetzt werden und welche Vorsichtsmaßnahmen zu beachten sind.'
  },
  {
    question: 'Muss ich als Mieter in Essen den Kammerjäger selbst bezahlen?',
    answer: 'Ob Sie als Mieter den Kammerjäger in Essen selbst bezahlen müssen, hängt von der Ursache des Befalls und der Regelung in Ihrem Mietvertrag ab. Häufig übernimmt der Vermieter oder die Hausverwaltung die Kosten. Auf Wunsch dokumentieren wir den Befall und die Maßnahme für Ihren Vermieter.'
  },
  {
    question: 'Wie läuft ein Einsatz zur Schädlingsbekämpfung in Essen ab?',
    answer: 'Zunächst schildern Sie uns telefonisch Ihren Befall in Essen. Vor Ort führen wir eine Inspektion durch, identifizieren die Ursache und erstellen ein passendes Bekämpfungskonzept. Anschließend führen wir die Maßnahme durch und bieten je nach Situation eine Nachkontrolle sowie Präventionsberatung an.'
  },
  {
    question: 'Bieten Sie in Essen auch vorbeugende Schädlingskontrollen an?',
    answer: 'Ja, insbesondere für Gewerbe, Gastronomie und Verwaltungen in Essen bieten wir regelmäßige Wartungsverträge und vorbeugende Schädlingskontrollen an. So werden Befälle frühzeitig erkannt und dauerhaft vermieden.'
  },
  {
    question: 'Kammerjäger Essen Kosten – gibt es versteckte Gebühren?',
    answer: 'Nein, bei Kammerjäger Rothschild in Essen gibt es keine versteckten Kosten. Sie erhalten vor Arbeitsbeginn einen verbindlichen Festpreis. Die Anfahrt innerhalb von Essen ist in den meisten Fällen bereits inklusive.'
  },
  {
    question: 'Arbeiten Sie auch am Wochenende und an Feiertagen in Essen?',
    answer: 'Ja, unser Notdienst in Essen ist 24 Stunden am Tag, 7 Tage die Woche erreichbar – auch an Wochenenden und Feiertagen. Schädlinge machen keine Pause, wir auch nicht.'
  }
];

// Einsatz-Beispiele
const EINSATZ_BEISPIELE = [
  {
    location: 'Mietwohnung in Essen-Rüttenscheid',
    problem: 'Bettwanzenbefall nach Urlaub',
    solution: 'Thermische Behandlung und Nachkontrolle – schädlingsfrei in 48 Stunden'
  },
  {
    location: 'Einfamilienhaus in Essen-Kettwig',
    problem: 'Wespennest unterm Dach',
    solution: 'Sichere Entfernung am gleichen Tag, inklusive Präventionsberatung'
  },
  {
    location: 'Restaurant in Essen-Stadtmitte',
    problem: 'Schabenbefall in der Küche',
    solution: 'Sofortige Bekämpfung mit HACCP-konformer Dokumentation'
  },
  {
    location: 'Lagerhalle in Essen-Altenessen',
    problem: 'Rattenaktivität nachts festgestellt',
    solution: 'Professionelle Befallsanalyse und nachhaltige Bekämpfung'
  }
];

const EssenPage = () => {
  // Vollständiges Schema.org JSON-LD
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://kammerjaeger-rothschild.de/#firma",
        "name": "Kammerjäger Rothschild",
        "url": "https://kammerjaeger-rothschild.de/",
        "image": "https://kammerjaeger-rothschild.de/lovable-uploads/rothschild-logo.png",
        "telephone": "+4915212124199",
        "email": "info.kammerjaegerrothschild@gmail.com",
        "priceRange": "€€",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Rothschild Schädlingsbekämpfung",
          "postalCode": "45127",
          "addressLocality": "Essen",
          "addressRegion": "NW",
          "addressCountry": "DE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "51.4556",
          "longitude": "7.0116"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "07:00",
            "closes": "20:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Sunday"],
            "opens": "00:00",
            "closes": "23:59"
          }
        ],
        "areaServed": [
          {
            "@type": "City",
            "name": "Essen",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Essen",
              "addressRegion": "Nordrhein-Westfalen",
              "addressCountry": "DE"
            }
          }
        ],
        "knowsAbout": [
          "Schädlingsbekämpfung",
          "Kammerjäger",
          "Wespennest entfernen",
          "Bettwanzen bekämpfen",
          "Rattenbekämpfung",
          "Mäusebekämpfung",
          "Schimmelbekämpfung",
          "Schädlingsbekämpfung Essen",
          "Kammerjäger Essen",
          "Notdienst Kammerjäger Essen"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "127",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "Service",
        "@id": "https://kammerjaeger-rothschild.de/kammerjaeger-essen/#service",
        "name": "Schädlingsbekämpfung in Essen",
        "serviceType": "Kammerjäger Essen, Schädlingsbekämpfung Essen, 24h Notdienst",
        "provider": { "@id": "https://kammerjaeger-rothschild.de/#firma" },
        "areaServed": {
          "@type": "City",
          "name": "Essen"
        },
        "url": "https://kammerjaeger-rothschild.de/kammerjaeger-essen",
        "description": "IHK-zertifizierter Kammerjäger in Essen mit 24/7 Notdienst, schneller Anfahrt in 30–60 Minuten und professioneller Schädlingsbekämpfung für Privat- und Geschäftskunden.",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Leistungen Schädlingsbekämpfung in Essen",
          "itemListElement": SERVICES.map(s => ({
            "@type": "Offer",
            "name": s.title,
            "itemOffered": { "@type": "Service", "name": s.title }
          }))
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://kammerjaeger-rothschild.de/kammerjaeger-essen/#faq",
        "mainEntity": FAQ_DATA.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Startseite",
            "item": "https://kammerjaeger-rothschild.de/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Kammerjäger Essen",
            "item": "https://kammerjaeger-rothschild.de/kammerjaeger-essen"
          }
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Kammerjäger Essen | Schädlingsbekämpfung & 24h Notdienst – Rothschild</title>
        <meta name="description" content="Kammerjäger in Essen gesucht? IHK-zertifizierte Schädlingsbekämpfung, 24h-Notdienst, schnelle Hilfe in 30–60 Min vor Ort. Jetzt anrufen & Schädlinge professionell beseitigen lassen." />
        <meta name="keywords" content="Kammerjäger Essen, Schädlingsbekämpfung Essen, Kammerjäger Notdienst Essen, Wespen Essen, Bettwanzen Essen, Ratten Essen, Mäuse Essen, Schädlingsbekämpfer Essen" />
        <link rel="canonical" href="https://kammerjaeger-rothschild.de/kammerjaeger-essen" />
        <meta property="og:title" content="Kammerjäger Essen | Schädlingsbekämpfung & 24h Notdienst" />
        <meta property="og:description" content="IHK-zertifizierte Schädlingsbekämpfung in Essen. 24/7 Notdienst, 30-60 Min vor Ort. Wespen, Ratten, Bettwanzen & mehr." />
        <meta property="og:url" content="https://kammerjaeger-rothschild.de/kammerjaeger-essen" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="de_DE" />
        <meta name="geo.region" content="DE-NW" />
        <meta name="geo.placename" content="Essen" />
        <meta name="geo.position" content="51.4556;7.0116" />
        <meta name="ICBM" content="51.4556, 7.0116" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
        <Navbar />

        <main className="flex-grow pt-[76px] md:pt-[80px]">
          {/* HERO SECTION */}
          <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12 md:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                {/* Trust Badge */}
                <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Shield className="w-4 h-4" />
                  <span>IHK-zertifiziert & TÜV-geprüft</span>
                </div>

                {/* H1 - WICHTIGSTE SEO ELEMENT */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  Schädlingsbekämpfung in Essen – Ihr Kammerjäger vor Ort
                </h1>

                {/* Einleitungstext mit Stadtteilen */}
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Schnelle und professionelle Schädlingsbekämpfung in Essen und allen Stadtteilen: 
                  <strong> Rüttenscheid, Stadtmitte, Altenessen, Steele, Kettwig, Werden, Bredeney </strong> 
                  und Umgebung. Als IHK-zertifizierter Kammerjäger sind wir in <strong>30–60 Minuten</strong> bei Ihnen – 
                  auch im <strong>24/7 Notdienst</strong>. Über 20 Jahre Erfahrung für Privat und Gewerbe.
                </p>

                {/* USPs */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <div className="flex items-center gap-2 bg-background/80 backdrop-blur px-4 py-2 rounded-lg shadow-sm">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-medium">24/7 Notdienst</span>
                  </div>
                  <div className="flex items-center gap-2 bg-background/80 backdrop-blur px-4 py-2 rounded-lg shadow-sm">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="font-medium">30-60 Min vor Ort</span>
                  </div>
                  <div className="flex items-center gap-2 bg-background/80 backdrop-blur px-4 py-2 rounded-lg shadow-sm">
                    <BadgeCheck className="w-5 h-5 text-primary" />
                    <span className="font-medium">IHK-zertifiziert</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
                    className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Phone className="w-5 h-5" />
                    Jetzt anrufen: 0152 1212 4199
                  </a>
                  
                </div>
              </div>
            </div>
          </section>

          {/* LEISTUNGEN IN ESSEN */}
          <AnimatedSection>
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
                  Unsere Leistungen als Kammerjäger in Essen
                </h2>
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                  Professionelle Schädlingsbekämpfung für alle Arten von Schädlingen in Essen und Umgebung
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SERVICES.map((service, index) => (
                    <div
                      key={index}
                      className="bg-background rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-border/50"
                    >
                      <div className="text-4xl mb-4">{service.icon}</div>
                      <h3 className="text-xl font-bold mb-3 text-foreground">{service.title}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </AnimatedSection>

          {/* WARUM WIR - ESSEN */}
          <AnimatedSection>
            <section className="py-16">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
                  Warum wir der richtige Schädlingsbekämpfer für Essen sind
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">20+ Jahre Erfahrung</h3>
                    <p className="text-muted-foreground text-sm">Langjährige Expertise in der Schädlingsbekämpfung in Essen und NRW</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Privat & Gewerbe</h3>
                    <p className="text-muted-foreground text-sm">Einsätze für Privathaushalte, Gastronomie, Hotels und Industrie in Essen</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Truck className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Diskrete Fahrzeuge</h3>
                    <p className="text-muted-foreground text-sm">Neutrale, unbeschriftete Fahrzeuge für maximale Diskretion</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Transparente Preise</h3>
                    <p className="text-muted-foreground text-sm">Festpreisgarantie ohne versteckte Kosten – faire Preise in Essen</p>
                  </div>
                </div>
              </div>
            </section>
          </AnimatedSection>

          {/* ABLAUF EINSATZ */}
          <AnimatedSection>
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
                  Ablauf unseres Einsatzes in Essen
                </h2>

                <div className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                      { step: '1', title: 'Kontakt', desc: 'Rufen Sie uns an oder schreiben Sie uns per WhatsApp. Schildern Sie kurz Ihr Problem in Essen.' },
                      { step: '2', title: 'Inspektion', desc: 'Wir kommen innerhalb von 30-60 Minuten zu Ihnen nach Essen und analysieren den Befall.' },
                      { step: '3', title: 'Bekämpfung', desc: 'Professionelle Schädlingsbekämpfung mit modernsten Methoden – diskret und effektiv.' },
                      { step: '4', title: 'Nachkontrolle', desc: 'Optional: Nachkontrolle und Präventionsberatung für dauerhaften Schutz.' }
                    ].map((item, index) => (
                      <div key={index} className="relative">
                        <div className="bg-background rounded-xl p-6 shadow-md border border-border/50 h-full">
                          <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mb-4">
                            {item.step}
                          </div>
                          <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                          <p className="text-muted-foreground text-sm">{item.desc}</p>
                        </div>
                        {index < 3 && (
                          <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/30" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </AnimatedSection>

          {/* HÄUFIGE EINSÄTZE IN ESSEN */}
          <AnimatedSection>
            <section className="py-16">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
                  Häufige Einsätze in Essen
                </h2>
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                  Echte Beispiele aus unserem Arbeitsalltag als Kammerjäger in Essen
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {EINSATZ_BEISPIELE.map((beispiel, index) => (
                    <div key={index} className="bg-background rounded-xl p-6 shadow-md border-l-4 border-primary">
                      <div className="flex items-start gap-3 mb-3">
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="font-bold">{beispiel.location}</span>
                      </div>
                      <p className="text-muted-foreground mb-2"><strong>Problem:</strong> {beispiel.problem}</p>
                      <p className="text-success"><strong>Lösung:</strong> {beispiel.solution}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </AnimatedSection>

          {/* CTA SECTION */}
          <section className="py-12 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Schädlingsbefall in Essen? Wir helfen sofort!
              </h2>
              <p className="mb-6 opacity-90">24/7 Notdienst – In 30-60 Minuten vor Ort</p>
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 rounded-lg text-lg font-bold hover:bg-background/90 transition-all shadow-lg"
              >
                <Phone className="w-5 h-5" />
                0152 1212 4199
              </a>
            </div>
          </section>

          {/* FAQ SECTION */}
          <AnimatedSection>
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
                  Häufige Fragen zur Schädlingsbekämpfung in Essen
                </h2>
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                  Antworten auf die wichtigsten Fragen rund um unseren Kammerjäger-Service in Essen
                </p>

                <div className="max-w-3xl mx-auto">
                  <Accordion type="single" collapsible className="space-y-4">
                    {FAQ_DATA.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`faq-${index}`}
                        className="bg-background rounded-lg border border-border/50 px-6"
                      >
                        <AccordionTrigger className="text-left font-semibold hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </section>
          </AnimatedSection>

          {/* STADTTEILE ESSEN - Internal Linking */}
          <AnimatedSection>
            <section className="py-16">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
                  Kammerjäger für alle Stadtteile in Essen
                </h2>
                <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                  Schnelle Schädlingsbekämpfung in ganz Essen – wir sind überall für Sie da
                </p>

                <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                  {STADTTEILE.map((stadtteil, index) => (
                    <span
                      key={index}
                      className="bg-muted px-4 py-2 rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      Essen-{stadtteil}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </AnimatedSection>

          {/* BEWERTUNGEN */}
          <AnimatedSection>
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
                  Das sagen unsere Kunden in Essen
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {[
                    { name: 'M. Schmidt', location: 'Essen-Rüttenscheid', text: 'Wespennest wurde noch am gleichen Tag entfernt. Sehr professionell und freundlich. Klare Empfehlung!', rating: 5 },
                    { name: 'K. Weber', location: 'Essen-Stadtmitte', text: 'Bettwanzen im Hotel – Rothschild war innerhalb einer Stunde da und hat das Problem diskret gelöst. Top Service!', rating: 5 },
                    { name: 'T. Müller', location: 'Essen-Steele', text: 'Mäuse im Keller. Schnelle Reaktion, faire Preise und nachhaltige Lösung. Sehr zufrieden!', rating: 5 }
                  ].map((review, index) => (
                    <div key={index} className="bg-background rounded-xl p-6 shadow-md">
                      <div className="flex gap-1 mb-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-4 italic">"{review.text}"</p>
                      <div className="font-semibold">{review.name}</div>
                      <div className="text-sm text-muted-foreground">{review.location}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </AnimatedSection>

          {/* FINAL CTA */}
          <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                Jetzt Kammerjäger in Essen kontaktieren
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                IHK-zertifizierte Schädlingsbekämpfung • 24/7 Notdienst • 30-60 Min vor Ort • Festpreisgarantie
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg text-lg font-bold hover:bg-white/90 transition-all shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  0152 1212 4199
                </a>


              </div>
            </div>
          </section>
        </main>

        <Footer />

        <PhoneButton phoneNumber={PHONE_NUMBER} variant="fixed" />
        
      </div>
    </>
  );
};

export default EssenPage;
