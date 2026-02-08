import { useState } from 'react';
import { Phone, Mail } from 'lucide-react';
import { toast } from "sonner";

const HartmannContact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mnjbnqqq", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (response.ok) {
        toast.success("Ihre Anfrage wurde erfolgreich gesendet!");
        setFormData({ firstName: '', lastName: '', phone: '', email: '', message: '' });
      } else {
        toast.error("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
      }
    } catch (error) {
      toast.error("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontakt" className="bg-[#003311] py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Kontaktieren Sie uns über unser Formular
          </h2>
          <p className="text-[#c9a227]">Wir melden uns innerhalb von 30 Minuten</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-[#003311] border border-[#006622] rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-[#004d1a] border border-[#006622] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#c9a227] focus:outline-none transition-colors"
                    placeholder="Max"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Nachname</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-[#004d1a] border border-[#006622] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#c9a227] focus:outline-none transition-colors"
                    placeholder="Mustermann"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Telefonnummer</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#004d1a] border border-[#006622] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#c9a227] focus:outline-none transition-colors"
                  placeholder="+49 123 456789"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">E-Mail</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#004d1a] border border-[#006622] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#c9a227] focus:outline-none transition-colors"
                  placeholder="max@beispiel.de"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Nachricht</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-[#004d1a] border border-[#006622] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#c9a227] focus:outline-none transition-colors resize-none"
                  placeholder="Beschreiben Sie Ihr Anliegen..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#c9a227] text-[#003311] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#d4b13a] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Wird gesendet..." : "Senden"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-[#003311] border border-[#006622] rounded-2xl p-6 space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">Kontakt</h3>
              <a 
                href="tel:015792453526" 
                className="flex items-center gap-3 text-gray-300 hover:text-[#c9a227] transition-colors"
              >
                <Phone className="w-5 h-5 text-[#c9a227]" />
                <span>01579 2453 526</span>
              </a>
              <a 
                href="mailto:info.kammerjaegerhoffmeyer@gmail.com" 
                className="flex items-center gap-3 text-gray-300 hover:text-[#c9a227] transition-colors"
              >
                <Mail className="w-5 h-5 text-[#c9a227]" />
                <span>info.kammerjaegerhoffmeyer@gmail.com</span>
              </a>
            </div>

            {/* Guarantee */}
            <div className="bg-[#003311] border-2 border-[#c9a227] rounded-2xl p-6">
              <h3 className="text-xl font-bold text-[#c9a227] mb-2">Garantie</h3>
              <p className="text-gray-300">
                100% Zufriedenheitsgarantie auf alle unsere Dienstleistungen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HartmannContact;
