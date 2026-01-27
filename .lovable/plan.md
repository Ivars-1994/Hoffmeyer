
Ziel: Domain **kammerjaeger-hoffmeyer.de** wieder erreichbar machen (DNS/Registry-Problem, kein Code-Problem)

Warum es trotz “nichts geändert” plötzlich nicht mehr geht
- Deine Netlify-DNS-Zone sieht korrekt aus (A-Record + www CNAME).
- Entscheidend ist aber: Ob die Domain bei der **.de-Registry (DENIC)** überhaupt noch als registriert/delegiert existiert.
- Aktuell ist sie dort offenbar “weg”: Öffentliche Resolver bekommen **NXDOMAIN** (Domain existiert laut Registry nicht).
  - Ich habe das gerade über Google DNS geprüft:
    - A/NS/CNAME Abfragen liefern **Status: 3 (NXDOMAIN)** und kommen direkt von DENIC-Nameservern (z.B. f.nic.de).
  - Das bedeutet: Selbst perfekte DNS-Records in Netlify helfen nicht, wenn die Domain bei DENIC nicht mehr im Zoneneintrag existiert.

Was das konkret heißt
- Netlify zeigt dir “DNS records”, aber öffentlich wird nichts auflösbar sein, wenn:
  1) die Domain **nicht mehr registriert** ist (z.B. versehentlich gelöscht/expired/renewal fehlgeschlagen), oder
  2) Netlify-Registrar/Registry ein **Provisioning-/Sync-Problem** hat (Domain in Netlify “grün”, bei DENIC aber nicht vorhanden).

Vorgehen (in der Reihenfolge, schnellste Klärung zuerst)

1) Extern verifizieren, ob die Domain bei DENIC existiert (2 Minuten)
- Öffne DENIC WHOIS (Web):
  - https://www.denic.de/service/tools/whois-service/
- Suche: kammerjaeger-hoffmeyer.de
- Ergebnis interpretieren:
  - Wenn dort steht “nicht registriert / free / no entries found” → Domain ist bei der Registry wirklich nicht (mehr) vorhanden.
  - Wenn dort ein Eintrag mit Nameservern steht → dann wäre es kein NXDOMAIN-Problem, sondern evtl. DNSSEC/Nameserver-Erreichbarkeit (würde eher SERVFAIL geben, nicht NXDOMAIN).

2) In Netlify prüfen: Ist es wirklich “Registrar = Netlify” und ist die Domain wirklich registriert (nicht nur eine DNS-Zone)?
- In Netlify gibt es oft zwei Dinge, die man verwechseln kann:
  - (A) “DNS Zone verwalten” (Records editieren)
  - (B) “Domain registriert bei Netlify” (echte Registrierung inkl. Ablaufdatum, Auto-Renew, Billing)
- Prüfe in Netlify in deinem Team:
  - Domain Registration/Registrar Details (Ablaufdatum, Auto-Renew aktiv, Payment-Method ok)
  - Ob die Domain in genau dem Team/Account liegt, den du gerade offen hast

3) Audit Log in Netlify checken (sehr wichtig, weil du sagst “keiner hat was geändert”)
- Links hast du “Audit log” im Menü (sieht man in deinem Screenshot).
- Filtere auf “Domain / DNS / Registrar” und Zeitraum “gestern/heute”.
- Wenn dort Events stehen wie “domain removed”, “nameserver changed”, “renewal failed” o.ä. → Ursache ist klar und wir reagieren gezielt.

4) Wenn DENIC sagt “Domain nicht registriert”, aber Netlify sagt “aktiv & bezahlt” → Netlify Support ist zwingend
Das ist dann ein Registrar/Registry-Provisioning-Thema. Dann muss Netlify die Registrierung bei DENIC wiederherstellen.
- Support-Ticket-Inhalt (copy/paste Vorlage):
  - Betreff: “kammerjaeger-hoffmeyer.de resolves NXDOMAIN (DENIC), was reachable yesterday”
  - Text:
    - “Domain was working until yesterday. Today it returns NXDOMAIN from DENIC via public resolvers.”
    - “Netlify DNS zone exists and contains A record (75.2.60.5) and CNAME for www.”
    - “Please verify the .de registry (DENIC) registration/delegation for kammerjaeger-hoffmeyer.de and restore it.”
    - “I can provide screenshots of Netlify DNS zone and the DENIC WHOIS result.”
- Warum Support: Nur der Registrar kann bei .de die Registrierung/Delegation wieder “einschalten”, wenn sie aus der Registry raus ist.

5) Übergangslösung (damit du nicht offline bist)
- Nutze vorübergehend eine erreichbare URL:
  - deine Netlify-Subdomain: nimble-licorice-156202.netlify.app
  - oder deine Lovable-Published-URL: https://hoffmeyer.lovable.app
- Optional: Wenn du Ads/Google Business/Verzeichnisse hast, dort kurzfristig die Ziel-URL anpassen (oder pausieren), bis die Domain wieder live ist.

6) Nach Wiederherstellung: Entscheidung, wohin die Domain zeigen soll (Netlify oder Lovable)
- Wenn du final bei Lovable hosten willst:
  - In Lovable → Project Settings → Domains → Domain hinzufügen
  - DNS:
    - A @ → 185.158.133.1
    - A www → 185.158.133.1
    - TXT _lovable → (Lovable Verification String)
- Wenn du bei Netlify bleiben willst:
  - Deine aktuellen Records (A 75.2.60.5 + www CNAME) sind grundsätzlich plausibel,
  - aber sie funktionieren erst, wenn die Domain bei DENIC wieder existiert.

Erfolgskontrolle (10 Minuten nach Fix, dann ggf. 1–6h warten)
- Prüfe erneut bei:
  - https://dns.google/resolve?name=kammerjaeger-hoffmeyer.de&type=A
  - https://dnschecker.org (A + NS)
- Sobald A/NS nicht mehr NXDOMAIN ist, kommt die Website wieder.

Risiko/Edge Cases (kurz)
- Negative DNS-Caches: Selbst nach Fix kann es bei manchen Providern noch 1–2 Stunden NXDOMAIN zeigen. Google DNS sollte aber relativ schnell korrekt werden.
- .de-Registry/Registrar-Sync: Wenn Netlify intern “grün” ist, aber DENIC nicht, ist es fast immer ein Registrar-Provisioning-Thema.

Wenn du willst, kann ich als nächstes den Support-Text exakt für Netlify auf Deutsch/Englisch formulieren (mit den richtigen Beweisen/Links), und wir entscheiden, ob die Domain später direkt auf Lovable umziehen soll (einfacher, weniger “zweites Deployment”).
