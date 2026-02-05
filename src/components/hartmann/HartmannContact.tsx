import { useState } from 'react';
import { Phone, Mail } from 'lucide-react';

const HartmannContact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  };

  return (
    <section id="kontakt" className="bg-[#003d00] py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Kontaktieren Sie uns über unser Formular
          </h2>
          <p className="text-[#c5a54e]">Wir melden uns innerhalb von 30 Minuten</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-[#002800] border border-[#005500] rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-[#003d00] border border-[#005500] rounded-lg px-4 py-3 text-white focus:border-[#c5a54e] focus:outline-none"
                    placeholder="Max"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Nachname</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-[#003d00] border border-[#005500] rounded-lg px-4 py-3 text-white focus:border-[#c5a54e] focus:outline-none"
                    placeholder="Mustermann"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Telefonnummer</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#003d00] border border-[#005500] rounded-lg px-4 py-3 text-white focus:border-[#c5a54e] focus:outline-none"
                  placeholder="+49 123 456789"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">E-Mail</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#003d00] border border-[#005500] rounded-lg px-4 py-3 text-white focus:border-[#c5a54e] focus:outline-none"
                  placeholder="max@beispiel.de"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Nachricht</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-[#003d00] border border-[#005500] rounded-lg px-4 py-3 text-white focus:border-[#c5a54e] focus:outline-none resize-none"
                  placeholder="Beschreiben Sie Ihr Anliegen..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#c5a54e] text-[#003d00] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#d4b45e] transition-colors"
              >
                Senden
              </button>
            </form>
          </div>

          {/* Map + Contact Info */}
          <div className="space-y-6">
            {/* Map Placeholder */}
            <div className="bg-[#002800] border border-[#005500] rounded-2xl h-64 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <p>Google Maps</p>
                <p className="text-sm">Standort-Karte</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-[#002800] border border-[#005500] rounded-2xl p-6 space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">Kontakt</h3>
              <a 
                href="tel:015792305928" 
                className="flex items-center gap-3 text-gray-300 hover:text-[#c5a54e] transition-colors"
              >
                <Phone className="w-5 h-5 text-[#c5a54e]" />
                <span>01579 2305 928</span>
              </a>
              <a 
                href="mailto:info@kammerjaeger-hartmann.de" 
                className="flex items-center gap-3 text-gray-300 hover:text-[#c5a54e] transition-colors"
              >
                <Mail className="w-5 h-5 text-[#c5a54e]" />
                <span>info@kammerjaeger-hartmann.de</span>
              </a>
            </div>

            {/* Guarantee */}
            <div className="bg-[#002800] border border-[#c5a54e] rounded-2xl p-6">
              <h3 className="text-xl font-bold text-[#c5a54e] mb-2">Garantie</h3>
              <p className="text-gray-300">
                100% Zufriedenheitsgarantie auf alle unsere Dienstleistungen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HartmannContact;
