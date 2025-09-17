import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get Your Free Inspection Today
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to protect your property? Contact us for a free inspection and personalized treatment plan.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-medium border-0">
            <CardHeader>
              <CardTitle className="text-2xl text-card-foreground">Request Free Quote</CardTitle>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-foreground mb-2">
                    Property Address
                  </label>
                  <Input id="address" placeholder="123 Main Street, City, State" />
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                    Service Needed
                  </label>
                  <select 
                    id="service" 
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select a service...</option>
                    <option value="general">General Pest Control</option>
                    <option value="residential">Residential Treatment</option>
                    <option value="commercial">Commercial Service</option>
                    <option value="emergency">Emergency Service</option>
                    <option value="prevention">Prevention Program</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Describe Your Pest Issue
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about the pest problem you're experiencing..."
                    className="min-h-[100px]"
                  />
                </div>
                
                <Button variant="hero" size="lg" className="w-full">
                  <Send className="h-4 w-4" />
                  Send Free Quote Request
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Emergency CTA */}
            <Card className="bg-gradient-primary border-0 text-primary-foreground">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
                <p className="mb-6 opacity-90">
                  Don't wait! Call us now for same-day service and emergency pest control.
                </p>
                <Button variant="secondary" size="xl" className="bg-white text-primary hover:bg-white/90">
                  <Phone className="h-5 w-5" />
                  Call (555) 123-PEST
                </Button>
              </CardContent>
            </Card>
            
            {/* Contact Details */}
            <div className="space-y-6">
              <Card className="shadow-soft border-0">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-primary rounded-lg p-3">
                      <Phone className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Phone</h4>
                      <p className="text-muted-foreground">(555) 123-PEST</p>
                      <p className="text-sm text-muted-foreground">Available 24/7 for emergencies</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft border-0">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-primary rounded-lg p-3">
                      <Mail className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Email</h4>
                      <p className="text-muted-foreground">info@pestpreventionpro.com</p>
                      <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft border-0">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-primary rounded-lg p-3">
                      <MapPin className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Service Area</h4>
                      <p className="text-muted-foreground">Greater Metro Area</p>
                      <p className="text-sm text-muted-foreground">50+ mile radius coverage</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft border-0">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-primary rounded-lg p-3">
                      <Clock className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Business Hours</h4>
                      <p className="text-muted-foreground">Mon-Fri: 7AM - 7PM</p>
                      <p className="text-muted-foreground">Sat: 8AM - 5PM</p>
                      <p className="text-sm text-muted-foreground">Emergency service 24/7</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;