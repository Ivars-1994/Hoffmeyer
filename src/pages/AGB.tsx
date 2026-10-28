import React from 'react';
import { Helmet } from 'react-helmet-async';
import HartmannNavbar from '@/components/hartmann/HartmannNavbar';
import HartmannFooter from '@/components/hartmann/HartmannFooter';
import MobileStickyCTA from '@/components/ui/MobileStickyCTA';

const sections: { title: string; text: string[] }[] = [
  { title: '§ 1 Geltungsbereich', text: ['Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB“) gelten für alle Aufträge über Leistungen der Schädlingsbekämpfung sowie damit zusammenhängende Leistungen zwischen dem Auftragnehmer und dem Kunden (nachfolgend „Auftraggeber“). Sie gelten gegenüber Verbrauchern (§ 13 BGB) und Unternehmern (§ 14 BGB). Abweichende Bedingungen des Auftraggebers werden nur Vertragsbestandteil, wenn ihnen ausdrücklich in Textform zugestimmt wurde.'] },
  { title: '§ 2 Vertragsschluss', text: ['Darstellungen auf der Website stellen kein verbindliches Angebot dar. Ein Auftrag kommt durch mündliche, telefonische oder schriftliche Beauftragung durch den Auftraggeber und deren Annahme zustande, spätestens jedoch mit Beginn der Arbeiten vor Ort. Art und Umfang der Leistungen werden vor Beginn der Arbeiten mit dem Auftraggeber abgestimmt.'] },
  { title: '§ 3 Leistungsumfang', text: ['Geschuldet ist die fachgerechte Ausführung der vereinbarten Leistungen nach den anerkannten Regeln der Technik. Ein bestimmter Erfolg kann nicht in jedem Fall zugesichert werden, insbesondere wenn die Ursache eines Schädlingsbefalls in baulichen Mängeln, offenen Zugängen, Befall aus Nachbarräumen oder mangelnder Hygiene liegt. Stellt sich vor Ort heraus, dass zusätzliche Leistungen erforderlich sind, werden diese erst nach Rücksprache mit dem Auftraggeber ausgeführt.'] },
  { title: '§ 4 Preise und Zahlung', text: ['Es gelten die vor Beginn der Arbeiten mitgeteilten Preise. Alle Preise gegenüber Verbrauchern verstehen sich inklusive der gesetzlichen Mehrwertsteuer. Zuschläge für Einsätze nachts, an Wochenenden oder Feiertagen werden vorab mitgeteilt. Die Vergütung ist nach Abschluss der Arbeiten ohne Abzug fällig und kann bar, per EC-/Kreditkarte oder nach Rechnungsstellung per Überweisung beglichen werden. Bei Zahlungsverzug gelten die gesetzlichen Bestimmungen.'] },
  { title: '§ 5 Termine und Anfahrt', text: ['Angaben zu Anfahrts- und Ankunftszeiten sind unverbindliche Richtwerte und können je nach Verkehrslage, Witterung und Auftragslage abweichen. Verzögerungen, die nicht zu vertreten sind, berechtigen nicht zum Schadensersatz.'] },
  { title: '§ 6 Mitwirkungspflichten des Auftraggebers', text: ['Der Auftraggeber stellt sicher, dass der Einsatzort zum vereinbarten Zeitpunkt zugänglich ist und betroffene Räume, Keller, Dachböden und Schlupfwinkel erreichbar sind. Er weist auf ihm bekannte Besonderheiten (z. B. Haustiere, Kinder, Allergien, frühere Bekämpfungsmaßnahmen) hin. Wird ein Einsatz aus Gründen, die der Auftraggeber zu vertreten hat, vergeblich angefahren, können die entstandenen Anfahrtskosten berechnet werden.'] },
  { title: '§ 7 Gewährleistung', text: ['Es gelten die gesetzlichen Gewährleistungsrechte. Mängel sind möglichst unverzüglich nach ihrer Feststellung anzuzeigen. Gegenüber Unternehmern beträgt die Gewährleistungsfrist ein Jahr ab Abnahme, soweit gesetzlich zulässig.'] },
  { title: '§ 8 Haftung', text: ['Für Schäden aus der Verletzung von Leben, Körper oder Gesundheit sowie bei Vorsatz und grober Fahrlässigkeit wird unbeschränkt gehaftet. Bei einfacher Fahrlässigkeit wird nur bei Verletzung einer wesentlichen Vertragspflicht gehaftet, begrenzt auf den vorhersehbaren, vertragstypischen Schaden. Keine Haftung besteht für Schäden, die auf bereits vorhandene Mängel oder einen bereits vor dem Einsatz entstandenen Schädlingsbefall (z. B. Fraßschäden, Verunreinigungen) zurückzuführen sind. Die Haftung nach dem Produkthaftungsgesetz bleibt unberührt.'] },
  { title: '§ 9 Widerrufsrecht für Verbraucher', text: ['Verbrauchern steht bei außerhalb von Geschäftsräumen oder im Fernabsatz geschlossenen Verträgen ein gesetzliches Widerrufsrecht von vierzehn Tagen ab Vertragsschluss zu. Der Widerruf kann durch eine eindeutige Erklärung per E-Mail oder Brief erfolgen. Verlangt der Verbraucher ausdrücklich, dass mit den Arbeiten vor Ablauf der Widerrufsfrist begonnen wird (z. B. im Notfall), erlischt das Widerrufsrecht mit vollständiger Erbringung der Leistung; bei Widerruf nach Beginn ist Wertersatz für die bis dahin erbrachten Leistungen zu leisten.'] },
  { title: '§ 10 Leistungsgegenstand und Vermittlungstätigkeit', text: [
    'Wir sind eine Vermittlungsfirma, die Kundenanfragen an qualifizierte Fachbetriebe in Ihrer Nähe weiterleitet. Kammerjäger Bismarck erbringt selbst keine Schädlingsbekämpfungsleistungen; Gegenstand unserer Tätigkeit ist ausschließlich die Vermittlung. Wir prüfen die eingehenden Anfragen und leiten sie schnell und unkompliziert an einen verfügbaren Fachbetrieb weiter, der die gewünschten Arbeiten – insbesondere die Bekämpfung von Insekten, Nagetieren, Bettwanzen, Wespen sowie Notdienstleistungen – ausführt.',
    'Ihr Vertragspartner ist ausschließlich der Fachbetrieb, der die Arbeiten bei Ihnen vor Ort ausführt. Dieser setzt sich direkt mit Ihnen in Verbindung, um den Termin, den Leistungsumfang und alles Weitere zu besprechen. Der Vermittlung liegt kein Vertrag über Schädlingsbekämpfungsleistungen zugrunde. Wir schulden dem Kunden ausschließlich die erfolgreiche Weiterleitung der Anfrage an einen geeigneten Fachbetrieb, nicht die Durchführung der Arbeiten selbst. Ein Anspruch auf die Vermittlung eines bestimmten Betriebs oder auf eine bestimmte Ausführungszeit besteht nicht.',
  ] },
  { title: '§ 11 Schlussbestimmungen', text: ['Änderungen und Ergänzungen dieser AGB bedürfen der Textform. Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein oder werden, so bleibt die Wirksamkeit der übrigen Bestimmungen unberührt; an die Stelle der unwirksamen Bestimmung tritt eine Regelung, die dem wirtschaftlich Gewollten am nächsten kommt. Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gegenüber Verbrauchern gilt diese Rechtswahl nur, soweit der dadurch gewährte Schutz durch zwingende Bestimmungen des Rechts des Staates, in dem der Verbraucher seinen gewöhnlichen Aufenthalt hat, nicht entzogen wird.'] },
];

const AGB = () => (
  <>
    <Helmet>
      <title>Allgemeine Geschäftsbedingungen - Kammerjäger Bismarck</title>
      <meta name="description" content="Allgemeine Geschäftsbedingungen (AGB) von Kammerjäger Bismarck." />
    </Helmet>
    <div className="min-h-screen flex flex-col bg-[#003311]">
      <HartmannNavbar />
      <main className="flex-grow py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-white">Allgemeine Geschäftsbedingungen</h1>
          <p className="text-gray-300 mb-10">
            Kammerjäger Bismarck · Telefon: <a href="tel:+4915888623097" className="text-[#c9a227] hover:underline">015888623097</a> · E-Mail: <a href="mailto:info@kammerjaeger-bismarck.de" className="text-[#c9a227] hover:underline">info@kammerjaeger-bismarck.de</a>
          </p>
          <div className="space-y-8 text-gray-300">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-lg font-semibold mb-3 text-[#c9a227]">{s.title}</h2>
                {s.text.map((t, i) => <p key={i} className="mb-3">{t}</p>)}
              </section>
            ))}
          </div>
        </div>
      </main>
      <HartmannFooter />
      <MobileStickyCTA />
    </div>
  </>
);

export default AGB;
