import Home from "./pages/Home";
import Arnab from "./pages/yourName";
import Login from "./pages/LoginPage";
import Deblina from "./pages/partnerName";
import Together from "./pages/Together";
import NotFound from "./pages/NotFound";
import PuzzlePage from "./pages/Puzzle";
import Signup from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./pages/AdminDashboard";
import ForgotPassword from "./pages/ForgotPasswordPage";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Smooth scrolling with Lenis
import { ReactLenis, useLenis } from "lenis/react";

const queryClient = new QueryClient();

function App() {

  const name = import.meta.env.VITE_CLIENT_NAME;
  const partnerName = import.meta.env.VITE_CLIENT_PARTNER_NAME;
  const together = import.meta.env.VITE_CLIENT_TOGETHER_NAME;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Toaster
          toastOptions={{
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
        }}
          />
          <ReactLenis root />

          <Router>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />

              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path={`/${name}`}
                element={
                  <ProtectedRoute>
                    <Arnab />
                  </ProtectedRoute>
                }
              />
              <Route
                path={`/${partnerName}`}
                element={
                  <ProtectedRoute>
                    <Deblina />
                  </ProtectedRoute>
                }
              />
              <Route
                path={`/${together}`}
                element={
                  <ProtectedRoute>
                    <Together />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/puzzle"
                element={
                  <ProtectedRoute>
                    <PuzzlePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/upload"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
export default App;
