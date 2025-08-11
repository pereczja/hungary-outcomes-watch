import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OutcomesPage from "./pages/Outcomes";
import PromisesPage from "./pages/Promises";
import Competitiveness from "./pages/Competitiveness";
import SnakePage from "./pages/Snake";
import OV2022Page from "./pages/OV2022";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/outcomes" element={<OutcomesPage />} />
          <Route path="/promises" element={<PromisesPage />} />
          <Route path="/promises/ov-2022" element={<OV2022Page />} />
          <Route path="/outcomes/competitiveness" element={<Competitiveness />} />
          <Route path="/play/snake" element={<SnakePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
