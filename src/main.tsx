
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Performance monitoring
const reportWebVitals = () => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    try {
      const entries = performance.getEntriesByType('navigation');
      console.log('Page load performance:', entries[0]);
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
