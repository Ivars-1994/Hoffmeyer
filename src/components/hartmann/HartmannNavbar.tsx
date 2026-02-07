import { Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';

const HartmannNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#003311] py-4 px-4 md:px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo - exact match to original */}
        <a href="/lp" className="flex items-center gap-3">
          <div className="w-10 h-10 relative">
            {/* Hartmann Logo SVG - simplified version */}
            <svg viewBox="0 0 40 40" className="w-full h-full">
              <circle cx="20" cy="20" r="18" fill="none" stroke="#c9a227" strokeWidth="2"/>
              <path d="M12 12 L20 8 L28 12 L28 28 L20 32 L12 28 Z" fill="none" stroke="#c9a227" strokeWidth="1.5"/>
              <path d="M20 14 L20 26" stroke="#c9a227" strokeWidth="1.5"/>
              <path d="M15 18 L25 18" stroke="#c9a227" strokeWidth="1.5"/>
            </svg>
          </div>
          <div className="text-white">
            <div className="font-bold text-xl tracking-wider">HOFFMEYER</div>
            <div className="text-xs text-gray-300 tracking-wide">Kammerjäger Seit 98'</div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <a href="#" className="text-white hover:text-[#c9a227] transition-colors font-medium">Startseite</a>
          <a href="#service" className="text-white hover:text-[#c9a227] transition-colors font-medium">Über Uns</a>
          <a href="#leistungen" className="text-white hover:text-[#c9a227] transition-colors font-medium">Leistungen</a>
          <a href="#kontakt" className="text-white hover:text-[#c9a227] transition-colors font-medium">Kontakt</a>
        </div>

        {/* Phone Button */}
        <a 
          href="tel:015792453526" 
          className="hidden md:flex items-center gap-2 border-2 border-[#c9a227] text-white px-5 py-2.5 rounded-lg hover:bg-[#c9a227] hover:text-[#004d1a] transition-all font-semibold"
        >
          <Phone size={18} />
          <span>01579 2453 526</span>
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
        <div className="md:hidden mt-4 pt-4 border-t border-[#006622]">
          <div className="flex flex-col gap-4">
            <a href="#" className="text-white hover:text-[#c9a227] transition-colors">Startseite</a>
            <a href="#service" className="text-white hover:text-[#c9a227] transition-colors">Über Uns</a>
            <a href="#leistungen" className="text-white hover:text-[#c9a227] transition-colors">Leistungen</a>
            <a href="#kontakt" className="text-white hover:text-[#c9a227] transition-colors">Kontakt</a>
            <a 
              href="tel:015792453526" 
              className="flex items-center gap-2 border-2 border-[#c9a227] text-white px-4 py-3 rounded-lg justify-center"
            >
              <Phone size={18} />
              <span className="font-semibold">01579 2453 526</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default HartmannNavbar;
