import { Shield, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-subtle overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
          filter: 'brightness(0.3)'
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-80" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Trust badge */}
          <div className="flex items-center gap-2 mb-6">
            <Shield className="h-5 w-5 text-accent" />
            <span className="text-accent font-semibold text-sm">Licensed & Insured Professionals</span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Professional Pest Control
            <span className="text-accent block">You Can Trust</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
            Protect your home and family with our comprehensive pest prevention solutions. 
            Fast, effective, and environmentally conscious treatments.
          </p>
          
          {/* Key benefits */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span className="text-white text-sm">Same Day Service</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span className="text-white text-sm">100% Satisfaction Guarantee</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span className="text-white text-sm">Eco-Friendly Solutions</span>
            </div>
          </div>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="xl" className="text-lg">
              Get Free Inspection
            </Button>
            <Button variant="outline" size="xl" className="text-lg border-white text-white hover:bg-white hover:text-primary">
              <Phone className="h-5 w-5" />
              Call (555) 123-PEST
            </Button>
          </div>
          
          {/* Emergency notice */}
          <div className="mt-8 flex items-center gap-2 text-warning">
            <div className="animate-pulse">⚡</div>
            <span className="text-sm font-medium">Emergency pest problems? We're available 24/7!</span>
          </div>
        </div>
      </div>
      
      {/* Decorative shapes */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
    </section>
  );
};

export default HeroSection;