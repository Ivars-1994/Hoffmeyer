import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-primary rounded-lg p-2">
                <div className="text-primary-foreground font-bold text-xl">PPP</div>
              </div>
              <div>
                <h3 className="text-xl font-bold">Pest Prevention Pro</h3>
                <p className="text-xs opacity-75">Professional Pest Control Services</p>
              </div>
            </div>
            <p className="text-sm opacity-75 leading-relaxed mb-4">
              Your trusted partner in comprehensive pest control solutions. 
              Protecting homes and businesses with professional, eco-friendly treatments.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <span>(555) 123-PEST</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <span>info@pestpreventionpro.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span>Greater Metro Area</span>
              </div>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li>General Pest Control</li>
              <li>Residential Treatment</li>
              <li>Commercial Services</li>
              <li>Emergency Pest Control</li>
              <li>Prevention Programs</li>
              <li>Eco-Friendly Solutions</li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li><a href="#home" className="hover:text-accent transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-75">
            <p>&copy; 2024 Pest Prevention Pro. All rights reserved.</p>
            <div className="flex gap-6">
              <span>Licensed & Insured</span>
              <span>•</span>
              <span>Family Owned & Operated</span>
              <span>•</span>
              <span>Serving Since 2008</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;