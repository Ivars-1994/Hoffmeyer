import { Star } from 'lucide-react';

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const TrustpilotLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#00B67A" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>
);

const MyHammerLogo = () => (
  <div className="w-5 h-5 bg-[#ff6600] rounded flex items-center justify-center">
    <span className="text-white text-xs font-bold">M</span>
  </div>
);

const InitialAvatar = ({ name, bg }: { name: string; bg: string }) => {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
  return (
    <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm ${bg}`}>
      {initials}
    </div>
  );
};

const testimonials = [
  {
    name: "Max Lehmann",
    platform: "Google",
    platformLogo: GoogleLogo,
    bg: "bg-blue-600",
    stars: 5,
    text: "Das Wespennest war wirklich innerhalb von 1 Stunde nach dem Anruf weg!! Andere Kammerjäger wollten mir erst in 3 Tagen helfen!! SUPER IMMER WIEDER GERN!!"
  },
  {
    name: "Heike O.",
    platform: "MyHammer",
    platformLogo: MyHammerLogo,
    bg: "bg-orange-500",
    stars: 5,
    text: "Wir hatten bei uns im Keller Mäuse, die uns schon länger Ärger verursacht haben. Nicht nur die Bekämpfung, sondern auch die Nachkontrolle verlief einwandfrei. Kann ich wärmstens empfehlen."
  },
  {
    name: "Treckster8310",
    platform: "Google",
    platformLogo: GoogleLogo,
    bg: "bg-green-600",
    stars: 5,
    text: "Silberfische im Badezimmer und Flur weg. Preis war gut. Beratung war gut. Rechnung bekommt der Vermieter 🤣🤣"
  },
  {
    name: "Klaus W.",
    platform: "Trustpilot",
    platformLogo: TrustpilotLogo,
    bg: "bg-teal-600",
    stars: 5,
    text: "Als Hotelier bekommt man Gäste aus der ganzen Welt. Was diese mit ins Zimmer bringen, können wir nicht kontrollieren. Was wir kontrollieren können, ist die Beseitigung. Bettwanzen waren am selben Tag vollständig weg!"
  },
  {
    name: "Hassan Gebäudereinigung",
    platform: "Trustpilot",
    platformLogo: TrustpilotLogo,
    bg: "bg-purple-600",
    stars: 5,
    text: "Wir arbeiten schon länger zusammen und wollten uns für die Beratung und schnelle Hilfe bedanken. Wir empfehlen Kammerjäger Hoffmeyer jedem weiter."
  },
  {
    name: "Nicole Bauer",
    platform: "Google",
    platformLogo: GoogleLogo,
    bg: "bg-pink-600",
    stars: 5,
    text: "Ich hatte Schaben bei mir am Balkon und in der Küche. Die Jungen haben mir gezeigt, von wo diese in meine Wohnung kamen und wie ich das lösen konnte. Seit 4 Wochen keine Schaben mehr!"
  },
  {
    name: "Katarina Weis",
    platform: "MyHammer",
    platformLogo: MyHammerLogo,
    bg: "bg-amber-600",
    stars: 4,
    text: "Preis-Leistung war super. Das Team kam 1 Stunde zu spät, waren aber dennoch nett und haben die Ameisen wirklich komplett beseitigen können."
  }
];

const HartmannTestimonials = () => {
  return (
    <section className="bg-[#003311] py-16 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div 
          className="flex gap-6 overflow-x-auto pb-4" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((testimonial, index) => {
            const PlatformLogo = testimonial.platformLogo;
            return (
              <div 
                key={index}
                className="flex-shrink-0 w-80 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-start gap-3 mb-3">
                  <InitialAvatar name={testimonial.name} bg={testimonial.bg} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[#1a1a1a] font-semibold truncate">{testimonial.name}</div>
                    <div className="flex mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < testimonial.stars ? 'text-[#FFD700] fill-[#FFD700]' : 'text-gray-300 fill-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <div className="text-sm text-green-600 mt-0.5 flex items-center gap-1">
                      <PlatformLogo />
                      {testimonial.platform}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{testimonial.text}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <a 
            href="#kontakt"
            className="flex items-center justify-center gap-2 bg-[#c9a227] text-[#003311] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#d4b13a] transition-colors"
          >
            Anfrage Senden
          </a>
          <a 
            href="tel:015792453526"
            className="flex items-center justify-center gap-2 bg-[#003311] border-2 border-[#003311] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#004d1a] transition-colors"
          >
            01579 2453 526
          </a>
        </div>
      </div>
    </section>
  );
};

export default HartmannTestimonials;
