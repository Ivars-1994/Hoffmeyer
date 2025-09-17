import { Award, Clock, Users, Leaf, Shield, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import technicianImage from "@/assets/technician-image.jpg";

const features = [
  {
    icon: Award,
    title: "15+ Years Experience",
    description: "Trusted by thousands of satisfied customers across the region"
  },
  {
    icon: Clock,
    title: "Fast Response Time",
    description: "Same-day service available with 24/7 emergency support"
  },
  {
    icon: Users,
    title: "Licensed Professionals",
    description: "Certified technicians with ongoing training and expertise"
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Methods",
    description: "Safe treatments that protect your family and the environment"
  },
  {
    icon: Shield,
    title: "100% Guarantee",
    description: "Complete satisfaction guarantee on all our services"
  },
  {
    icon: Star,
    title: "5-Star Reviews",
    description: "Consistently rated as the top pest control service in the area"
  }
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Choose Pest Prevention Pro?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We're not just another pest control company. We're your neighbors, committed to 
              protecting your home and family with the highest standards of service and care.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-soft bg-muted/30">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-primary rounded-lg p-2 flex-shrink-0">
                        <feature.icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-strong">
              <img 
                src={technicianImage} 
                alt="Professional pest control technician"
                className="w-full h-[600px] object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              
              {/* Stats overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-medium">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">5000+</div>
                      <div className="text-xs text-muted-foreground">Happy Customers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">15+</div>
                      <div className="text-xs text-muted-foreground">Years Experience</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-warning">24/7</div>
                      <div className="text-xs text-muted-foreground">Emergency Service</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;