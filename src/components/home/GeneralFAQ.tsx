import React from 'react';
import ServiceFAQ from './ServiceFAQ';

const GeneralFAQ = ({ cityName }: { cityName?: string }) => {
  const city = cityName || "Ihrer Stadt";
  
  const faqs = [
    {
      question: `Was kostet ein Kammerjäger in ${city}?`,
      answer: `Die Kosten für einen Kammerjäger in ${city} variieren je nach Schädlingsart und Befallsgrad. Bei Kammerjäger Hoffmeyer bieten wir transparente Preise und kostenlose Anfahrt. Kontaktieren Sie uns für ein unverbindliches Angebot.`
    },
    {
      question: `Wie schnell kommt der Kammerjäger in ${city}?`,
      answer: `Kammerjäger Hoffmeyer bietet einen 24/7 Notdienst in ${city}. In dringenden Fällen sind wir innerhalb von 30-60 Minuten vor Ort. Bei regulären Anfragen vereinbaren wir kurzfristige Termine nach Ihren Wünschen.`
    },
    {
      question: `Wespennest entfernen - Wie läuft das ab?`,
      answer: `Bei der Wespenbekämpfung analysieren wir zunächst die Lage des Nests. Unsere zertifizierten Kammerjäger entfernen das Wespennest sicher mit Schutzausrüstung und professionellen Mitteln. Die Entfernung dauert meist 20-30 Minuten.`
    },
    {
      question: `Bettwanzen bekämpfen - Welche Methoden nutzen Sie?`,
      answer: `Zur Bettwanzen-Bekämpfung setzen wir auf Wärmebehandlung und moderne Insektizide. Unsere Kammerjäger behandeln alle Verstecke gründlich und führen Nachkontrollen durch, um einen dauerhaften Erfolg zu garantieren.`
    },
    {
      question: `Ratten bekämpfen - Wie sicher ist das?`,
      answer: `Unsere Ratten-Bekämpfung erfolgt mit gesicherten Köderstationen, die für Kinder und Haustiere unzugänglich sind. Als professionelle Kammerjäger beraten wir Sie auch zur Prävention und Abdichtung von Zugangswegen.`
    },
    {
      question: `Marder vertreiben - Schadet das den Tieren?`,
      answer: `Nein, unsere Marder-Abwehr ist tierschonend. Wir setzen auf Vergrämungsmittel und professionelle Abdichtung Ihres Dachbodens. Kammerjäger Hoffmeyer arbeitet nach den neuesten tierschutzrechtlichen Standards.`
    },
    {
      question: `Mäuse bekämpfen - Wie lange dauert das?`,
      answer: `Die Mäuse-Bekämpfung erfolgt meist in 1-2 Behandlungen. Unsere Kammerjäger setzen Köderstationen und Fallen ein und analysieren die Ursachen. Nach erfolgreicher Bekämpfung beraten wir Sie zur dauerhaften Prävention.`
    },
    {
      question: `Ist ein Kammerjäger bei Silberfischen notwendig?`,
      answer: `Bei starkem Silberfisch-Befall empfiehlt sich ein professioneller Kammerjäger. Wir analysieren die Ursachen (meist Feuchtigkeit), behandeln alle Bereiche gründlich und geben Ihnen Tipps zur dauerhaften Vermeidung.`
    },
    {
      question: `Kakerlaken vernichten - Wie hygienisch ist das?`,
      answer: `Die Kakerlaken-Bekämpfung erfolgt professionell und hygienisch. Unsere Kammerjäger verwenden Gel-Köder und Sprühbehandlungen, die für Menschen unbedenklich sind. Nach der Behandlung reinigen wir alle betroffenen Bereiche.`
    },
    {
      question: `Sind Ihre Mittel zur Schädlingsbekämpfung sicher?`,
      answer: `Ja, alle von Kammerjäger Hoffmeyer verwendeten Mittel sind zugelassen und für Menschen sowie Haustiere unbedenklich bei sachgemäßer Anwendung. Wir halten uns streng an gesetzliche Vorgaben und informieren Sie detailliert über alle Maßnahmen.`
    }
  ];

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Häufig gestellte Fragen
          </h2>
          <p className="text-lg text-gray-600">
            Antworten auf die wichtigsten Fragen zur Schädlingsbekämpfung
          </p>
        </div>
        
        <ServiceFAQ faqs={faqs} serviceSlug="general" />
      </div>
    </section>
  );
};

export default GeneralFAQ;