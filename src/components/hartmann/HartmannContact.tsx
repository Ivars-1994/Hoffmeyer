import { Phone } from 'lucide-react';

const PHONE_NUMBER = "+4915792453526";

const HartmannContact = () => {
  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16772701268/8sOcCOaZk-QZEJHsmuI-',
        'value': 1.0,
        'currency': 'EUR'
      });
    }
  };

  return (
    <section id="kontakt" className="bg-[#003311] py-16 px-4 md:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Schädlingsproblem? Rufen Sie uns jetzt an!
        </h2>
        <p className="text-[#c9a227] mb-8">Kostenlose Beratung · 24/7 Notdienst · In 30–60 Min. vor Ort</p>

        <a
          href={`tel:${PHONE_NUMBER}`}
          onClick={handlePhoneClick}
          className="inline-flex items-center gap-4 bg-[#c9a227] text-[#003311] px-10 py-6 rounded-2xl font-bold text-2xl md:text-3xl hover:bg-[#d4b13a] transition-all shadow-2xl hover:scale-[1.03]"
        >
          <Phone className="w-8 h-8 md:w-10 md:h-10" strokeWidth={2.5} />
          01579 2453 526
        </a>

        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Kostenlose Anfahrt', icon: '🚗' },
            { label: 'IHK-zertifiziert', icon: '✅' },
            { label: '100% Zufriedenheitsgarantie', icon: '🛡️' },
          ].map((item) => (
            <div key={item.label} className="bg-[#004d1a] border border-[#006622] rounded-xl p-4 text-white">
              <span className="text-2xl mb-1 block">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HartmannContact;
