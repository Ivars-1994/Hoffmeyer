import trustBadgesImage from '@/assets/trust-badges-optimized.webp';

const HartmannCertifications = () => {
  return (
    <section className="bg-white py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <img 
          src={trustBadgesImage}
          alt="Zertifizierungen: DSV Verband, Stiftung Warentest Sehr Gut, TÜV Rheinland, DSV, ISO 9001, CEPA" 
          className="w-full h-auto"
          width="1200"
          height="400"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default HartmannCertifications;
