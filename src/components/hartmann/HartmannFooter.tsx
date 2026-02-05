import { Phone, Mail } from 'lucide-react';

const HartmannFooter = () => {
  return (
    <footer className="bg-[#003311] border-t border-[#004d1a] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 relative">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <circle cx="20" cy="20" r="18" fill="none" stroke="#c9a227" strokeWidth="2"/>
                  <path d="M12 12 L20 8 L28 12 L28 28 L20 32 L12 28 Z" fill="none" stroke="#c9a227" strokeWidth="1.5"/>
                  <path d="M20 14 L20 26" stroke="#c9a227" strokeWidth="1.5"/>
                  <path d="M15 18 L25 18" stroke="#c9a227" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className="text-white">
                <div className="font-bold text-lg tracking-wider">HARTMANN</div>
                <div className="text-xs text-gray-400">Kammerjäger Seit 98'</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Professionelle Schädlingsbekämpfung seit über 20 Jahren.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Kontakt</h4>
            <div className="space-y-3">
              <a 
                href="tel:015792305928" 
                className="flex items-center gap-2 text-gray-400 hover:text-[#c9a227] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>01579 2305 928</span>
              </a>
              <a 
                href="mailto:info@kammerjaeger-hartmann.de" 
                className="flex items-center gap-2 text-gray-400 hover:text-[#c9a227] transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>info@kammerjaeger-hartmann.de</span>
              </a>
            </div>
          </div>

          {/* Guarantee */}
          <div>
            <h4 className="text-white font-bold mb-4">Unsere Garantie</h4>
            <p className="text-gray-400 text-sm">
              100% Zufriedenheitsgarantie auf alle unsere Dienstleistungen. 
              Schnelle Hilfe innerhalb von 30-60 Minuten.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-[#006622]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Kammerjäger Hartmann. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-6">
              <a href="/impressum" className="text-gray-500 hover:text-[#c9a227] text-sm transition-colors">
                Impressum
              </a>
              <a href="/datenschutz" className="text-gray-500 hover:text-[#c9a227] text-sm transition-colors">
                Datenschutz
              </a>
              <a href="/agb" className="text-gray-500 hover:text-[#c9a227] text-sm transition-colors">
                AGB
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HartmannFooter;
