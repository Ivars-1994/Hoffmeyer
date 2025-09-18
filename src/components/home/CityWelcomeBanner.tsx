
import React from 'react';

interface CityWelcomeBannerProps {
  cityName: string;
}

const CityWelcomeBanner = ({ cityName }: CityWelcomeBannerProps) => {
  return (
    <div className="bg-accent text-white py-2">
      <div className="container mx-auto">
        <div className="flex items-center justify-center">
          <p className="text-sm sm:text-base font-medium mobile-text-boost">
            Willkommen aus <span className="city-welcome font-bold">{cityName}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CityWelcomeBanner;
