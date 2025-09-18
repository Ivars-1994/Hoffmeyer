
import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { CreditCard, Receipt, HandCoins, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const PaymentOptions = () => {
  const paymentMethods = [
    {
      name: "Rechnung",
      icon: <Receipt className="w-6 h-6 text-accent" />,
      description: "Bequeme Zahlung nach erbrachter Leistung"
    },
    {
      name: "Bar",
      icon: <HandCoins className="w-6 h-6 text-accent" />,
      description: "Direkte Barzahlung vor Ort möglich"
    },
    {
      name: "Karte",
      icon: <CreditCard className="w-6 h-6 text-accent" />,
      description: "EC- und Kreditkartenzahlung verfügbar"
    },
    {
      name: "PayPal",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.0067 7.55556C20.0067 10.7333 18.16 13.7778 14.9133 13.7778H12.9778C12.56 13.7778 12.1956 14.0889 12.1422 14.5067L11.5067 19.3156C11.4533 19.6267 11.1956 19.8844 10.8844 19.8844H8.16C7.84889 19.8844 7.64444 19.6267 7.69778 19.3156L9.39111 8.18222C9.44444 7.81778 9.75556 7.55556 10.12 7.55556H14.9133C17.4133 7.55556 19.1067 9.24889 19.1067 11.7489C19.1067 13.9378 17.8667 15.6844 15.6778 15.6844H13.7422C13.3244 15.6844 12.96 15.9956 12.9067 16.4133L12.2711 21.2222C12.2178 21.5333 12.5333 21.7911 12.8444 21.7911H15.5689C15.88 21.7911 16.0844 21.5333 16.0311 21.2222L15.6133 18.3822C15.56 18.0711 15.7644 17.8133 16.0756 17.8133H16.96C20.2067 17.8133 22.0533 14.7689 22.0533 11.5911C22.0533 9.24889 20.36 7.55556 18.0178 7.55556" fill="#9b87f5"/>
          <path d="M4.97778 7.55556C7.69778 7.55556 9.87111 9.72889 9.87111 12.4489C9.87111 15.1689 7.69778 17.3422 4.97778 17.3422C2.25778 17.3422 0.0844452 15.1689 0.0844452 12.4489C0.0844452 9.72889 2.25778 7.55556 4.97778 7.55556ZM4.97778 15.4067C6.61778 15.4067 7.93778 14.0867 7.93778 12.4489C7.93778 10.8089 6.61778 9.49111 4.97778 9.49111C3.33778 9.49111 2.01778 10.8089 2.01778 12.4489C2.01778 14.0867 3.33778 15.4067 4.97778 15.4067Z" fill="#9b87f5"/>
        </svg>
      ),
      description: "Schnelle und sichere Online-Zahlung"
    },
    {
      name: "Klarna",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.3311 2H4.66889C3.19333 2 2 3.19333 2 4.66889V19.3311C2 20.8067 3.19333 22 4.66889 22H19.3311C20.8067 22 22 20.8067 22 19.3311V4.66889C22 3.19333 20.8067 2 19.3311 2Z" fill="#FFB3C7"/>
          <path d="M10.5 16C10.5 17.6569 9.15685 19 7.5 19C5.84315 19 4.5 17.6569 4.5 16C4.5 14.3431 5.84315 13 7.5 13C9.15685 13 10.5 14.3431 10.5 16Z" fill="#9b87f5"/>
          <rect x="12" y="5" width="7.5" height="2.5" rx="1.25" fill="#9b87f5"/>
          <rect x="12" y="10" width="7.5" height="2.5" rx="1.25" fill="#9b87f5"/>
          <rect x="12" y="15" width="7.5" height="2.5" rx="1.25" fill="#9b87f5"/>
        </svg>
      ),
      description: "Flexible Zahlungsmöglichkeiten"
    },
    {
      name: "Versicherung",
      icon: <Shield className="w-6 h-6 text-accent" />,
      description: "Direkte Abrechnung mit Ihrer Versicherung"
    }
  ];

  return (
    <AnimatedSection className="bg-white py-16">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="section-heading">Zahlungsmöglichkeiten</h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Flexible und sichere Zahlungsmethoden für Ihre Bequemlichkeit
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {paymentMethods.map((method, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 border border-primary/10 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="bg-accent/10 p-4 rounded-full mb-4">
                {method.icon}
              </div>
              <h3 className="font-semibold mb-2">{method.name}</h3>
              <p className="text-xs text-muted-foreground">{method.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-secondary/30 p-6 md:p-8 rounded-xl max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="bg-accent/10 p-4 rounded-full mb-4 md:mb-0 md:mr-6 flex-shrink-0">
              <Shield className="w-10 h-10 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-center md:text-left">Sichere und transparente Zahlungsabwicklung</h3>
              <p className="text-muted-foreground">
                Bei uns gibt es keine versteckten Kosten. Alle Preise sind transparent und werden vor Beginn der Arbeiten klar kommuniziert. Wir bieten zudem eine kostenlose Beratung und Anfahrt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default PaymentOptions;
