import { Shield, Bug, CircleAlert, Mouse, BedDouble, Skull, Cat, Antenna, Snail } from 'lucide-react';
import { ReactNode } from 'react';

const services: { title: string; description: string; icon: ReactNode }[] = [
  {
    title: "Kammerjäger Notdienst",
    description: "Unser <strong>24/7 Kammerjäger Notdienst</strong> ist sofort für Sie erreichbar und hilft Ihnen bei jedem Anliegen nachhaltig und sicher weiter. <strong>100 % sichere</strong> Bekämpfung durch Profis!",
    icon: <Shield className="w-12 h-12 text-[#003311]" />,
  },
  {
    title: "Ratten",
    description: "<strong>Ratten, Mäuse, Schaben</strong> und auch <strong>Bettwanzen</strong> gehören zu unseren Leistungen und werden von uns so <strong>schnell</strong> wie möglich beseitigt. Wir <strong>bekämpfen diese sofort</strong>!",
    icon: <svg className="w-12 h-12 text-[#003311]" viewBox="0 0 64 64" fill="currentColor"><path d="M52 24c-1-4-4-7-8-8l2-6h-4l-2 6h-8l-2-6h-4l2 6c-4 1-7 4-8 8l-6 2v4l6 2c1 4 4 7 8 8v6h4v-6h8v6h4v-6c4-1 7-4 8-8l6-2v-4l-6-2zm-20 12a4 4 0 110-8 4 4 0 010 8zm12-2a2 2 0 110-4 2 2 0 010 4z"/></svg>,
  },
  {
    title: "Wespen",
    description: "Wir wissen, dass viele Menschen <strong>allergisch</strong> reagieren können und es auch <strong>gefährlich</strong> ist. Wespennester noch innerhalb von <strong>60 Minuten</strong> entfernen lassen!",
    icon: <Bug className="w-12 h-12 text-[#003311]" />,
  },
  {
    title: "Mäuse",
    description: "Mäuse auf Dachböden, im Keller oder der Küche werden von uns <strong>schnell aufgespürt</strong> und nachhaltig bekämpft inkl. <strong>Nachkontrolle</strong> und Beseitigung von Fallen.",
    icon: <Mouse className="w-12 h-12 text-[#003311]" />,
  },
  {
    title: "Bettwanzen",
    description: "Bettwanzen im Bett, Teppich oder dem ganzen Zimmer werden gezielt mit <strong>Hitze oder Chemie</strong> beseitigt. Auch die Eier werden fachgerecht bekämpft. <strong>100% sicher!</strong>",
    icon: <BedDouble className="w-12 h-12 text-[#003311]" />,
  },
  {
    title: "Schaben / Kakerlake",
    description: "Ecken, Kanten und Löcher werden versiegelt und die Schaben an der Quelle werden <strong>nachhaltig bekämpft</strong>. Auch Nistplätze werden lokalisiert und am Ende <strong>desinfiziert</strong>.",
    icon: <Skull className="w-12 h-12 text-[#003311]" />,
  },
  {
    title: "Marder",
    description: "Teuwut, Bisse und andere gefährliche Situationen werden durch unseren Einsatz vermieden und die Marder <strong>vertrieben</strong>. <strong>Marderabwehr</strong> von uns einbauen lassen.",
    icon: <Cat className="w-12 h-12 text-[#003311]" />,
  },
  {
    title: "Ameisen jeder Art",
    description: "Egal ob Küche, Balkon, Speisekammer oder Terrasse, wir bekämpfen Ameisen für Sie <strong>nachhaltig</strong>. Richtige Mittel sorgen dafür, dass <strong>keine Ameise mehr</strong> zu Ihnen gelangt.",
    icon: <CircleAlert className="w-12 h-12 text-[#003311]" />,
  },
  {
    title: "Käfer jeder Art",
    description: "Käfer unterschiedlicher Arten können durch unseren Einsatz einheitlich bekämpft und <strong>nachhaltig vermieden</strong> werden. Kontaktieren Sie uns für mehr Infos.",
    icon: <Bug className="w-12 h-12 text-[#003311] rotate-45" />,
  }
];

const HartmannServices = () => {
  return (
    <section id="leistungen" className="bg-[#003311] py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* First row header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-[#c9a227] text-[#003311] px-6 py-2 rounded-lg font-bold text-sm mb-4">
            Vor Ort in 30 - 60 Min. nach Ihrer Anfrage
          </div>
        </div>
        
        {/* First row - 3 cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {services.slice(0, 3).map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        {/* Second row header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Noch am selben Tag</h3>
          <p className="text-gray-300">Mo. - Fr.</p>
        </div>

        {/* Second row - 6 cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.slice(3).map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service }: { service: typeof services[0] }) => {
  return (
    <div className="bg-[#e8e8e8] rounded-2xl p-6 text-center">
      <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
        {service.icon}
      </div>
      <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{service.title}</h3>
      <p 
        className="text-gray-600 text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: service.description }}
      />
    </div>
  );
};

export default HartmannServices;
