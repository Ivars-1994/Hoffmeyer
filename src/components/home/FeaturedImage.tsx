
import React from 'react';

interface FeaturedImageProps {
  cityName: string;
  defaultCity: string;
}

const FeaturedImage = ({ cityName, defaultCity }: FeaturedImageProps) => {
  return (
    <div className="w-full bg-gradient-to-b from-accent/5 to-white py-6">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto relative rounded-xl overflow-hidden shadow-xl">
          <img 
            src="https://kammerjaeger-wolfgang.de/wp-content/uploads/2025/04/norbert_wolframm_cousin.jpg" 
            alt="Professioneller Kammerjäger im Einsatz" 
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2">
              Schädlingsbekämpfung {cityName !== defaultCity && `in ${cityName}`}
            </h2>
            <p className="text-base sm:text-lg md:text-xl max-w-xl mobile-text-boost">
              Professionelle und diskrete Hilfe bei Schädlingsbefall
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedImage;
