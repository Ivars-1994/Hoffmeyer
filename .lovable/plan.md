
# Plan: Hartmann Landing Page 1:1 in Lovable nachbauen

## Ziel
Eine pixelgenaue Kopie der WordPress-Seite `https://kammerjaeger-hartmann.de/lp/` als React-Komponente unter der Route `/lp/` erstellen.

## Design-Analyse der Hartmann-Seite

### Farbschema
- Hintergrund: Dunkelgrün (#004d00 / #003d00)
- Akzentfarbe: Gold/Orange für Buttons und Highlights
- Text: Weiß auf dunklem Hintergrund

### Sektionen (in Reihenfolge)
1. **Navbar** - Logo links, Navigation mittig, Telefon-Button rechts (grüner Rahmen)
2. **Hero** - Links: Tagline, H1, Text, Sterne-Bewertung, 2 CTA-Buttons, 4 USP-Icons | Rechts: 2x2 Bildgrid mit gerundeten Ecken
3. **Service-Banner** - "Unser einwandfreier Service" mit Bild rechts
4. **Testimonials** - Horizontaler Slider mit Bewertungskarten (Name, Sterne, Plattform, Text)
5. **Leistungen** - Grid mit Service-Karten (Notdienst, Ratten, Wespen, Mäuse, Bettwanzen, Schaben, Marder, Ameisen, Käfer)
6. **Ablauf** - 3 Schritte (Kontakt, Termin, Bekämpfung)
7. **Zertifizierungen** - Bild mit Logos
8. **Kontakt** - Formular links, Google Maps rechts
9. **Footer** - Kontaktinfos, Garantie, Copyright

## Technische Umsetzung

### Neue Dateien
| Datei | Zweck |
|-------|-------|
| `src/pages/LandingPageHartmann.tsx` | Hauptseite mit allen Sektionen |
| `src/components/hartmann/HartmannNavbar.tsx` | Grüne Navbar mit Hartmann-Logo |
| `src/components/hartmann/HartmannHero.tsx` | Hero mit 2x2 Grid und USPs |
| `src/components/hartmann/HartmannTestimonials.tsx` | Bewertungs-Slider |
| `src/components/hartmann/HartmannServices.tsx` | Service-Karten Grid |
| `src/components/hartmann/HartmannProcess.tsx` | 3-Schritte Ablauf |
| `src/components/hartmann/HartmannContact.tsx` | Formular + Map |
| `src/components/hartmann/HartmannFooter.tsx` | Footer |

### Routing
Route `/lp/` wird in `App.tsx` hinzugefügt und zeigt `LandingPageHartmann`

### Styling-Ansatz
- Eigene Tailwind-Klassen für Hartmann-Farbschema (dunkelgrün, gold)
- CSS-Variablen für konsistente Farben
- Responsive Design wie Original (Mobile-First)

### Assets
- Hartmann-Logo (muss hochgeladen werden oder als SVG nachgebaut)
- Bilder aus WordPress (werden als URLs referenziert oder durch Platzhalter ersetzt)
- Icons (Lucide React Icons)

## Wichtige Details

### Telefonnummer
Die Hartmann-Seite verwendet: **01579 2305 928**
(Wird 1:1 übernommen wie gewünscht)

### Testimonials
7 Bewertungen mit Namen, Plattform (Google, MyHammer, Trustpilot) und Text

### USP-Icons
- Uhr-Icon: 30-60 Min Reaktionszeit
- Checkmark: Garantie 100% Zufrieden
- Schild: Festpreise Transparent
- 24-Badge: 24/7 Hotline

## Zeitaufwand
- Geschätzt 4-6 Nachrichten für vollständige Implementierung
- Hero + Navbar zuerst (kritisch für erste Eindruck)
- Dann Sektionen von oben nach unten

## Offene Punkte

### Bilder
Die WordPress-Bilder können direkt verlinkt werden, aber für Produktion sollten eigene Bilder verwendet werden. Soll ich:
- Temporär die WordPress-URLs nutzen?
- Platzhalter-Bilder verwenden die du später ersetzt?

### Logo
Das Hartmann-Logo muss entweder:
- Als Datei hochgeladen werden
- Als SVG nachgebaut werden

### Kontaktformular
Soll das Formular funktional sein (E-Mail senden) oder nur als Design-Demo?
