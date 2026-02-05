import { Star, Phone } from 'lucide-react';

const testimonials = [
  {
    name: "Max Lehmann",
    platform: "Google",
    text: "Das Wespennest war wirklich innerhalb von 1 Stunde nach dem Anruf weg!! Andere Kammerjäger wollten mir erst in 3 Tagen helfen!! SUPER IMMER WIEDER GERN!!"
  },
  {
    name: "Heike O.",
    platform: "MyHammer",
    text: "Wir hatten bei uns im Keller Mäuse, die uns schon länger Ärger verursacht haben. Nicht nur die Bekämpfung, sondern auch die Nachkontrolle verlief einwandfrei. Kann ich wärmstens empfehlen."
  },
  {
    name: "Treckster8310",
    platform: "Google",
    text: "Silberfische im Badezimmer und Flur weg. Preis war gut. Beratung war gut. Rechnung bekommt der Vermieter 🤣🤣"
  },
  {
    name: "Klaus W.",
    platform: "Trustpilot",
    text: "Als Hotelier bekommt man Gäste aus der ganzen Welt. Was diese mit ins Zimmer bringen, können wir nicht kontrollieren. Was wir kontrollieren können, ist die Beseitigung. Bettwanzen waren am selben Tag vollständig weg!"
  },
  {
    name: "Hassan Gebäudereinigung",
    platform: "Trustpilot",
    text: "Wir arbeiten schon länger zusammen und wollten uns für die Beratung und schnelle Hilfe bedanken. Wir empfehlen Kammerjäger Hartmann jedem weiter."
  },
  {
    name: "Nicole Bauer",
    platform: "Google",
    text: "Ich hatte Schaben bei mir am Balkon und in der Küche. Die Jungen haben mir gezeigt, von wo diese in meine Wohnung kamen und wie ich das lösen konnte. Seit 4 Wochen keine Schaben mehr!"
  },
  {
    name: "Katarina Weis",
    platform: "MyHammer",
    text: "Preis-Leistung war super. Das Team kam 1 Stunde zu spät, waren aber dennoch nett und haben die Ameisen wirklich komplett beseitigen können."
  }
];

const HartmannTestimonials = () => {
  return (
    <section className="bg-[#003d00] py-16 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Scrollable testimonials */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="flex-shrink-0 w-80 bg-[#002800] border border-[#005500] rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#c5a54e] fill-[#c5a54e]" />
                    ))}
                  </div>
                </div>
                <div className="text-[#c5a54e] text-sm font-medium">{testimonial.platform}</div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{testimonial.text}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <a 
            href="#kontakt"
            className="flex items-center justify-center gap-2 bg-[#c5a54e] text-[#003d00] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#d4b45e] transition-colors"
          >
            Anfrage Senden
          </a>
          <a 
            href="tel:015792305928"
            className="flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#003d00] transition-colors"
          >
            <Phone size={20} />
            01579 2305 928
          </a>
        </div>
      </div>
    </section>
  );
};

export default HartmannTestimonials;
