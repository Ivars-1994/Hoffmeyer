import { Phone, Mail, MapPin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background shadow-soft border-b">
      {/* Top contact bar */}
      <div className="bg-muted/50 py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>(555) 123-PEST</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>info@pestpreventionpro.com</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Serving Greater Metro Area</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-primary rounded-lg p-2">
              <div className="text-primary-foreground font-bold text-xl">PPP</div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Pest Prevention Pro</h1>
              <p className="text-xs text-muted-foreground">Professional Pest Control Services</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-foreground hover:text-primary transition-smooth">Home</a>
            <a href="#services" className="text-foreground hover:text-primary transition-smooth">Services</a>
            <a href="#about" className="text-foreground hover:text-primary transition-smooth">About</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-smooth">Contact</a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline">
              <Phone className="h-4 w-4" />
              Call Now
            </Button>
            <Button variant="hero">Free Quote</Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-4">
              <a href="#home" className="text-foreground hover:text-primary transition-smooth">Home</a>
              <a href="#services" className="text-foreground hover:text-primary transition-smooth">Services</a>
              <a href="#about" className="text-foreground hover:text-primary transition-smooth">About</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-smooth">Contact</a>
              <div className="flex flex-col gap-2 mt-4">
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4" />
                  Call Now
                </Button>
                <Button variant="hero" className="w-full">Free Quote</Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;