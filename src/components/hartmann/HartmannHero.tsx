import { Phone, Clock, CheckCircle, Shield, Headphones, Star } from 'lucide-react';

const HartmannHero = () => {
  return (
    <section className="bg-[#003311] py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <p className="text-[#c9a227] italic text-lg mb-4">
              Schädlingsbekämpfung Seit 1998 
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Kammerjäger<br />
              <span className="relative inline-block">
                Ihrer Stadt
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#c9a227] origin-left animate-underline-draw"></span>
              </span>
            </h1>
            <p className="text-gray-200 text-lg mb-6 leading-relaxed">
              Wenn Sie einen Schädlingsbefall haben, ist Kammerjäger Hoffmeyer Ihr Partner! 
              Wir helfen Ihnen sofort bei jedem Schädlingsbefall weiter. Rufen Sie uns jetzt 
              an oder senden Sie eine Anfrage.
            </p>
            
            {/* Rating */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#FFD700] fill-[#FFD700]" />
                ))}
              </div>
              <span className="text-white">4.7 aus 500+ Bewertungen</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a 
                href="tel:015792453526"
                className="flex items-center justify-center gap-2 bg-[#c9a227] text-[#004d1a] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#d4b13a] transition-colors"
              >
                <Phone size={20} />
                01579 2453 526
              </a>
              <a 
                href="#kontakt"
                className="flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#004d1a] transition-colors"
              >
                Anfrage Senden
              </a>
            </div>

            {/* USP Icons - hidden on mobile like original */}
            <div className="hidden md:grid grid-cols-4 gap-6 pt-8 border-t border-[#006622]">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-2 border-2 border-[#c9a227] rounded-full flex items-center justify-center">
                  <Clock className="w-7 h-7 text-[#c9a227]" />
                </div>
                <div className="text-white font-bold text-sm">30-60 Min</div>
                <div className="text-gray-400 text-xs">Reaktionszeit</div>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-2 border-2 border-[#c9a227] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-[#c9a227]" />
                </div>
                <div className="text-white font-bold text-sm">Garantie</div>
                <div className="text-gray-400 text-xs">100% Zufrieden</div>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-2 border-2 border-[#c9a227] rounded-full flex items-center justify-center">
                  <Shield className="w-7 h-7 text-[#c9a227]" />
                </div>
                <div className="text-white font-bold text-sm">Festpreise</div>
                <div className="text-gray-400 text-xs">Transparent</div>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-2 border-2 border-[#c9a227] rounded-full flex items-center justify-center">
                  <div className="text-[#c9a227] font-bold text-sm">24</div>
                </div>
                <div className="text-white font-bold text-sm">24/7 Hotline</div>
                <div className="text-gray-400 text-xs">Immer da</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Grid (hidden on mobile like original) */}
          <div className="relative hidden lg:block">
            {/* Top Badge */}
            <div className="absolute -top-2 right-0 z-10">
              <div className="bg-[#003311] border border-[#c9a227] text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
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
                  loading="eager"
                />
              </div>
              <div className="aspect-[3/2] rounded-2xl overflow-hidden">
                <img 
                  src="https://kammerjaeger-hartmann.de/wp-content/uploads/2026/01/Kammerjaeger-Hartmann-Akute-Schaedlingsbekaempfung-1024x682.webp" 
                  alt="Schädlingsbekämpfung"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="aspect-[3/2] rounded-2xl overflow-hidden">
                <img 
                  src="https://kammerjaeger-hartmann.de/wp-content/uploads/2026/01/Kammerjaeger-Hartmann-Schaben-und-Kakerlaken-Bekaempfung-von-Profis-1024x682.webp" 
                  alt="Schabenbekämpfung"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="aspect-[3/2] rounded-2xl overflow-hidden">
                <img 
                  src="https://kammerjaeger-hartmann.de/wp-content/uploads/2026/01/Kammerjaeger-Hartmann-Maeusebekaempfung-1024x682.webp" 
                  alt="Mäusebekämpfung"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Bottom Badge */}
            <div className="absolute -bottom-4 left-4 z-10">
              <div className="bg-[#003311] border border-[#c9a227] text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
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
