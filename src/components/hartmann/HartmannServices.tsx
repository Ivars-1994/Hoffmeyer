import { AlertTriangle, Bug, Zap } from 'lucide-react';

const services = [
  {
    title: "Kammerjäger Notdienst",
    description: "Unser 24/7 Kammerjäger Notdienst ist sofort für Sie erreichbar und hilft Ihnen bei jedem Anliegen nachhaltig und sicher weiter. 100 % sichere Bekämpfung durch Profis!",
    icon: AlertTriangle,
    highlight: true
  },
  {
    title: "Ratten",
    description: "Ratten, Mäuse, Schaben und auch Bettwanzen gehören zu unseren Leistungen und werden von uns so schnell wie möglich beseitigt. Wir bekämpfen diese sofort!",
    icon: Bug
  },
  {
    title: "Wespen",
    description: "Wir wissen, dass viele Menschen allergisch reagieren können und es auch gefährlich ist. Wespennester noch innerhalb von 60 Minuten entfernen lassen!",
    icon: Zap
  },
  {
    title: "Mäuse",
    description: "Mäuse auf Dachböden, im Keller oder der Küche werden von uns schnell aufgespürt und nachhaltig bekämpft inkl. Nachkontrolle und Beseitigung von Fallen.",
    icon: Bug
  },
  {
    title: "Bettwanzen",
    description: "Bettwanzen im Bett, Teppich oder dem ganzen Zimmer werden gezielt mit Hitze oder Chemie beseitigt. Auch die Eier werden fachgerecht bekämpft. 100% sicher!",
    icon: Bug
  },
  {
    title: "Schaben / Kakerlake",
    description: "Ecken, Kanten und Löcher werden versiegelt und die Schaben an der Quelle werden nachhaltig bekämpft. Auch Nistplätze werden lokalisiert und am Ende desinfiziert.",
    icon: Bug
  },
  {
    title: "Marder",
    description: "Teuwut, Bisse und andere gefährliche Situationen werden durch unseren Einsatz vermieden und die Marder vertrieben. Marderabwehr von uns einbauen lassen.",
    icon: Bug
  },
  {
    title: "Ameisen jeder Art",
    description: "Egal ob Küche, Balkon, Speisekammer oder Terrasse, wir bekämpfen Ameisen für Sie nachhaltig. Richtige Mittel sorgen dafür, dass keine Ameise mehr zu Ihnen gelangt.",
    icon: Bug
  },
  {
    title: "Käfer jeder Art",
    description: "Käfer unterschiedlicher Arten können durch unseren Einsatz einheitlich bekämpft und nachhaltig vermieden werden. Kontaktieren Sie uns für mehr Infos.",
    icon: Bug
  }
];

const HartmannServices = () => {
  return (
    <section id="leistungen" className="bg-[#003d00] py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Unsere<br />Leistungen
          </h2>
        </div>

        {/* First row with badge */}
        <div className="mb-8">
          <div className="inline-block bg-[#c5a54e] text-[#003d00] px-4 py-2 rounded-lg font-bold text-sm mb-6">
            Vor Ort in 30 - 60 Min. nach Ihrer Anfrage
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.slice(0, 3).map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>

        {/* Second row with badge */}
        <div>
          <div className="inline-block bg-[#c5a54e] text-[#003d00] px-4 py-2 rounded-lg font-bold text-sm mb-6">
            Noch am selben Tag Mo. - Fr.
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.slice(3).map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service }: { service: typeof services[0] }) => {
  const Icon = service.icon;
  return (
    <div className="bg-[#002800] border border-[#005500] rounded-2xl p-6 hover:border-[#c5a54e] transition-colors">
      <div className="w-12 h-12 bg-[#003d00] rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-[#c5a54e]" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
    </div>
  );
};

export default HartmannServices;
