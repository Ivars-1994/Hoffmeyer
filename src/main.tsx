
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enhanced Performance monitoring
const reportWebVitals = () => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    try {
      const entries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (entries.length > 0) {
        const navigationEntry = entries[0];
        const loadTime = navigationEntry.loadEventEnd - navigationEntry.fetchStart;
        const domContentLoaded = navigationEntry.domContentLoadedEventEnd - navigationEntry.fetchStart;
        
        console.log('🚀 Performance Metrics:', {
          'Total Load Time': `${Math.round(loadTime)}ms`,
          'DOM Content Loaded': `${Math.round(domContentLoaded)}ms`,
          'First Paint': navigationEntry.responseStart - navigationEntry.fetchStart,
          'Connection': `${Math.round(navigationEntry.connectEnd - navigationEntry.connectStart)}ms`
        });
        
        // Performance budget warnings
        if (loadTime > 3000) {
          console.warn('⚠️ Page load time exceeds 3 seconds');
        }
        if (domContentLoaded > 1500) {
          console.warn('⚠️ DOM Content Loaded exceeds 1.5 seconds');
        }
      }
    } catch (e) {
      console.error('Error measuring performance:', e);
    }
  }
};

// React router navigation listener
const handleRouteChange = () => {
  console.log("Route changed");
};

// Listen for History API changes (when using React Router)
window.addEventListener('popstate', handleRouteChange);

// Create root with concurrent mode enabled
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
  
  // Log performance metrics after rendering
  setTimeout(reportWebVitals, 1000);
}
