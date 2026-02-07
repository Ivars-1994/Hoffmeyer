const certifications = [
  {
    src: "https://kammerjaeger-hartmann.de/wp-content/uploads/2026/01/DSV-Schaedlingsbekaempfer-Verband.webp",
    alt: "Deutscher Schädlingsbekämpfer Verband",
  },
  {
    src: "https://kammerjaeger-hartmann.de/wp-content/uploads/2026/01/Stiftung-Warentest-Sehr-Gut.webp",
    alt: "Stiftung Warentest - Sehr Gut (1,0)",
  },
  {
    src: "https://kammerjaeger-hartmann.de/wp-content/uploads/2026/01/TUEV-Rheinland-Zertifiziert.webp",
    alt: "TÜV Rheinland Zertifiziert",
  },
  {
    src: "https://kammerjaeger-hartmann.de/wp-content/uploads/2026/01/DSV-Logo.webp",
    alt: "DSV Zertifiziert",
  },
  {
    src: "https://kammerjaeger-hartmann.de/wp-content/uploads/2026/01/ISO-9001-Bureau-Veritas.webp",
    alt: "Certified ISO 9001 - Bureau Veritas",
  },
  {
    src: "https://kammerjaeger-hartmann.de/wp-content/uploads/2026/01/CEPA-Certified.webp",
    alt: "CEPA Certified Professional Pest Management",
  },
];

const HartmannCertifications = () => {
  return (
    <section className="bg-white py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {certifications.map((cert, index) => (
            <img
              key={index}
              src={cert.src}
              alt={cert.alt}
              className="h-16 md:h-20 w-auto object-contain"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HartmannCertifications;
