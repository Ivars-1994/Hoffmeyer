# AGB-Seite mit dem gelieferten Text

## Was passiert
- Die AGB-Seite bekommt genau den gelieferten Text (§ 1–§ 11), angepasst an unsere Daten:
  - "Rohrreinigung Bismarck" wird zu "Kammerjäger Bismarck"
  - Telefon 0178 1196025, E-Mail info@kammerjaeger-bismarck.de
  - Fachbegriffe aus der Rohrreinigung (Rohr-/Kanal-/Abflussreinigung, Verstopfung, Leitungen, Rohrbrüche) werden durch Schädlingsbekämpfung ersetzt (Insekten, Nagetiere, Bettwanzen, Wespen usw.), sonst bleibt der Wortlaut gleich – auch § 10 Vermittlungstätigkeit.
- Design wie Impressum: dunkles Grün, weiße Schrift, Gold-Überschriften, gleiche Kopf- und Fußleiste, keine WhatsApp-Buttons mehr.
- Ganz unten auf jeder Seite (Fußleiste) steht der Link "AGB" neben Impressum und Datenschutz – auch auf der Startseite und den statischen Stadtseiten, wo er fehlt.

## Technische Details
- `src/pages/AGB.tsx` neu schreiben nach Muster von `Impressum.tsx` (HartmannNavbar/Footer, MobileStickyCTA).
- AGB-Link in `HartmannFooter.tsx` und in den Footern der statischen HTML-Seiten (public/**/index.html, static-home.html) ergänzen, falls nicht vorhanden; Ziel `/agb`.
- Prüfen, dass `/agb` in Netlify nicht von statischen Regeln überschrieben wird; `npm test` laufen lassen.
