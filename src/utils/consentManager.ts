export interface ConsentState {
  stats: boolean;
  marketing: boolean;
  geolocation: boolean;
  timestamp: number;
}

const STORAGE_KEY = 'consent.v2';
const CONSENT_VALIDITY_DAYS = 365; // 12 Monate

export function saveConsent(state: Omit<ConsentState, 'timestamp'>): void {
  const consentData: ConsentState = {
    ...state,
    timestamp: Date.now()
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consentData));
  
  // Trigger custom event für andere Komponenten
  window.dispatchEvent(new CustomEvent('consentUpdated', { 
    detail: consentData 
  }));
}

export function loadConsent(): ConsentState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const consent: ConsentState = JSON.parse(stored);
    
    // Prüfe ob Consent abgelaufen ist
    const daysSinceConsent = (Date.now() - consent.timestamp) / (1000 * 60 * 60 * 24);
    if (daysSinceConsent > CONSENT_VALIDITY_DAYS) {
      clearConsent();
      return null;
    }
    
    return consent;
  } catch (e) {
    console.error('Fehler beim Laden des Consents:', e);
    return null;
  }
}

export function clearConsent(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('consentCleared'));
}

export function hasConsent(): boolean {
  return loadConsent() !== null;
}

export function hasGeolocationConsent(): boolean {
  const consent = loadConsent();
  return consent?.geolocation === true;
}

export function hasStatsConsent(): boolean {
  const consent = loadConsent();
  return consent?.stats === true;
}

export function hasMarketingConsent(): boolean {
  const consent = loadConsent();
  return consent?.marketing === true;
}
