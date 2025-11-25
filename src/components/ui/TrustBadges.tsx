import React from 'react';
import trustBadgesImage from '@/assets/trust-badges-optimized.webp';

const TrustBadges = () => {
  return (
    <div className="w-full py-8 bg-gradient-to-b from-white to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <img 
            src={trustBadgesImage}
            alt="Zertifizierungen: DSV Verband, Stiftung Warentest Sehr Gut, TÜV Rheinland, DSV, ISO 9001, CEPA" 
            className="w-full h-auto"
            width="1200"
            height="400"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
