import { Phone, Clock, CheckCircle, Shield, Headphones, Star } from 'lucide-react';

const HartmannHero = () => {
  return (
    <section className="bg-[#003d00] py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="text-[#c5a54e] italic text-lg mb-4">
              Schädlingsbekämpfung Seit 1998
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Kammerjäger<br />Ihrer Stadt
            </h1>
            <p className="text-gray-200 text-lg mb-6 leading-relaxed">
              Wenn Sie einen Schädlingsbefall haben, ist Kammerjäger Hartmann Ihr Partner! 
              Wir helfen Ihnen sofort bei jedem Schädlingsbefall weiter. Rufen Sie uns jetzt 
              an oder senden Sie eine Anfrage.
            </p>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#c5a54e] fill-[#c5a54e]" />
                ))}
              </div>
              <span className="text-white">4.7 aus 500+ Bewertungen</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a 
                href="tel:015792305928"
                className="flex items-center justify-center gap-2 bg-[#c5a54e] text-[#003d00] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#d4b45e] transition-colors"
              >
                <Phone size={20} />
                01579 2305 928
              </a>
              <a 
                href="#kontakt"
                className="flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#003d00] transition-colors"
              >
                Anfrage Senden
              </a>
            </div>

            {/* USP Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#005500]">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 border-2 border-[#c5a54e] rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#c5a54e]" />
                </div>
                <div className="text-white font-bold">30-60 Min</div>
                <div className="text-gray-400 text-sm">Reaktionszeit</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 border-2 border-[#c5a54e] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-[#c5a54e]" />
                </div>
                <div className="text-white font-bold">Garantie</div>
                <div className="text-gray-400 text-sm">100% Zufrieden</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 border-2 border-[#c5a54e] rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#c5a54e]" />
                </div>
                <div className="text-white font-bold">Festpreise</div>
                <div className="text-gray-400 text-sm">Transparent</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 border-2 border-[#c5a54e] rounded-full flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-[#c5a54e]" />
                </div>
                <div className="text-white font-bold">24/7 Hotline</div>
                <div className="text-gray-400 text-sm">Immer da</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Grid */}
          <div className="relative">
            {/* Badges */}
            <div className="absolute -top-2 right-0 z-10 flex flex-col gap-2">
              <div className="bg-[#005500] border border-[#c5a54e] text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                24/7 Notdienst – Jetzt verfügbar
              </div>
            </div>
            
            {/* 2x2 Image Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="aspect-[3/2] rounded-2xl overflow-hidden">
                <img 
                  src="https://kammerjaeger-hartmann.de/wp-content/uploads/2026/01/Kammerjaeger-Hartmann-Wespenbekaempfung-von-Profis-in-deiner-Naehe-1024x682.webp" 
                  alt="Wespenbekämpfung"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/2] rounded-2xl overflow-hidden">
                <img 
                  src="https://kammerjaeger-hartmann.de/wp-content/uploads/2026/01/Kammerjaeger-Hartmann-Akute-Schaedlingsbekaempfung-1024x682.webp" 
                  alt="Schädlingsbekämpfung"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/2] rounded-2xl overflow-hidden">
                <img 
                  src="https://kammerjaeger-hartmann.de/wp-content/uploads/2026/01/Kammerjaeger-Hartmann-Schaben-und-Kakerlaken-Bekaempfung-von-Profis-1024x682.webp" 
                  alt="Schabenbekämpfung"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/2] rounded-2xl overflow-hidden">
                <img 
                  src="https://kammerjaeger-hartmann.de/wp-content/uploads/2026/01/Kammerjaeger-Hartmann-Maeusebekaempfung-1024x682.webp" 
                  alt="Mäusebekämpfung"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bottom Badge */}
            <div className="absolute -bottom-4 left-4 z-10">
              <div className="bg-[#005500] border border-[#c5a54e] text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                Heute noch Termine frei
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HartmannHero;
