// import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { PasswordGate } from "@/components/PasswordGate";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import ArtworkDetail from "./pages/ArtworkDetail";
import Arnab from "./pages/Arnab";
import Deblina from "./pages/Deblina";
import Together from "./pages/Together";
import NotFound from "./pages/NotFound";
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PasswordGate>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/gallery" element={<Gallery />} /> */}
              {/* <Route path="/artwork/:id" element={<ArtworkDetail />} /> */}
              <Route path="/arnab" element={<Arnab />} />
              <Route path="/deblina" element={<Deblina />} />
              <Route path="/together" element={<Together />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PasswordGate>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
