import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import PhoneButton from '../ui/PhoneButton';
import WhatsAppButton from '../ui/WhatsAppButton';
import Logo from '../ui/Logo';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';
const PHONE_NUMBER = "+4915212124199";
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
      {/* Navigation bar - Glassmorphism design */}
      <header className={cn('fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-2 sm:py-3 glass-navbar', isScrolled && 'shadow-lg')}>
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between min-h-[48px] sm:h-16">
            {/* Logo and company name */}
            <div className="flex items-center h-full flex-shrink-0">
              <Logo size={isMobile ? "small" : "medium"} className="mr-1" />
              <div className="font-bold text-primary">
                <div className={cn("flex flex-col justify-center", isMobile ? "gap-0" : "gap-0.5")}>
                  <span className="text-[#9b87f5] leading-none text-base sm:text-xl md:text-xl">Kammerjäger</span>
                  <span className="leading-none text-sm sm:text-base mx-0 px-0 text-[#9b87f5] font-extrabold md:text-2xl">Hoffmeyer</span>
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
            <div className="md:hidden flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <PhoneButton phoneNumber={PHONE_NUMBER} variant="ghost" size="sm" className="text-accent p-1 sm:p-1.5" />
              <WhatsAppButton phoneNumber={PHONE_NUMBER} variant="ghost" size="sm" className="text-green-600 p-1 sm:p-1.5" />
              <button onClick={toggleMenu} className="text-primary p-1 sm:p-1.5 rounded-md hover:bg-secondary transition-colors" aria-expanded={isMenuOpen} aria-label="Toggle menu">
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
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