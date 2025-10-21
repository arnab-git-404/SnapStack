// import { Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

//   useEffect(() => {
//     // Check if admin token exists in localStorage
//     const token =
//     setIsAuthenticated(!!token);
//   }, []);

//   // While checking authentication, show nothing or a loader
//   if (isAuthenticated === null) {
//     return null;
//   }

//   // If not authenticated, redirect to login
//   if (!isAuthenticated) {
//     return <Navigate to="/admin/login" replace />;
//   }

//   // If authenticated, render the protected content
//   return <>{children}</>;
// };

import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      // const token = getCookie("accessToken") || getCookie("refreshToken");

      // if (!token) {
      //   setIsAuthenticated(false);
      //   return;
      // }

      // setIsAuthenticated(true);

      // Optional: Verify token with backend
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/auth/verify`,
          {
            credentials: "include",
          }
        );

        setIsAuthenticated(response.ok);
        console.log("Is  verification response:", isAuthenticated);

      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    verifyAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

console.log("isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
