import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  faqs: FAQItem[];
  serviceSlug: string;
}

const ServiceFAQ = ({ faqs, serviceSlug }: ServiceFAQProps) => {
  return (
    <div className="mt-8" itemScope itemType="https://schema.org/FAQPage">
      <h3 className="text-xl font-semibold mb-4 text-primary">Häufige Fragen</h3>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={`${serviceSlug}-faq-${index}`} 
            value={`item-${index}`}
            itemScope 
            itemProp="mainEntity" 
            itemType="https://schema.org/Question"
          >
            <AccordionTrigger itemProp="name" className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent 
              itemScope 
              itemProp="acceptedAnswer" 
              itemType="https://schema.org/Answer"
            >
              <div itemProp="text" className="text-muted-foreground">
                {faq.answer}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ServiceFAQ;
