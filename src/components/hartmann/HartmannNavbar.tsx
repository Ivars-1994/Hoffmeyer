import { Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';

const HartmannNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#003d00] py-4 px-4 md:px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/lp" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#c5a54e] rounded-full flex items-center justify-center">
            <span className="text-[#003d00] font-bold text-lg">H</span>
          </div>
          <div className="text-white">
            <div className="font-bold text-lg tracking-wide">HARTMANN</div>
            <div className="text-xs text-gray-300">Kammerjäger Seit 98'</div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-white hover:text-[#c5a54e] transition-colors">Startseite</a>
          <a href="#service" className="text-white hover:text-[#c5a54e] transition-colors">Über Uns</a>
          <a href="#leistungen" className="text-white hover:text-[#c5a54e] transition-colors">Leistungen</a>
          <a href="#kontakt" className="text-white hover:text-[#c5a54e] transition-colors">Kontakt</a>
        </div>

        {/* Phone Button */}
        <a 
          href="tel:015792305928" 
          className="hidden md:flex items-center gap-2 border-2 border-[#c5a54e] text-white px-4 py-2 rounded-lg hover:bg-[#c5a54e] hover:text-[#003d00] transition-all"
        >
          <Phone size={18} />
          <span className="font-semibold">01579 2305 928</span>
        </a>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-[#005500]">
          <div className="flex flex-col gap-4">
            <a href="#" className="text-white hover:text-[#c5a54e] transition-colors">Startseite</a>
            <a href="#service" className="text-white hover:text-[#c5a54e] transition-colors">Über Uns</a>
            <a href="#leistungen" className="text-white hover:text-[#c5a54e] transition-colors">Leistungen</a>
            <a href="#kontakt" className="text-white hover:text-[#c5a54e] transition-colors">Kontakt</a>
            <a 
              href="tel:015792305928" 
              className="flex items-center gap-2 border-2 border-[#c5a54e] text-white px-4 py-3 rounded-lg justify-center"
            >
              <Phone size={18} />
              <span className="font-semibold">01579 2305 928</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default HartmannNavbar;
