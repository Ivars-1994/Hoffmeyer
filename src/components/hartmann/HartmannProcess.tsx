import { Phone, Calendar, Shield } from 'lucide-react';

const steps = [
  {
    icon: Phone,
    title: "Kontakt zu uns",
    description: "Wenn Sie einen Befall bemerkt haben oder Hilfe mit Schädlingen brauchen, rufen Sie uns dafür am besten gleich an oder senden Sie uns eine Anfrage."
  },
  {
    icon: Calendar,
    title: "Termin vor Ort",
    description: "Unser Team kommt dann pünktlich wie besprochen zum Termin vorbei und schaut sich den Befall an und berät Sie zum Vorgang und der Bekämpfung."
  },
  {
    icon: Shield,
    title: "Sichere Bekämpfung",
    description: "Wenn alles passt, fangen die Kammerjäger sofort mit der Bekämpfung an und sorgen für eine sichere, schnelle und nachhaltige Bekämpfung. Nachkontrolle optional."
  }
];

const HartmannProcess = () => {
  return (
    <section className="bg-[#003311] py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Unser<br />Ablauf
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-[#004d1a] border-2 border-[#c9a227] rounded-full flex items-center justify-center">
                  <Icon className="w-8 h-8 text-[#c9a227]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <a 
            href="#kontakt"
            className="flex items-center justify-center gap-2 bg-[#c9a227] text-[#003311] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#d4b13a] transition-colors"
          >
            Anfrage Senden
          </a>
          <a 
            href="tel:015792305928"
            className="flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#003311] transition-colors"
          >
            <Phone size={20} />
            01579 2305 928
          </a>
        </div>
      </div>
    </section>
  );
};

export default HartmannProcess;
