# Build-Anleitung für Production

## 🎯 Vor dem Build

Stelle sicher, dass du die `package.json` wie folgt angepasst hast:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "postbuild": "react-snap",
    "preview": "vite preview"
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

## 🚀 Build-Prozess

### 1. Dependencies installieren
```bash
npm install
```

### 2. Production Build
```bash
npm run build
```

Das führt aus:
1. TypeScript Compilation (`tsc`)
2. Vite Build (optimiert für Production)
3. **react-snap** Pre-Rendering (via `postbuild` script)

### 3. Build-Output prüfen

```bash
# HTML-Datei anschauen
cat dist/index.html

# Nach Service-Sections suchen
grep -i "section id" dist/index.html

# Schema.org prüfen
grep -i "schema.org" dist/index.html

# Lokaler Test
npm run preview
```

**Was du sehen solltest:**
- ✅ Alle `<section id="wespen">` etc. im HTML
- ✅ H1/H2 Headlines im HTML
- ✅ FAQ-Content im HTML
- ✅ Schema.org LocalBusiness & FAQPage
- ✅ Minimiertes HTML ohne Whitespace

## 📦 Deployment

### Netlify (empfohlen)
```bash
# netlify.toml ist bereits konfiguriert
netlify deploy --prod
```

### Vercel
```bash
vercel --prod
```

### Eigener Server
```bash
# dist/ Ordner auf Server kopieren
scp -r dist/* user@server:/var/www/kammerjaeger-hoffmeyer/
```

## ✅ Nach dem Deployment

### 1. URL-Tests
Teste diese URLs:
- `https://kammerjaeger-hoffmeyer.de`
- `https://kammerjaeger-hoffmeyer.de/#wespen`
- `https://kammerjaeger-hoffmeyer.de/#bettwanzen`
- etc.

### 2. Google Search Console
- URL-Prüfung durchführen
- Indexierung anfordern
- Sitemap einreichen

### 3. PageSpeed Insights
```
https://pagespeed.web.dev/
```
Teste deine Live-URL und prüfe:
- Performance > 90
- SEO > 95
- Best Practices > 90

## 🐛 Troubleshooting

### react-snap hängt beim Build
**Problem:** Puppeteer kann nicht starten

**Lösung:**
```bash
# Zusätzliche Puppeteer Args in package.json
"puppeteerArgs": [
  "--no-sandbox", 
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage"
]
```

### Service-Sections fehlen im HTML
**Problem:** Lazy Loading verhindert Pre-Rendering

**Lösung:** Bereits implementiert! Services sind nicht mehr lazy.

### Build-Größe zu groß
**Problem:** Bundle > 500KB

**Lösung:**
```bash
# Bundle-Analyse
npm run build -- --mode production
npx vite-bundle-visualizer
```

## 📊 Performance-Tipps

### 1. Image-Optimierung
Alle Bilder sollten:
- WebP-Format verwenden
- Komprimiert sein (< 100KB)
- Lazy Loading haben (außer Hero)

### 2. Code-Splitting
```typescript
// Bereits implementiert für:
- Certifications (lazy)
- Reviews (lazy)
- PaymentOptions (lazy)
- Contact (lazy)
- AboutUs (lazy)

// NICHT lazy (für SEO):
- Services (direkt im DOM)
```

### 3. Caching
Netlify `_headers` Datei:
```
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=0, must-revalidate
```

## 🎉 Fertig!

Nach erfolgreichem Build hast du:
- ✅ Pre-gerenderte HTML-Dateien
- ✅ Optimierte Assets (JS, CSS, Images)
- ✅ SEO-optimierte Service-Sections
- ✅ Schema.org Structured Data
- ✅ Mobile-optimierte Performance

**Deine Seite ist jetzt bereit für Google! 🚀**
