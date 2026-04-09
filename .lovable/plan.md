

## PageSpeed Optimierung: von 74 auf 90+

### Problem

Mobile PageSpeed ist 74 (FCP 3.6s, LCP 4.9s). Hauptursachen:

1. **GTM laedt synchron im `<head>`** (Zeile 27-31) -- blockiert First Paint komplett
2. **Google Ads gtag laedt synchron im `<head>`** (Zeile 63) -- weiterer Render-Blocker
3. **Unnoetige preconnect-Links** zu Google Fonts (Zeile 39-40) -- Projekt nutzt keine Google Fonts
4. **112 console.log-Aufrufe** in 8 Dateien -- unnoetige Arbeit im Production-Build
5. **backdrop-filter/blur** an 6+ Stellen in CSS -- teuer auf Mobile-GPUs
6. **Kein Code-Splitting** fuer Seiten -- alle Routes werden sofort geladen

---

### Aenderungen

#### Datei 1: `index.html`

**Alle Third-Party-Scripts aus dem `<head>` entfernen und verzoegert laden:**

- GTM-Script (Zeile 27-31) entfernen, stattdessen per `setTimeout(fn, 3000)` im `<body>` laden
- Google Ads gtag (Zeile 63) entfernen, ebenfalls verzoegert laden
- FingerprintJS-Block (Zeile 86-121) in denselben verzoegerten Block verschieben
- preconnect zu fonts.googleapis.com und fonts.gstatic.com entfernen (Zeile 39-40)
- dns-prefetch zu google-analytics.com entfernen (Zeile 42, nicht genutzt)
- Favicon von externer URL auf lokale Datei umstellen (Zeile 35)
- Alle Scripts in einen einzigen `setTimeout`-Block nach 3 Sekunden zusammenfassen

**Ergebnis:** `<head>` enthaelt nur Meta-Tags und das App-Bundle -- kein einziges Third-Party-Script blockiert den Render.

#### Datei 2: `src/index.css`

- `backdrop-filter: blur(...)` durch einfache `background` mit hoeherem Opacity ersetzen (6 Stellen)
- Konkret: `.glass-card`, `.glass-card-strong`, `.glass-navbar`, `.glass-footer`, `.glass-card-hover`, `.glass-btn` -- jeweils `backdrop-filter` entfernen und `background` auf volle Opacity setzen

#### Datei 3: `src/main.tsx`

- `reportWebVitals`-Funktion und `handleRouteChange` console.log entfernen (Zeile 7-43)
- Vereinfachen auf: Root erstellen, App rendern

#### Datei 4: `src/components/home/HeroContent.tsx`

- console.log entfernen (Zeile 18)

#### Datei 5: `src/components/home/Hero.tsx`

- console.log entfernen (Zeile 16)

#### Datei 6: `src/components/home/Reviews.tsx`

- Alle console.log-Aufrufe entfernen

#### Datei 7: `src/App.tsx`

- Seiten per `React.lazy()` laden (Impressum, Datenschutz, AGB, CityPage, LandingPageHartmann, NotFound)
- `Suspense` wrapper mit leerem Fallback hinzufuegen
- Nur `Index` bleibt direkt importiert (Hauptseite)

---

### Erwartetes Ergebnis

- FCP verbessert sich um ~1-2s (keine Render-Blocker mehr)
- LCP verbessert sich durch weniger GPU-Last (kein backdrop-filter)
- Kleineres initiales Bundle durch Code-Splitting
- Sauberere Console ohne Debug-Logs

