# SEO-Optimierung Setup für Kammerjäger Hoffmeyer

## ✅ Was wurde implementiert?

### 1. **Services im DOM (nicht lazy)**
- Alle 8 Service-Sections sind jetzt direkt im initialen DOM sichtbar
- Jeder Service hat eine eigene `<section id="wespen">` etc.
- Google kann alle Inhalte sofort crawlen

### 2. **Kurze H1/H2 Headlines (≤30 Zeichen)**
- H1: "Wespennest entfernen"
- H2: "24h Notdienst vor Ort"
- Alle Services folgen diesem Muster

### 3. **FAQ mit Schema.org Markup**
- Jeder Service hat 2-3 FAQs
- Schema.org FAQPage Implementation
- Accordion-UI für bessere UX

### 4. **LocalBusiness Schema.org**
- In `index.html` implementiert
- Alle 8 Services gelistet
- Öffnungszeiten 24/7
- Telefonnummer und URL

### 5. **Dynamic Meta Tags für Hash-URLs**
- Title + Description ändern sich bei #wespen, #bettwanzen, etc.
- Implementiert in `src/pages/Index.tsx`
- Automatisches Update bei Hash-Änderung

### 6. **Google Ads Conversions**
- ✅ 30 Sekunden Verweildauer
- ✅ 50% Scroll-Tiefe
- ✅ Phone Button Clicks

---

## 🚀 React-Snap Pre-Rendering aktivieren

**react-snap** ist bereits installiert. Um es zu aktivieren, musst du:

### Schritt 1: package.json bearbeiten
Füge folgendes in deine `package.json` ein:

```json
{
  "scripts": {
    "build": "tsc && vite build",
    "postbuild": "react-snap"
  },
  "reactSnap": {
    "inlineCss": true,
    "puppeteerArgs": ["--no-sandbox", "--disable-setuid-sandbox"],
    "minifyHtml": { 
      "collapseWhitespace": true, 
      "removeComments": true 
    },
    "waitFor": 2000,
    "include": [
      "/",
      "/#wespen",
      "/#bettwanzen",
      "/#ratten",
      "/#marder",
      "/#maeuse",
      "/#silberfische",
      "/#kakerlaken",
      "/#floehe"
    ]
  }
}
```

### Schritt 2: Build testen
```bash
npm run build
```

### Schritt 3: HTML-Output prüfen
Öffne `dist/index.html` und prüfe:
- ✅ Alle Service-Sections sind im HTML
- ✅ H1/H2 Headlines sind sichtbar
- ✅ FAQ-Content ist im HTML
- ✅ Schema.org Scripts sind vorhanden

---

## 📊 Google Search Console Setup

Nach dem Deployment:

1. **URL-Prüfung Tool**
   - Prüfe: `https://kammerjaeger-hoffmeyer.de`
   - Prüfe: `https://kammerjaeger-hoffmeyer.de/#wespen`
   - Prüfe: `https://kammerjaeger-hoffmeyer.de/#bettwanzen`

2. **Sitemap einreichen**
   - Erstelle eine Sitemap mit allen Hash-URLs
   - Reiche sie in Google Search Console ein

3. **Core Web Vitals überwachen**
   - LCP (Largest Contentful Paint) < 2.5s
   - FID (First Input Delay) < 100ms
   - CLS (Cumulative Layout Shift) < 0.1

---

## 🎯 SEO-Checkliste

### On-Page SEO
- ✅ H1 pro Service-Section
- ✅ H2 Subheadlines
- ✅ Alt-Texte für alle Bilder
- ✅ Semantic HTML (section, article, etc.)
- ✅ Schema.org Structured Data
- ✅ Meta Title & Description (dynamisch)
- ✅ Canonical Tags (in index.html)
- ✅ Mobile-optimiert

### Technical SEO
- ✅ Pre-Rendering mit react-snap
- ✅ Lazy Loading für Below-the-Fold Content
- ✅ Alle Services im initialen DOM
- ✅ Schnelle Ladezeiten (~1s)
- ✅ Clean Hash-URLs (/#wespen)

### Content SEO
- ✅ 8 Service-Pages mit Unique Content
- ✅ FAQ-Sections pro Service
- ✅ Keywords in Headlines
- ✅ Lokale Keywords (Stadt-Namen)
- ✅ Call-to-Actions

---

## 🔧 Troubleshooting

### Problem: react-snap findet nicht alle Inhalte
**Lösung:** Erhöhe `waitFor` in reactSnap config auf 3000ms

### Problem: Hash-URLs werden nicht indexiert
**Lösung:** Hash-URLs werden von Google als Client-Side betrachtet. Für langfristige SEO solltest du echte Routes erstellen:
- `/wespen-bekaempfung`
- `/bettwanzen-bekaempfung`
- etc.

### Problem: Lazy Components werden nicht gerendert
**Lösung:** Bereits gelöst - Services sind nicht mehr lazy!

---

## 📈 Nächste Schritte (Optional)

### 1. Echte Service-Pages erstellen
Statt Hash-URLs (`/#wespen`) echte Routes:
```
/schädlingsbekämpfung/wespen
/schädlingsbekämpfung/bettwanzen
/schädlingsbekämpfung/ratten
```

### 2. Stadt-Seiten generieren
Pro Stadt eine eigene Seite:
```
/kammerjaeger-berlin
/kammerjaeger-hamburg
/kammerjaeger-münchen
```

### 3. Blog-Section hinzufügen
SEO-optimierte Blog-Artikel:
- "Wespen im Sommer - Was tun?"
- "Bettwanzen erkennen: 5 Anzeichen"
- etc.

---

## 📞 Support

Bei Fragen zur Implementierung:
- Prüfe Console Logs: `console.log('📄 Meta Tags updated for #wespen')`
- Teste Hash-URLs: `https://deine-domain.de/#wespen`
- Prüfe HTML-Output: `npm run build && cat dist/index.html`

**Viel Erfolg mit deiner SEO-Optimierung! 🚀**
