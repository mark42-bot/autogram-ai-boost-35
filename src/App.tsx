import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Features from "./pages/Features";
import NotFound from "./pages/NotFound";
import TutorialPage from "./pages/TutorialPage";
import PerformanceReportsPage from "./pages/features/PerformanceReportsPage";
import MultiTimezonePage from "./pages/features/MultiTimezonePage";
import BulkSchedulingPage from "./pages/features/BulkSchedulingPage";
import Chatbot from "./components/ui/chatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tutorial" element={<TutorialPage />} />
            <Route path="/tutorials" element={<TutorialPage />} />
            <Route path="/features/performance-reports" element={<PerformanceReportsPage />} />
            <Route path="/features/multi-timezone" element={<MultiTimezonePage />} />
            <Route path="/features/bulk-scheduling" element={<BulkSchedulingPage />} />
            <Route path="/features/*" element={<Features />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
