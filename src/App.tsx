
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import AGB from "./pages/AGB";
import NotFound from "./pages/NotFound";
import CityPage from "./pages/CityPage";
import EssenPage from "./pages/EssenPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/svc/:service" element={<Index />} />
            {/* SEO-optimierte Essen-Seite */}
            <Route path="/kammerjaeger-essen" element={<EssenPage />} />
            <Route path="/city/:city" element={<CityPage />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/agb" element={<AGB />} />
            {/* Direkte Stadt-Route für /essen, /berlin, etc. */}
            <Route path="/:city" element={<CityPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
