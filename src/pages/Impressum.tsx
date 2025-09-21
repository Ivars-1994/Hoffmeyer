
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PhoneButton from '../components/ui/PhoneButton';
import WhatsAppButton from '../components/ui/WhatsAppButton';

const PHONE_NUMBER = "+4915212124199";

const Impressum = () => {

  return (
    <>
      <Helmet>
        <title>Impressum - Kammerjäger Hoffmeyer</title>
        <meta name="description" content="Impressum und rechtliche Informationen zu Kammerjäger Hoffmeyer." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-8 text-[#1A1F2C]">Impressum</h1>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-[#1A1F2C]">Angaben gemäß § 5 TMG</h2>
              <div className="space-y-2">
                <p>Kammerjäger Hoffmeyer</p>
                <p>Hauptstraße 26–36</p>
                <p>Deutschland</p>
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-[#1A1F2C]">Kontakt</h2>
              <div className="space-y-2">
                <p>Telefon: <a href="tel:+4915212124199" className="call-link text-[#9b87f5] hover:underline">+49 152 1212 4199</a></p>
                <p>E-Mail: <a href="mailto:info@kammerjaegerhoffmeyer.de" className="text-[#9b87f5] hover:underline">info@kammerjaegerhoffmeyer.de</a></p>
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-[#1A1F2C]">Haftungsausschluss</h2>
              <p className="text-gray-700">
                Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. 
                Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#1A1F2C]">Plattform der EU-Kommission zur Online-Streitbeilegung</h2>
              <p className="text-gray-700">
                <a 
                  href="https://ec.europa.eu/consumers/odr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#9b87f5] hover:underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
            </section>
          </div>
        </main>
        
        <Footer />
        
        <PhoneButton phoneNumber={PHONE_NUMBER} variant="fixed" />
        <WhatsAppButton phoneNumber={PHONE_NUMBER} variant="fixed" />
      </div>
    </>
  );
};

export default Impressum;
