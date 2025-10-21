// import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { PasswordGate } from "@/components/PasswordGate";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import ArtworkDetail from "./pages/ArtworkDetail";
import Arnab from "./pages/Arnab";
import Deblina from "./pages/Deblina";
import Together from "./pages/Together";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import PuzzlePage from "./pages/Puzzle";
import { Navbar } from "./components/Navbar";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import ForgotPassword from "./pages/ForgotPasswordPage";

// Smooth scrolling with Lenis
import { ReactLenis, useLenis } from 'lenis/react'

const queryClient = new QueryClient();

function App() {


  
  return (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <ReactLenis root />

        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword /> } />
            <Route path="/signup" element={ <Signup />} />

            <Route path="/" element={ <ProtectedRoute><Home /></ProtectedRoute> } />
            <Route path="/arnab" element={ <ProtectedRoute><Arnab /></ProtectedRoute> } />
            <Route path="/deblina" element={ <ProtectedRoute><Deblina /></ProtectedRoute> } />
            <Route path="/together" element={ <ProtectedRoute><Together /></ProtectedRoute> } />
            <Route path="/puzzle" element={ <ProtectedRoute><PuzzlePage /></ProtectedRoute> } />
            <Route path="/upload" element={ <ProtectedRoute><AdminDashboard /></ProtectedRoute> } />


            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

}
export default App;
