import React, { useState } from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { Phone, MapPin, Mail, Clock } from 'lucide-react';
import PhoneButton from '../ui/PhoneButton';
import WhatsAppButton from '../ui/WhatsAppButton';
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const PHONE_NUMBER = "+491782581987";
const EMAIL = "info.kammerjaegerschneider@gmail.com";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name muss mindestens 2 Zeichen lang sein" }),
  email: z.string().email({ message: "Ungültige E-Mail Adresse" }),
  phone: z.string().min(6, { message: "Telefonnummer muss mindestens 6 Zeichen lang sein" }),
  message: z.string().min(10, { message: "Nachricht muss mindestens 10 Zeichen lang sein" }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Using the new Formspree endpoint
      const response = await fetch("https://formspree.io/f/xovwepvz", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
        }),
      });
      
      if (response.ok) {
        toast.success("Ihre Anfrage wurde erfolgreich gesendet!");
        form.reset();
      } else {
        console.error("Form submission error:", response);
        toast.error("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedSection id="contact">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="section-heading">Kontakt</h2>
          <p className="section-subheading">
            Haben Sie ein Schädlingsproblem? Kontaktieren Sie uns für eine kostenlose Beratung und schnelle Hilfe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
          <div className="rounded-xl overflow-hidden shadow-sm border border-primary/10 bg-white p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6">Kontaktinformationen</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Telefon</h4>
                  <p className="text-accent font-medium">{PHONE_NUMBER}</p>
                  <p className="text-sm text-muted-foreground mt-1">Für schnelle Hilfe und kostenlose Beratung</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">E-Mail</h4>
                  <p>{EMAIL}</p>
                  <p className="text-sm text-muted-foreground mt-1">Wir antworten innerhalb von 24 Stunden</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Geschäftszeiten</h4>
                  <p>Mo-Fr: 7:00 - 20:00 Uhr</p>
                  <p>Sa: 7:00 - 19:00 Uhr</p>
                  <p className="text-sm text-muted-foreground mt-1">Notfallservice auch außerhalb der Geschäftszeiten</p>
                  <div className="mt-2 bg-[#E5DEFF] text-accent rounded-md p-2 text-sm font-medium">
                    An Wochenenden & Feiertagen ohne Aufpreis für Sie da!
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-sm border border-primary/10 bg-secondary/20 p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6">Schnellkontakt</h3>
            
            <div className="p-6 bg-white rounded-xl shadow-sm border border-primary/10 mb-8">
              <div className="text-center">
                <h4 className="font-semibold mb-3">Sofortige Beratung?</h4>
                <p className="mb-4">Kontaktieren Sie uns telefonisch oder per WhatsApp</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <PhoneButton phoneNumber={PHONE_NUMBER} size="default" className="w-full justify-center" />
                  <WhatsAppButton phoneNumber={PHONE_NUMBER} size="default" className="w-full justify-center" />
                </div>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ihr Name" 
                          {...field} 
                          className="w-full px-4 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-Mail</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Ihre E-Mail-Adresse" 
                          {...field}
                          className="w-full px-4 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefon</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="Ihre Telefonnummer" 
                          {...field}
                          className="w-full px-4 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nachricht</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={4}
                          placeholder="Beschreiben Sie Ihr Anliegen" 
                          {...field}
                          className="w-full px-4 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-accent-foreground py-3 rounded-md font-medium hover:bg-accent/90 transition-colors"
                >
                  {isSubmitting ? "Wird gesendet..." : "Anfrage senden"}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Wir antworten in der Regel innerhalb eines Werktages
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Contact;
