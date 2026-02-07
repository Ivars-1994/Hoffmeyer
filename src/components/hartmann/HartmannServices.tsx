import { ReactNode } from 'react';

const services: { title: string; description: string; icon: ReactNode }[] = [
  {
    title: "Kammerjäger Notdienst",
    description: "Unser <strong>24/7 Kammerjäger Notdienst</strong> ist sofort für Sie erreichbar und hilft Ihnen bei jedem Anliegen nachhaltig und sicher weiter. <strong>100 % sichere</strong> Bekämpfung durch Profis!",
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" stroke="#003311" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 6L6 20v24l26 14 26-14V20L32 6z" />
        <path d="M32 22l-12 6v12l12 6 12-6V28l-12-6z" />
        <path d="M32 34v10" />
      </svg>
    ),
  },
  {
    title: "Ratten",
    description: "<strong>Ratten, Mäuse, Schaben</strong> und auch <strong>Bettwanzen</strong> gehören zu unseren Leistungen und werden von uns so <strong>schnell</strong> wie möglich beseitigt. Wir <strong>bekämpfen diese sofort</strong>!",
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" stroke="#003311" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="30" cy="32" rx="18" ry="12" />
        <path d="M48 32c4 0 8-2 10-5" />
        <path d="M48 30l8 2" />
        <circle cx="40" cy="28" r="2" fill="#003311" />
        <path d="M14 38l-4 10M22 40l-2 10M38 40l2 10M46 38l4 10" />
        <path d="M12 28c-4-4-2-10 2-12M12 28c-4 0-8-2-8-6" />
      </svg>
    ),
  },
  {
    title: "Wespen",
    description: "Wir wissen, dass viele Menschen <strong>allergisch</strong> reagieren können und es auch <strong>gefährlich</strong> ist. Wespennester noch innerhalb von <strong>60 Minuten</strong> entfernen lassen!",
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" stroke="#003311" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="32" cy="22" rx="10" ry="8" />
        <ellipse cx="32" cy="40" rx="8" ry="12" />
        <path d="M24 38h16M24 42h16M24 46h16" />
        <path d="M22 22l-8-6M42 22l8-6" />
        <path d="M28 52l-4 6M36 52l4 6" />
      </svg>
    ),
  },
  {
    title: "Mäuse",
    description: "Mäuse auf Dachböden, im Keller oder der Küche werden von uns <strong>schnell aufgespürt</strong> und nachhaltig bekämpft inkl. <strong>Nachkontrolle</strong> und Beseitigung von Fallen.",
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" stroke="#003311" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="28" cy="34" rx="16" ry="12" />
        <path d="M44 34c4 0 8-1 10-3" />
        <circle cx="36" cy="30" r="1.5" fill="#003311" />
        <path d="M14 26c-2-6 2-12 6-14" />
        <path d="M14 26c-4-2-6-6-4-10" />
        <path d="M14 42l-2 8M24 44l-1 8M36 44l1 8" />
      </svg>
    ),
  },
  {
    title: "Bettwanzen",
    description: "Bettwanzen im Bett, Teppich oder dem ganzen Zimmer werden gezielt mit <strong>Hitze oder Chemie</strong> beseitigt. Auch die Eier werden fachgerecht bekämpft. <strong>100% sicher!</strong>",
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" stroke="#003311" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="32" cy="36" rx="12" ry="16" />
        <ellipse cx="32" cy="18" rx="6" ry="5" />
        <path d="M20 28l-8-4M44 28l8-4" />
        <path d="M20 36l-8 0M44 36l8 0" />
        <path d="M22 44l-6 4M42 44l6 4" />
        <path d="M28 36h8M28 40h8" />
      </svg>
    ),
  },
  {
    title: "Schaben / Kakerlake",
    description: "Ecken, Kanten und Löcher werden versiegelt und die Schaben an der Quelle werden <strong>nachhaltig bekämpft</strong>. Auch Nistplätze werden lokalisiert und am Ende <strong>desinfiziert</strong>.",
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" stroke="#003311" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="32" cy="38" rx="10" ry="14" />
        <ellipse cx="32" cy="20" rx="6" ry="5" />
        <path d="M26 16l-6-8M38 16l6-8" />
        <path d="M22 30l-8-2M42 30l8-2" />
        <path d="M22 38l-8 2M42 38l8 2" />
        <path d="M24 48l-4 6M40 48l4 6" />
      </svg>
    ),
  },
  {
    title: "Marder",
    description: "Teuwut, Bisse und andere gefährliche Situationen werden durch unseren Einsatz vermieden und die Marder <strong>vertrieben</strong>. <strong>Marderabwehr</strong> von uns einbauen lassen.",
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" stroke="#003311" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="28" cy="32" rx="18" ry="10" />
        <path d="M46 32c6 0 10-2 12-4" />
        <circle cx="38" cy="28" r="1.5" fill="#003311" />
        <path d="M42 32l4 1" />
        <path d="M10 24l-2-8 6 4M10 24l-6-4 4 6" />
        <path d="M14 40l-2 8M24 42l0 8M36 42l2 8" />
      </svg>
    ),
  },
  {
    title: "Ameisen jeder Art",
    description: "Egal ob Küche, Balkon, Speisekammer oder Terrasse, wir bekämpfen Ameisen für Sie <strong>nachhaltig</strong>. Richtige Mittel sorgen dafür, dass <strong>keine Ameise mehr</strong> zu Ihnen gelangt.",
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" stroke="#003311" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="16" r="5" />
        <ellipse cx="32" cy="28" rx="6" ry="4" />
        <ellipse cx="32" cy="42" rx="8" ry="6" />
        <path d="M26 24l-8-4M38 24l8-4" />
        <path d="M24 30l-8 0M40 30l8 0" />
        <path d="M24 42l-6 6M40 42l6 6" />
        <path d="M28 12l-4-6M36 12l4-6" />
      </svg>
    ),
  },
  {
    title: "Käfer jeder Art",
    description: "Käfer unterschiedlicher Arten können durch unseren Einsatz einheitlich bekämpft und <strong>nachhaltig vermieden</strong> werden. Kontaktieren Sie uns für mehr Infos.",
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" stroke="#003311" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="32" cy="38" rx="12" ry="16" />
        <path d="M32 22v32" />
        <ellipse cx="32" cy="20" rx="5" ry="4" />
        <path d="M27 16l-4-8M37 16l4-8" />
        <path d="M20 30l-6-2M44 30l6-2" />
        <path d="M20 38l-6 0M44 38l6 0" />
        <path d="M22 46l-4 4M42 46l4 4" />
      </svg>
    ),
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
      <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
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
