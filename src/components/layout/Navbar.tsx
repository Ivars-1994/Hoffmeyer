import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import PhoneButton from '../ui/PhoneButton';
import WhatsAppButton from '../ui/WhatsAppButton';
import Logo from '../ui/Logo';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';
const PHONE_NUMBER = "+491782581987";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [{
    name: 'Startseite',
    href: '#'
  }, {
    name: 'Leistungen',
    href: '#services'
  }, {
    name: 'Zertifizierungen',
    href: '#certifications'
  }, {
    name: 'Bewertungen',
    href: '#reviews'
  }, {
    name: 'Kontakt',
    href: '#contact'
  }];
  return <>
      {/* Emergency banner with availability badge - improved for mobile */}
      <div className="bg-red-600 text-white py-2 fixed top-0 w-full z-50">
        <div className="container mx-auto px-2">
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm sm:text-base mobile-text-boost">24/7 Notfalldienst unter {PHONE_NUMBER}</span>
            <Badge variant="outline" className="bg-white/95 text-green-600 border-none font-medium py-0.5 px-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1 inline-block"></span>
              <span className="text-xs">Jetzt erreichbar</span>
            </Badge>
          </div>
        </div>
      </div>
      
      {/* Navigation bar - position fixed to top with precise positioning to eliminate gap */}
      <header className={cn('fixed top-[39px] left-0 right-0 z-40 transition-all duration-300 py-2 border-b', isScrolled ? 'bg-white shadow-sm' : 'bg-white')}>
        <div className="container mx-auto px-2">
          <div className="flex items-center justify-between h-14">
            {/* Logo and company name */}
            <div className="flex items-center h-full">
              <Logo size={isMobile ? "small" : "medium"} className="mr-1" />
              <div className="font-bold text-primary">
                <div className={cn("flex flex-col justify-center", isMobile ? "gap-0" : "gap-0.5")}>
                  <span className="text-[#9b87f5] leading-none text-xl md:text-xl">Kammerjäger</span>
                  <span className="leading-none text-base mx-0 px-0 text-[#9b87f5] font-extrabold md:text-2xl">Schneider</span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-3">
              <ul className="flex gap-5">
                {navLinks.map(link => <li key={link.name}>
                    <a href={link.href} className="text-primary/80 hover:text-[#9b87f5] transition-colors py-2 text-sm font-medium">
                      {link.name}
                    </a>
                  </li>)}
              </ul>
              <div className="flex items-center gap-2 ml-2">
                <PhoneButton phoneNumber={PHONE_NUMBER} size="sm" />
                <WhatsAppButton phoneNumber={PHONE_NUMBER} size="sm" />
              </div>
            </nav>

            {/* Mobile Menu and Action Buttons */}
            <div className="md:hidden flex items-center gap-2">
              <PhoneButton phoneNumber={PHONE_NUMBER} variant="ghost" size="sm" className="text-accent p-1.5" />
              <WhatsAppButton phoneNumber={PHONE_NUMBER} variant="ghost" size="sm" className="text-green-600 p-1.5" />
              <button onClick={toggleMenu} className="text-primary p-1.5 rounded-md hover:bg-secondary transition-colors" aria-expanded={isMenuOpen} aria-label="Toggle menu">
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={cn('md:hidden absolute w-full transition-all duration-300 bg-white shadow-lg', isMenuOpen ? 'top-full opacity-100 visible' : '-top-[400px] opacity-0 invisible')}>
          <div className="container mx-auto px-4 py-3">
            <ul className="flex flex-col space-y-3">
              {navLinks.map(link => <li key={link.name}>
                  <a href={link.href} className="block text-primary/80 hover:text-[#9b87f5] transition-colors py-2 font-medium text-base mobile-text-boost" onClick={() => setIsMenuOpen(false)}>
                    {link.name}
                  </a>
                </li>)}
            </ul>
          </div>
        </div>
      </header>
    </>;
};
export default Navbar;