# Vergleich Handy-Ansicht: Bismarck vs. Kröger

## Ergebnis
Insgesamt ist unsere Seite gleichauf oder etwas stärker: Sie hat die feste Anruf-Leiste unten, mehr Bewertungen (850+ statt 127), lenkt nicht mit einem Formular ab, und auf Kröger ist der Inhalt rechts abgeschnitten (seitliches Verrutschen). Kröger gewinnt aber beim ersten Eindruck: Die Überschrift macht ein klares Versprechen („in Ihrer Nähe? Wir sind in 30 Minuten da.“), und der Anruf-Button ist auffälliger und erklärt sich selbst („JETZT KOSTENLOS ANRUFEN“ plus Nummer).

| Punkt | Kröger | Bismarck |
|---|---|---|
| Überschrift | Nutzen + Ort + Tempo | allgemein („des Vertrauens“) |
| Anruf-Button oben | groß, mit Text + Nummer | nur Nummer, weiter unten |
| Feste Anruf-Leiste | nein | ja, aber mit kaputtem Zeichen vor dem Text |
| Bewertungen | 127 | 850+ |
| Formular | ja (lenkt ab) | nein |
| Darstellung | rechts abgeschnitten | sauber |
| Oben eingeblendete Leiste | „Jetzt anrufen“ | „kostenlose Anfahrt“ (kein Link) |

## Änderungen (Startseite React + alle statischen Kopien)
1. Überschrift: „Kammerjäger in [Stadt] – in 30–60 Min. bei Ihnen“ (Stadt aus der bestehenden Stadterkennung, sonst „in Ihrer Nähe“).
2. Anruf-Button weiter nach oben, direkt unter die Überschrift, mit zwei Zeilen: „JETZT KOSTENLOS ANRUFEN“ / „0178 1196025“.
3. Kaputtes Zeichen in der festen Anruf-Leiste unten entfernen und durch ein Telefon-Symbol ersetzen.
4. Die goldene Leiste „Heute: kostenlose Anfahrt“ wird antippbar und ruft an.
5. Den langen Einleitungstext kürzen und die doppelte Bewertungsangabe zusammenfassen, damit der Button auf dem Handy ohne Scrollen sichtbar ist.

Farben, Nummer und Tracking bleiben, wie sie sind. Es kommt weder ein Formular noch ein Countdown hinzu.

## Technische Details
- Betroffen sind die Startseite (React) sowie index.html, public/index.html und public/static-home.html.
- Die Anruf-Links behalten tel:+491781196025 und die bestehenden Attribute; anschließend laufen npm test und eine Prüfung in Handy-Ansicht mit 390 px.
