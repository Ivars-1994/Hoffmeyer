export interface ServiceConfig {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  schemaServiceType: string;
}

export const serviceConfigs: Record<string, ServiceConfig> = {
  wespen: {
    slug: "wespen",
    title: "Wespenbekämpfung",
    h1: "Wespennest entfernen",
    metaTitle: "Wespenbekämpfung & Wespennest entfernen",
    metaDescription: "Professionelle Wespenbekämpfung & Wespennest entfernen. Sofortige Hilfe bei Wespen. IHK-zertifiziert. ☎ +49 1521 2124199",
    keywords: ["wespenbekämpfung", "wespennest entfernen", "wespen entfernen", "hornissennest entfernen"],
    schemaServiceType: "Wespenbekämpfung"
  },
  ratten: {
    slug: "ratten",
    title: "Rattenbekämpfung",
    h1: "Ratten bekämpfen",
    metaTitle: "Rattenbekämpfung – Ratten im Garten bekämpfen",
    metaDescription: "Ratten bekämpfen im Garten & Haus. Professionelle Rattenbekämpfung. Ratten vertreiben & loswerden. ☎ +49 1521 2124199",
    keywords: ["ratten bekämpfen", "ratten im garten", "rattenbekämpfung", "ratten vertreiben", "ratten loswerden"],
    schemaServiceType: "Rattenbekämpfung"
  },
  marder: {
    slug: "marder",
    title: "Marderabwehr",
    h1: "Marder bekämpfen",
    metaTitle: "Marderabwehr – Marder im Dachboden vertreiben",
    metaDescription: "Marder bekämpfen & vertreiben. Professionelle Marderabwehr für Dachboden & Auto. Marder loswerden. ☎ +49 1521 2124199",
    keywords: ["marderabwehr", "marder bekämpfen", "marder im dachboden", "marder vertreiben", "marder loswerden"],
    schemaServiceType: "Marderabwehr"
  },
  bettwanzen: {
    slug: "bettwanzen",
    title: "Bettwanzen bekämpfen",
    h1: "Bettwanzen loswerden",
    metaTitle: "Bettwanzen bekämpfen & loswerden – Profi-Hilfe",
    metaDescription: "Bettwanzen bekämpfen, entfernen & loswerden. Professionelle Bettwanzenbekämpfung. Diskret & effektiv. ☎ +49 1521 2124199",
    keywords: ["bettwanzen bekämpfen", "bettwanzen loswerden", "bettwanzen entfernen", "bettwanzen vertreiben"],
    schemaServiceType: "Bettwanzenbekämpfung"
  },
  kakerlaken: {
    slug: "kakerlaken",
    title: "Kakerlaken bekämpfen",
    h1: "Kakerlaken & Schaben bekämpfen",
    metaTitle: "Kakerlaken bekämpfen – Schädlingsbekämpfung",
    metaDescription: "Kakerlaken & Schaben bekämpfen. Professionelle Schabenbekämpfung. Schnelle Hilfe. ☎ +49 1521 2124199",
    keywords: ["kakerlaken bekämpfen", "schaben bekämpfen", "schädlingsbekämpfung"],
    schemaServiceType: "Kakerlakenbekämpfung"
  },
  ameisen: {
    slug: "ameisen",
    title: "Ameisen bekämpfen",
    h1: "Ameisen & Flugameisen loswerden",
    metaTitle: "Ameisen bekämpfen – Ameisen vertreiben & loswerden",
    metaDescription: "Ameisen vertreiben & bekämpfen. Flugameisen loswerden. Professionelle Ameisenbekämpfung. ☎ +49 1521 2124199",
    keywords: ["ameisen vertreiben", "ameisen loswerden", "flugameisen loswerden"],
    schemaServiceType: "Ameisenbekämpfung"
  },
  silberfische: {
    slug: "silberfische",
    title: "Silberfische bekämpfen",
    h1: "Silberfische bekämpfen",
    metaTitle: "Silberfische bekämpfen – Professionelle Hilfe",
    metaDescription: "Silberfische bekämpfen. Professionelle Schädlingsbekämpfung gegen Silberfischchen. ☎ +49 1521 2124199",
    keywords: ["silberfische bekämpfen"],
    schemaServiceType: "Silberfischbekämpfung"
  },
  floehe: {
    slug: "floehe",
    title: "Flöhe bekämpfen",
    h1: "Flöhe bekämpfen",
    metaTitle: "Flöhe bekämpfen – Professionelle Flohbekämpfung",
    metaDescription: "Flöhe bekämpfen. Professionelle Hilfe gegen Flohbefall. Schnell & zuverlässig. ☎ +49 1521 2124199",
    keywords: ["flöhe bekämpfen"],
    schemaServiceType: "Flohbekämpfung"
  },
  maeuse: {
    slug: "maeuse",
    title: "Mäuse bekämpfen",
    h1: "Mäuse bekämpfen & vertreiben",
    metaTitle: "Mäuse bekämpfen – Mäuse vertreiben",
    metaDescription: "Mäuse bekämpfen & vertreiben. Professionelle Mäusebekämpfung für Haus & Garten. ☎ +49 1521 2124199",
    keywords: ["mäuse bekämpfen", "mäuse vertreiben"],
    schemaServiceType: "Mäusebekämpfung"
  }
};

export const getServiceConfig = (slug: string): ServiceConfig | null => {
  return serviceConfigs[slug] || null;
};
