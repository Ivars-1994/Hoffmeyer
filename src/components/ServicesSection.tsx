import { Bug, Home, Building, Leaf, Zap, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Bug,
    title: "General Pest Control",
    description: "Comprehensive treatment for ants, cockroaches, spiders, and other common household pests.",
    features: ["Monthly treatments", "Interior & exterior", "Pet-safe options"]
  },
  {
    icon: Home,
    title: "Residential Services",
    description: "Complete home protection with customized treatment plans for your family's safety.",
    features: ["Home inspection", "Prevention plans", "Family-friendly"]
  },
  {
    icon: Building,
    title: "Commercial Pest Control",
    description: "Professional pest management for businesses, restaurants, and commercial properties.",
    features: ["Compliance support", "Scheduled service", "Discreet treatment"]
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Solutions",
    description: "Environmentally conscious pest control methods that are safe for your family and pets.",
    features: ["Green treatments", "Non-toxic options", "Sustainable practices"]
  },
  {
    icon: Zap,
    title: "Emergency Services",
    description: "24/7 emergency pest control for urgent situations that can't wait.",
    features: ["Same-day service", "Weekend availability", "Rapid response"]
  },
  {
    icon: Shield,
    title: "Prevention Programs",
    description: "Proactive pest prevention to keep your property pest-free year-round.",
    features: ["Regular inspections", "Barrier treatments", "Seasonal protection"]
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Professional Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive pest control solutions tailored to protect your property and provide peace of mind.
          </p>
        </div>
        
        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2 border-0 bg-card">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gradient-primary rounded-lg p-3">
                    <service.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl text-card-foreground">{service.title}</CardTitle>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <Button variant="hero" size="lg">
            Schedule Your Service Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;