import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/auth/validate`,
          {
            method: "POST",
            credentials: "include",
            cache: "no-store",
          }
        );
        const data = await response.json();
        setIsAuthenticated(data.success);

        // setIsAuthenticated(response.success);
      } catch (error) {
        console.error("❌ Auth verification error:", error);
        setIsAuthenticated(false);
      }
    };

    verifyAuth();

    // const handleVisibilityChange = () => {
    //   if (document.visibilityState === "visible") {
    //     console.log("👀 Tab is visible again, re-checking auth...");
    //     verifyAuth();
    //   }
    // };

    // document.addEventListener("visibilitychange", handleVisibilityChange);

    // return () => {
    //   document.removeEventListener("visibilitychange", handleVisibilityChange);
    // };
  }, []);

  if (isAuthenticated === null) {
    return (
      // <div className="flex items-center justify-center min-h-screen">
      //   Loading...
      // </div>

      <div className="flex items-center justify-center min-h-screen ">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className=" text-lg font-medium animate-pulse">
            Verifying authentication...
          </p>
        </div>
      </div>
    );
  }

  console.log("isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
