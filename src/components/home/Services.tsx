import React, { useState } from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { Bug, Rat, Sprout, Bed, BugOff, Stethoscope, Mouse, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import EmergencyWaspBadge from '../ui/EmergencyWaspBadge';

const services = [
 {
    icon: <Bug className="h-10 w-10" />,
    title: "Wespenbekämpfung",
    description: "Sichere und fachgerechte Entfernung von Wespennestern und Insektenschwärmen an Ihrem Gebäude.",
    image: "https://www.bund-niedersachsen.de/fileadmin/niedersachsen/bilder/artenschutz/wespen/wespennest_wasp-nest-gba3281439_1920_pixabay_com_wespennest-wespen-waben-nest-335984_kundennote_com.jpg",
    alt: "Professionelle Wespenbekämpfung und Nestentfernung",
    keywords: ["Wespenbekämpfung", "Wespennest entfernen", "Wespenplage"],
    detailedContent: {
      title: "Professionelle Wespenbekämpfung & Wespennest entfernen",
      content: `
        <h3>Wespen entfernen durch zertifizierte Kammerjäger</h3>
        <p>Unsere professionelle <strong>Wespenbekämpfung</strong> und das sichere <strong>Wespennest entfernen</strong> erfolgt durch IHK-zertifizierte Experten. Wir bieten schnelle Hilfe bei Wespenbefall und entfernen Wespennester sicher von Ihrem Gebäude.</p>
        
        <h4>Wespen erkennen und verstehen</h4>
        <p>Wespen sind soziale Insekten, die in Staaten leben. Ein <strong>Wespennest</strong> kann bis zu 7.000 Tiere beherbergen. Wespen werden besonders im Spätsommer aggressiv, wenn das Nahrungsangebot knapper wird.</p>
        
        <h4>Professionelles Wespen entfernen</h4>
        <p>Unsere <strong>Wespenbekämpfung</strong> umfasst:</p>
        <ul>
          <li>Sichere Entfernung von Wespennestern</li>
          <li>Behandlung mit umweltschonenden Mitteln</li>
          <li>Präventive Maßnahmen gegen Neubefall</li>
          <li>24/7 Notdienst für <strong>Hornissennest entfernen</strong></li>
        </ul>
        
        <h4>Warum professionelle Schädlingsbekämpfung?</h4>
        <p>Das eigenständige <strong>Wespen entfernen</strong> ist gefährlich. Unsere Kammerjäger verfügen über Schutzausrüstung und Erfahrung im sicheren <strong>Wespennest entfernen</strong>. Besonders beim <strong>Hornissennest entfernen</strong> ist Vorsicht geboten, da Hornissen unter Naturschutz stehen.</p>
      `
    }
  },
  {
    icon: <Bug className="h-10 w-10" />,
    title: "Ameisenbekämpfung",
    description: "Gezielte und nachhaltige Bekämpfung von Ameisen in Wohnräumen, Gärten und Terrassen.",
    image: "https://www.swr.de/swr1/swr1leute/1724937119340%2Cameisen-schaedling-oder-chance-ewiges-leben-susanne-foitzik-100~_v-16x9@2dL_-6c42aff4e68b43c7868c3240d3ebfa29867457da.jpg",
    alt: "Professionelle Ameisenbekämpfung im Innen- und Außenbereich",
    keywords: ["Ameisenbekämpfung", "Ameisennest entfernen", "Ameisen loswerden"],
    detailedContent: {
      title: "Ameisen bekämpfen & Ameisen loswerden dauerhaft",
      content: `
        <h3>Professionelle Ameisen bekämpfen durch Experten</h3>
        <p>Unsere spezialisierte <strong>Ameisenbekämpfung</strong> hilft Ihnen dabei, <strong>Ameisen loswerden</strong> zu können - dauerhaft und effektiv. Wir bekämpfen sowohl normale Ameisen als auch <strong>Flugameisen loswerden</strong>.</p>
        
        <h4>Ameisen verstehen und erkennen</h4>
        <p>Ameisen folgen Duftstoffen und können schnell zur Plage werden. Besonders <strong>Flugameisen</strong> treten saisonal auf und signalisieren oft einen etablierten Ameisenstaat in der Nähe.</p>
        
        <h4>Nachhaltige Ameisen bekämpfen</h4>
        <p>Unser Ansatz zum <strong>Ameisen bekämpfen</strong>:</p>
        <ul>
          <li>Aufspüren und Behandlung der Ameisenstraßen</li>
          <li>Gezielte Köderbehandlung am Ameisennest</li>
          <li>Umweltfreundliche <strong>ameisen vertreiben</strong> Methoden</li>
          <li>Präventive Beratung gegen Neubefall</li>
          <li>Spezialbehandlung für <strong>Flugameisen loswerden</strong></li>
        </ul>
        
        <h4>Langfristige Lösungen</h4>
        <p>Nach der Behandlung beraten wir Sie, wie Sie dauerhaft <strong>Ameisen loswerden</strong> und einem Neubefall vorbeugen können. Unsere Kammerjäger kennen alle Ameisenarten und deren spezifische Bekämpfungsstrategien.</p>
      `
    }
  },
  {
    icon: <Rat className="h-10 w-10" />,
    title: "Rattenbekämpfung",
    description: "Professionelle Beseitigung von Ratten in Wohnhäusern, Gärten und Betrieben mit nachhaltigen Lösungen.",
    image: "https://www.das-tierlexikon.de/wp-content/uploads/2018/08/mongolische-rennmaeuse.jpg",
    alt: "Effektive Rattenbekämpfung durch Fachexperten",
    keywords: ["Rattenbekämpfung", "Rattenbefall", "Rattenplage entfernen"],
    detailedContent: {
      title: "Ratten bekämpfen & Ratten loswerden professionell",
      content: `
        <h3>Professionelle Ratten bekämpfen durch Kammerjäger</h3>
        <p>Unsere spezialisierte <strong>Rattenbekämpfung</strong> hilft Ihnen zuverlässig dabei, <strong>Ratten loswerden</strong> zu können. Ob <strong>Ratten im Garten</strong>, im Haus oder Betrieb - wir bieten nachhaltige Lösungen.</p>
        
        <h4>Rattenbefall erkennen und verstehen</h4>
        <p>Ratten sind nachtaktive Schädlinge, die Krankheiten übertragen können. <strong>Ratten im Garten</strong> graben Tunnelsysteme und können erhebliche Schäden verursachen. Anzeichen für Rattenbefall sind Kotspuren, Nagespuren und Laufgeräusche.</p>
        
        <h4>Effektive Ratten bekämpfen Methoden</h4>
        <p>Unser Vorgehen beim <strong>Ratten bekämpfen</strong>:</p>
        <ul>
          <li>Professionelle Befallsanalyse und Ursachensuche</li>
          <li>Sichere Köderbehandlung mit zugelassenen Rodentiziden</li>
          <li>Abdichtung von Zugangswegen</li>
          <li>Spezielle Lösungen für <strong>Ratten im Garten</strong></li>
          <li>Nachkontrolle und Monitoring</li>
        </ul>
        
        <h4>Ratten vertreiben und vorbeugen</h4>
        <p>Nach der Bekämpfung zeigen wir Ihnen, wie Sie <strong>Ratten vertreiben</strong> und einem Neubefall vorbeugen können. Unsere <strong>Schädlingsbekämpfung</strong> Experten beraten Sie umfassend zu präventiven Maßnahmen.</p>
      `
    }
  },
  {
    icon: <Bed className="h-10 w-10" />,
    title: "Bettwanzenbekämpfung",
    description: "Spezialisierte Behandlung zur vollständigen Beseitigung von Bettwanzen und deren Eiern in Wohn- und Schlafräumen.",
    image: "https://farmers-cat.de/media/wysiwyg/Bettwanzen/shutterstock_2236348135_.jpg",
    alt: "Spezialisierte Bettwanzenbekämpfung durch qualifizierte Kammerjäger",
    keywords: ["Bettwanzenbekämpfung", "Bettwanzen Behandlung", "Bettwanzen loswerden"],
    detailedContent: {
      title: "Bettwanzen bekämpfen & Bettwanzen loswerden dauerhaft",
      content: `
        <h3>Professionelle Bettwanzen bekämpfen durch Experten</h3>
        <p>Unsere spezialisierte <strong>Bettwanzenbekämpfung</strong> hilft Ihnen dabei, <strong>Bettwanzen loswerden</strong> zu können. Wir bieten effektive Lösungen zum <strong>Bettwanzen entfernen</strong> und <strong>Bettwanzen vertreiben</strong>.</p>
        
        <h4>Bettwanzen erkennen und verstehen</h4>
        <p>Bettwanzen sind nachtaktive Parasiten, die sich von menschlichem Blut ernähren. Sie verstecken sich tagsüber in Matratzen, Bettrahmen und Ritzen. Typische Anzeichen sind kleine Blutflecken, süßlicher Geruch und juckende Stiche.</p>
        
        <h4>Effektive Bettwanzen bekämpfen Methoden</h4>
        <p>Unser Ansatz zum <strong>Bettwanzen bekämpfen</strong>:</p>
        <ul>
          <li>Gründliche Befallsinspektion aller Verstecke</li>
          <li>Wärmebehandlung und chemische Behandlung</li>
          <li>Behandlung aller Entwicklungsstadien und Eier</li>
          <li>Nachbehandlung zur vollständigen <strong>Bettwanzen entfernen</strong></li>
          <li>Beratung zu vorbeugenden Maßnahmen</li>
        </ul>
        
        <h4>Nachhaltig Bettwanzen loswerden</h4>
        <p>Unsere Kammerjäger verwenden professionelle Methoden, um <strong>Bettwanzen vertreiben</strong> und dauerhaft <strong>Bettwanzen loswerden</strong> zu können. Die Behandlung erfolgt diskret und mit modernsten Verfahren der <strong>Schädlingsbekämpfung</strong>.</p>
      `
    }
  },
  {
    icon: <BugOff className="h-10 w-10" />,
    title: "Marderbekämpfung",
    description: "Fachgerechte Vertreibung und Prävention von Mardern in Wohnhäusern, auf Dachböden und in Autos.",
    image: "https://www.ruv.de/dam/ratgeber/images/2017/54-02-2017-486069343.jpg",
    alt: "Marderbekämpfung für Dachböden und Wohnräume durch zertifizierte Experten",
    keywords: ["Marderbekämpfung", "Marderschutz", "Marder Dachboden"],
    detailedContent: {
      title: "Marder bekämpfen & Marder loswerden professionell",
      content: `
        <h3>Professionelle Marder bekämpfen und Marderabwehr</h3>
        <p>Unsere spezialisierte <strong>Marderbekämpfung</strong> und <strong>Marderabwehr</strong> hilft Ihnen dabei, <strong>Marder loswerden</strong> zu können. Besonders <strong>Marder im Dachboden</strong> können erhebliche Schäden verursachen.</p>
        
        <h4>Marderbefall erkennen und verstehen</h4>
        <p><strong>Marder im Dachboden</strong> machen sich durch Laufgeräusche, Kratzen und Kot bemerkbar. Marder sind nachtaktiv und können durch Isolation, Kabel und Dämmung beträchtliche Schäden anrichten.</p>
        
        <h4>Effektive Marder bekämpfen Strategien</h4>
        <p>Unser Ansatz zum <strong>Marder bekämpfen</strong>:</p>
        <ul>
          <li>Professionelle <strong>Marderabwehr</strong> durch Verschließen der Zugänge</li>
          <li>Humanitäre Vergrämung und <strong>Marder vertreiben</strong></li>
          <li>Installation von Mardersperren und Schutzgittern</li>
          <li>Spezialbehandlung für <strong>Marder im Dachboden</strong></li>
          <li>Reinigung und Desinfektion nach Marderbefall</li>
        </ul>
        
        <h4>Langfristige Marderabwehr</h4>
        <p>Nach der Behandlung installieren wir professionelle <strong>Marderabwehr</strong>-Systeme, damit Sie dauerhaft <strong>Marder loswerden</strong> können. Unsere Kammerjäger beraten Sie zu nachhaltigen Lösungen gegen <strong>Marder vertreiben</strong>.</p>
      `
    }
  },
  {
    icon: <Mouse className="h-10 w-10" />,
    title: "Mäusebekämpfung",
    description: "Effektive Entfernung von Mäusen und anderen Nagetieren aus Ihrem Zuhause oder Geschäftsräumen.",
    image: "https://bk-schaedling.de/wp-content/uploads/2019/12/Maus-am-Kabel-WEB.jpg",
    alt: "Professionelle Mäusebekämpfung durch zertifizierte Kammerjäger",
    keywords: ["Mäusebekämpfung", "Mäusebefall", "Mäusenest entfernen"],
    detailedContent: {
      title: "Mäuse bekämpfen & Mäuse vertreiben nachhaltig",
      content: `
        <h3>Professionelle Mäuse bekämpfen durch Kammerjäger</h3>
        <p>Unsere spezialisierte <strong>Mäusebekämpfung</strong> hilft Ihnen dabei, effektiv <strong>Mäuse bekämpfen</strong> und <strong>Mäuse vertreiben</strong> zu können. Wir bieten nachhaltige Lösungen gegen Mäusebefall.</p>
        
        <h4>Mäusebefall erkennen und verstehen</h4>
        <p>Mäuse sind nachtaktive Nagetiere, die sich schnell vermehren. Ein Mäusepaar kann bis zu 2000 Nachkommen pro Jahr produzieren. Anzeichen für Mäusebefall sind Kotspuren, Nagespuren und typischer Uringeruch.</p>
        
        <h4>Effektive Mäuse bekämpfen Methoden</h4>
        <p>Unser Vorgehen beim <strong>Mäuse bekämpfen</strong>:</p>
        <ul>
          <li>Professionelle Befallsanalyse und Nestsuche</li>
          <li>Strategische Köderplatzierung mit Sicherheitsstationen</li>
          <li>Abdichtung von Schlupflöchern und Zugangswegen</li>
          <li>Umweltfreundliche <strong>Mäuse vertreiben</strong> Methoden</li>
          <li>Nachkontrolle und Erfolgsmessung</li>
        </ul>
        
        <h4>Nachhaltige Mäusebekämpfung</h4>
        <p>Nach der Behandlung beraten wir Sie, wie Sie dauerhaft <strong>Mäuse vertreiben</strong> und einem Neubefall vorbeugen können. Unsere <strong>Schädlingsbekämpfung</strong> Experten kennen alle Mäusearten und deren Bekämpfung.</p>
      `
    }
  },
  {
    icon: <Bug className="h-10 w-10" />,
    title: "Silberfischbekämpfung",
    description: "Effektive Bekämpfung von Silberfischen und Papierfischen für ein gesundes Raumklima ohne Schädlinge.",
    image: "https://ardap.de/cdn/shop/articles/ofenfischchen_a454c276-fce2-4a2a-9e50-95f0e23de197.jpg?v=1744916439",
    alt: "Spezialisierte Bekämpfung von Silberfischen und Papierfischen",
    keywords: ["Silberfischbekämpfung", "Papierfischbekämpfung", "Feuchtigkeit bekämpfen"],
    detailedContent: {
      title: "Silberfische bekämpfen - professionelle Hilfe",
      content: `
        <h3>Professionelle Silberfische bekämpfen</h3>
        <p>Unsere spezialisierte <strong>Silberfischbekämpfung</strong> hilft Ihnen dabei, dauerhaft <strong>Silberfische bekämpfen</strong> zu können. Wir behandeln auch verwandte Arten wie Papierfischchen und andere Urinsekten.</p>
        
        <h4>Silberfische verstehen und erkennen</h4>
        <p>Silberfische sind nachtaktive Insekten, die sich von stärkehaltigen Materialien, Hausstaubmilben und organischen Stoffen ernähren. Sie bevorzugen feuchte Umgebungen wie Badezimmer, Küchen und Keller.</p>
        
        <h4>Effektive Silberfische bekämpfen Strategien</h4>
        <p>Unser Ansatz zum <strong>Silberfische bekämpfen</strong>:</p>
        <ul>
          <li>Ursachenanalyse der Feuchtigkeitsquellen</li>
          <li>Gezielte Köderbehandlung in Verstecken</li>
          <li>Reduzierung der Luftfeuchtigkeit</li>
          <li>Abdichtung von Ritzen und Spalten</li>
          <li>Präventive Beratung zur Befallsvermeidung</li>
        </ul>
        
        <h4>Langfristige Lösungen</h4>
        <p>Erfolgreiche <strong>Silberfischbekämpfung</strong> erfordert die Bekämpfung der Ursachen. Unsere Kammerjäger beraten Sie zu baulichen Maßnahmen und Klimakontrolle, um dauerhaft <strong>Silberfische bekämpfen</strong> zu können.</p>
      `
    }
  },
  {
    icon: <Bug className="h-10 w-10" />,
    title: "Schabenbekämpfung",
    description: "Professionelle Beseitigung von Schaben und Kakerlaken mit nachhaltigen Bekämpfungsstrategien.",
    image: "https://www.schaedlingskunde.de/Steckbriefe/htm_Steckbriefe/Blattella-germanica-Foto1.jpg",
    alt: "Professionelle Schaben- und Kakerlakenbekämpfung",
    keywords: ["Schabenbekämpfung", "Kakerlaken bekämpfen", "Schädlingsbekämpfung"],
    detailedContent: {
      title: "Schaben bekämpfen & Kakerlaken bekämpfen professionell",
      content: `
        <h3>Professionelle Schaben bekämpfen und Kakerlaken bekämpfen</h3>
        <p>Unsere spezialisierte <strong>Schabenbekämpfung</strong> hilft Ihnen dabei, effektiv <strong>Schaben bekämpfen</strong> und <strong>Kakerlaken bekämpfen</strong> zu können. Wir bieten nachhaltige Lösungen gegen alle Schabenarten.</p>
        
        <h4>Schaben und Kakerlaken erkennen</h4>
        <p>Schaben (Kakerlaken) sind nachtaktive Schädlinge, die Krankheiten übertragen können. Die häufigsten Arten sind Deutsche Schabe, Orientalische Schabe und Amerikanische Schabe. Sie bevorzugen warme, feuchte Bereiche wie Küchen und Sanitärräume.</p>
        
        <h4>Effektive Schaben bekämpfen Methoden</h4>
        <p>Unser Vorgehen beim <strong>Schaben bekämpfen</strong>:</p>
        <ul>
          <li>Gründliche Befallsanalyse und Artbestimmung</li>
          <li>Strategische Gel-Köder-Behandlung</li>
          <li>Behandlung aller Entwicklungsstadien</li>
          <li>Abdichtung von Verstecken und Zugangswegen</li>
          <li>Nachkontrolle und Monitoring-System</li>
        </ul>
        
        <h4>Nachhaltige Kakerlaken bekämpfen</h4>
        <p>Erfolgreiche <strong>Kakerlaken bekämpfen</strong> Strategien erfordern professionelle <strong>Schädlingsbekämpfung</strong>. Unsere Kammerjäger verwenden moderne Bekämpfungsverfahren und beraten Sie zu präventiven Hygienemaßnahmen.</p>
      `
    }
  },
  {
    icon: <Bug className="h-10 w-10" />,
    title: "Flohbekämpfung",
    description: "Gründliche Beseitigung von Flöhen in Wohnräumen und Polstermöbeln mit langanhaltender Wirkung.",
    image: "https://kaspar-schaedlingsbekaempfung.de/wp-content/uploads/2020/09/Floh1-shutterstock_1408962617-1024x646.jpg",
    alt: "Professionelle Flohbekämpfung für Wohnräume und Polstermöbel",
    keywords: ["Flohbekämpfung", "Flöhe bekämpfen", "Flohbefall behandeln"],
    detailedContent: {
      title: "Flöhe bekämpfen - professionelle Flohbekämpfung",
      content: `
        <h3>Professionelle Flöhe bekämpfen durch Kammerjäger</h3>
        <p>Unsere spezialisierte <strong>Flohbekämpfung</strong> hilft Ihnen dabei, erfolgreich <strong>Flöhe bekämpfen</strong> zu können. Wir behandeln sowohl Katzenflöhe, Hundeflöhe als auch Menschenflöhe in Wohnräumen.</p>
        
        <h4>Flohbefall erkennen und verstehen</h4>
        <p>Flöhe sind springende Parasiten, die sich von Blut ernähren. Erwachsene Flöhe machen nur 5% der Population aus, 95% sind Eier, Larven und Puppen in Teppichen, Polstern und Ritzen. Ein vollständiger Entwicklungszyklus dauert 2-8 Wochen.</p>
        
        <h4>Effektive Flöhe bekämpfen Strategien</h4>
        <p>Unser Ansatz zum <strong>Flöhe bekämpfen</strong>:</p>
        <ul>
          <li>Behandlung aller Entwicklungsstadien der Flöhe</li>
          <li>Spezielle Staubsauger-Behandlung vor der Bekämpfung</li>
          <li>Professionelle Sprühbehandlung von Textilien und Polstern</li>
          <li>Wachstumsregulatoren gegen Flohlarven</li>
          <li>Nachbehandlung nach 14-21 Tagen</li>
        </ul>
        
        <h4>Nachhaltige Flohbekämpfung</h4>
        <p>Erfolgreiche <strong>Flohbekämpfung</strong> erfordert die Behandlung der Umgebung und der Wirtstiere. Unsere <strong>Schädlingsbekämpfung</strong> Experten beraten Sie zur Zusammenarbeit mit Tierärzten und Nachsorge.</p>
      `
    }
  },
  {
    icon: <Stethoscope className="h-10 w-10" />,
    title: "Wartungsverträge",
    description: "Vorbeugende Maßnahmen und regelmäßige Inspektionen zum kontinuierlichen Schutz vor Schädlingsbefall.",
    image: "https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=1000",
    alt: "Vorsorgende Schädlingsbekämpfung durch regelmäßige Inspektionen und Wartungsverträge",
    keywords: ["Schädlingsmonitoring", "Präventionsservice", "Wartungsvertrag Schädlinge"],
    detailedContent: {
      title: "Präventive Schädlingsbekämpfung & Wartungsverträge",
      content: `
        <h3>Professionelle Schädlingsbekämpfung mit Wartungsvertrag</h3>
        <p>Unsere präventive <strong>Schädlingsbekämpfung</strong> durch Wartungsverträge bietet kontinuierlichen Schutz vor allen Schädlingsarten. Als erfahrener <strong>Kammerjäger</strong> entwickeln wir individuelle Schutzkonzepte.</p>
        
        <h4>Vorteile präventiver Schädlingsbekämpfung</h4>
        <p>Regelmäßige Inspektionen durch unseren <strong>Kammerjäger</strong> erkennen Befallsrisiken frühzeitig. Präventive <strong>Schädlingsbekämpfung</strong> ist kostengünstiger als die Bekämpfung etablierter Befälle.</p>
        
        <h4>Leistungen unserer Wartungsverträge</h4>
        <p>Unser Wartungsvertrag für <strong>Schädlingsbekämpfung</strong> umfasst:</p>
        <ul>
          <li>Regelmäßige Inspektionen durch zertifizierten <strong>Kammerjäger</strong></li>
          <li>Monitoring-Stationen für Nagetiere und Insekten</li>
          <li>Sofortmaßnahmen bei Schädlingsbefall</li>
          <li>Dokumentation und Berichtswesen</li>
          <li>24/7 Notdienst für Wartungsvertragskunden</li>
          <li>Beratung zu baulichen Präventionsmaßnahmen</li>
        </ul>
        
        <h4>Maßgeschneiderte Schutzkonzepte</h4>
        <p>Jeder Wartungsvertrag wird individuell angepasst. Unser <strong>Kammerjäger</strong> entwickelt spezifische <strong>Schädlingsbekämpfung</strong> Strategien für Ihr Objekt und berücksichtigt dabei Nutzung, Risikofaktoren und örtliche Gegebenheiten.</p>
      `
    }
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <AnimatedSection id="services" className="bg-secondary/50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="section-heading">
            Unsere Schädlingsbekämpfung-Dienstleistungen
          </h2>
          <p className="section-subheading">
            Wir bekämpfen gezielt Ratten, Mäuse, Marder, Ameisen, Silberfische, Schaben, Kakerlaken, Wespen, Bettwanzen und Flöhe mit professionellen und nachhaltigen Methoden.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12 rounded-xl overflow-hidden shadow-md">
          <AspectRatio ratio={16/9}>
            <img 
              src="https://www.gewerbeanmeldung.de/sites/default/files/artikelbilder/kammerjaeger.jpg" 
              alt="Professionelle Schädlingsbekämpfung in Aktion durch zertifizierte Experten" 
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              width="840"
              height="473"
              loading="lazy"
              decoding="async"
            />
          </AspectRatio>
          <div className="bg-white p-4 text-center text-sm text-muted-foreground">
            Unsere zertifizierten Kammerjäger bekämpfen alle Arten von Schädlingen in Ihrem Zuhause oder Geschäft
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((service, index) => {
            const isWaspService = service.title === "Wespenbekämpfung";
            
            return (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card
                    className={cn(
                      "border transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] relative cursor-pointer group",
                      isWaspService ? "border-red-500 border-2" : "border-primary/10"
                    )}
                  >
                    {isWaspService && (
                      <EmergencyWaspBadge variant="service-highlight" />
                    )}
                    
                    <div className="mb-5 rounded-lg overflow-hidden">
                      <AspectRatio ratio={16/9}>
                        <img 
                          src={service.image} 
                          alt={service.alt} 
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                          width="400"
                          height="225"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = '/placeholder.svg';
                          }}
                        />
                      </AspectRatio>
                    </div>
                    
                    <CardContent className="pt-6">
                      <div className={cn(
                        "rounded-full p-4 inline-flex mb-5",
                        isWaspService ? "bg-red-100 text-red-600" : "bg-accent/10 text-accent"
                      )}>
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                      <p className="text-sm text-accent font-medium">→ Mehr erfahren</p>
                      
                      <div className="sr-only">
                        <h4>Stichworte zur {service.title}</h4>
                        <ul>
                          {service.keywords.map((keyword, idx) => (
                            <li key={idx}>{keyword}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-primary mb-4">
                      {service.detailedContent.title}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <AspectRatio ratio={16/9} className="mb-4">
                        <img 
                          src={service.image} 
                          alt={service.alt} 
                          className="object-cover w-full h-full rounded-lg"
                          width="400"
                          height="225"
                        />
                      </AspectRatio>
                      
                      <div className="bg-accent/5 p-4 rounded-lg">
                        <h4 className="font-semibold text-accent mb-2">Schnelle Hilfe benötigt?</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Kontaktieren Sie unsere Kammerjäger-Experten für eine kostenlose Beratung.
                        </p>
                        <div className="flex gap-2">
                          <a 
                            href="tel:+4915212124199" 
                            className="inline-flex items-center px-3 py-2 bg-accent text-accent-foreground rounded-md text-sm font-medium hover:bg-accent/90 transition-colors"
                          >
                            Jetzt anrufen
                          </a>
                          <a 
                            href="https://wa.me/4915212124199" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                          >
                            WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="prose prose-sm max-w-none">
                      <div 
                        dangerouslySetInnerHTML={{ __html: service.detailedContent.content }}
                        className="[&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-primary [&>h3]:mb-3 [&>h4]:text-base [&>h4]:font-medium [&>h4]:text-primary [&>h4]:mb-2 [&>h4]:mt-4 [&>p]:mb-3 [&>ul]:mb-4 [&>li]:mb-1"
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg mb-6">
            Alle Leistungen werden mit einer <span className="font-semibold text-accent">kostenlosen Anfahrt</span> und einem <span className="font-semibold text-accent">transparenten Preismodell</span> angeboten.
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-accent text-accent-foreground hover:bg-accent/90 font-medium transition-colors shadow-sm"
          >
            Kostenlose Beratung anfordern
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Services;
