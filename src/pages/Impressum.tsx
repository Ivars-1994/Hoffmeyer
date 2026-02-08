
import React from 'react';
import { Helmet } from 'react-helmet-async';
import HartmannNavbar from '@/components/hartmann/HartmannNavbar';
import HartmannFooter from '@/components/hartmann/HartmannFooter';
import MobileStickyCTA from '@/components/ui/MobileStickyCTA';

const Impressum = () => {
  return (
    <>
      <Helmet>
        <title>Impressum - Kammerjäger Hoffmeyer</title>
        <meta name="description" content="Impressum und rechtliche Informationen zu Kammerjäger Hoffmeyer." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#003311]">
        <HartmannNavbar />
        
        <main className="flex-grow py-16 px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-10 text-white">Impressum</h1>
            
            <div className="space-y-8 text-gray-300">
              <section>
                <h2 className="text-lg font-semibold mb-3 text-[#c9a227]">Angaben gemäß § 5 TMG</h2>
                <p>Kammerjäger Hoffmeyer</p>
                <p>Hauptstraße 26–28</p>
                <p>Deutschland</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3 text-[#c9a227]">Kontakt</h2>
                <p>Telefon: <a href="tel:+4915792453526" className="text-[#c9a227] hover:underline">+49 1579 2453 526</a></p>
                <p>E-Mail: <a href="mailto:info@sbk-hoffmeyer.de" className="text-[#c9a227] hover:underline">info@sbk-hoffmeyer.de</a></p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3 text-[#c9a227]">Haftungsausschluss</h2>
                <p>Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3 text-[#c9a227]">Online-Streitbeilegung</h2>
                <p>
                  <a 
                    href="https://ec.europa.eu/consumers/odr/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#c9a227] hover:underline"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                </p>
              </section>
            </div>
          </div>
        </main>
        
        <HartmannFooter />
        <MobileStickyCTA />
      </div>
    </>
  );
};

export default Impressum;
