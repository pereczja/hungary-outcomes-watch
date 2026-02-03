import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OutcomesPage from "./pages/Outcomes";
import PromisesPage from "./pages/Promises";
import Competitiveness from "./pages/Competitiveness";
import SnakePage from "./pages/Snake";
import OV2022Page from "./pages/OV2022";
import ProgramsPage from "./pages/Programs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          {/* Main Hungarian routes */}
          <Route path="/" element={<Index />} />
          <Route path="/programok" element={<ProgramsPage />} />
          <Route path="/eredmenyek" element={<OutcomesPage />} />
          <Route path="/versenyképesség" element={<Competitiveness />} />
          <Route path="/kormany-2022" element={<OV2022Page />} />

          {/* Legacy English routes - redirect to Hungarian */}
          <Route path="/outcomes" element={<Navigate to="/eredmenyek" replace />} />
          <Route path="/promises" element={<Navigate to="/programok" replace />} />
          <Route path="/outcomes/competitiveness" element={<Navigate to="/versenyképesség" replace />} />
          <Route path="/promises/ov-2022" element={<Navigate to="/kormany-2022" replace />} />

          {/* Fun */}
          <Route path="/play/snake" element={<SnakePage />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
