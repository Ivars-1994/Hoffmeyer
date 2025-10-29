import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { saveConsent, hasConsent } from '@/utils/consentManager';
import { getCityFromGeolocation } from '@/utils/geolocationService';
import { detectAndUpdateCity } from '@/utils/cityDetection';
import { Link } from 'react-router-dom';

interface CookieConsentProps {
  onConsentGiven?: () => void;
}

const CookieConsent = ({ onConsentGiven }: CookieConsentProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [preferences, setPreferences] = useState({
    stats: false,
    marketing: false,
    geolocation: false
  });

  useEffect(() => {
    // Prüfe ob bereits Consent vorliegt
    if (!hasConsent()) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = async () => {
    const consent = {
      stats: true,
      marketing: true,
      geolocation: true
    };
    
    saveConsent(consent);
    setIsVisible(false);
    
    // Freundlicher Dialog vor Browser-Geolocation
    const userConfirmed = window.confirm(
      "🏠 Damit wir Ihnen passende Angebote in Ihrer Straße zeigen können, benötigen wir kurz Ihren Standort. Dies hilft uns auch bei der Anfahrtsplanung zu Ihnen!"
    );
    
    if (userConfirmed) {
      // Geolocation abfragen (Browser-Dialog erscheint)
      await getCityFromGeolocation();
      
      // Stadt-Erkennung aktualisieren
      await detectAndUpdateCity();
    }
    
    onConsentGiven?.();
  };

  const handleSavePreferences = async () => {
    saveConsent(preferences);
    setIsVisible(false);
    
    // Wenn Geolocation erlaubt, abfragen
    if (preferences.geolocation) {
      // Freundlicher Dialog vor Browser-Geolocation
      const userConfirmed = window.confirm(
        "🏠 Damit wir Ihnen passende Angebote in Ihrer Straße zeigen können, benötigen wir kurz Ihren Standort. Dies hilft uns auch bei der Anfahrtsplanung zu Ihnen!"
      );
      
      if (userConfirmed) {
        await getCityFromGeolocation();
        await detectAndUpdateCity();
      }
    }
    
    onConsentGiven?.();
  };

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] animate-in fade-in duration-300">
      <div className="bg-card border border-border rounded-xl max-w-2xl w-[90%] p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-foreground mb-3">
          Cookie-Einstellungen
        </h2>
        
        <div className="space-y-2 text-xs text-muted-foreground">
          <p>
            Wir nutzen Cookies für eine bessere Nutzererfahrung.{' '}
            <Link to="/datenschutz" className="text-primary hover:underline font-medium">
              Mehr erfahren
            </Link>
          </p>
        </div>

        {!showOptions ? (
          <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-end">
            <Button 
              variant="outline" 
              onClick={() => setShowOptions(true)}
              className="order-2 sm:order-1"
            >
              Individuelle Präferenzen
            </Button>
            <Button 
              onClick={handleAcceptAll}
              className="order-1 sm:order-2"
            >
              Ich akzeptiere alle
            </Button>
          </div>
        ) : (
          <div className="mt-6 pt-6 border-t border-border space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium text-foreground">Statistik / Analyse</div>
                <div className="text-sm text-muted-foreground">Hilft uns die Website zu verbessern</div>
              </div>
              <Switch
                checked={preferences.stats}
                onCheckedChange={() => togglePreference('stats')}
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium text-foreground">Marketing / Personalisierung</div>
                <div className="text-sm text-muted-foreground">Für personalisierte Inhalte und Werbung</div>
              </div>
              <Switch
                checked={preferences.marketing}
                onCheckedChange={() => togglePreference('marketing')}
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium text-foreground">Standortbasierte Dienste</div>
                <div className="text-sm text-muted-foreground">Zeigt Ihnen Angebote in Ihrer Nähe</div>
              </div>
              <Switch
                checked={preferences.geolocation}
                onCheckedChange={() => togglePreference('geolocation')}
              />
            </div>

            <div className="flex justify-end mt-4">
              <Button onClick={handleSavePreferences}>
                Speichern & Fortfahren
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
