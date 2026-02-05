const HartmannService = () => {
  return (
    <section id="service" className="bg-[#002800] py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Unser einwandfreier<br />Service
            </h2>
            <div className="text-gray-200 space-y-4 leading-relaxed">
              <p>
                Seit über <strong className="text-white">20 Jahren</strong> bekämpfen wir nachhaltig alle Schädlinge 
                in Ihrer Stadt und Umgebung. Durch unsere <strong className="text-white">Partner</strong> und unsere 
                Marken des <strong className="text-white">Vertrauens</strong> sorgen wir für eine{' '}
                <strong className="text-white">100 % sichere Bekämpfung</strong>.
              </p>
              <p>
                <strong className="text-white">Dank</strong> unseres Teams und der{' '}
                <strong className="text-white">einwandfreien</strong> mobilen{' '}
                <strong className="text-white">Ausstattung</strong> sind wir in der Lage, Ihnen{' '}
                <strong className="text-white">rund um die Uhr</strong> bei{' '}
                <strong className="text-white">jedem Befall</strong> zu helfen. Wir nutzen, wenn möglich, 
                immer erst chemiefreie <strong className="text-white">Lösungen</strong>.
              </p>
              <p>
                <strong className="text-white">Kontaktieren</strong> auch Sie uns{' '}
                <strong className="text-white">noch heute</strong> und lassen Sie sich von unserem{' '}
                <strong className="text-white">Service überzeugen</strong>. Schnelle Bekämpfung zu{' '}
                <strong className="text-white">niedrigen Preisen</strong>! Jetzt{' '}
                <strong className="text-white">anrufen</strong> oder Formular versenden.
              </p>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden">
              <img 
                src="https://kammerjaeger-hartmann.de/wp-content/uploads/2026/01/Kammerjaeger-Hartmann-Kammerjaeger-fuer-jede-Schaedlingsbekaempfung-und-Notdienst-1024x682.webp" 
                alt="Kammerjäger Hartmann Team"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HartmannService;
