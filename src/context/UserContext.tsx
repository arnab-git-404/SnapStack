

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "react-hot-toast";

interface User {
  id: string;
  name: string;
  partnerName: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  name: string;
  partnerName: string;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  isAuthenticated: boolean | null;
  setIsAuthenticated: (value: boolean) => void;
  fetchUser: () => Promise<void>;
  validateAuth: () => Promise<boolean>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
    const server = import.meta.env.VITE_SERVER_URL;
  
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);



  const validateAuth = async (): Promise<boolean> => {
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
      return data.success;
    } catch (error) {
      console.error('❌ Auth verification error:', error);
      setIsAuthenticated(false);
      return false;
    }
  };

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/me`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {

        try {
      const response = await fetch(`${server}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Logged out successfully");
      }

      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to log out");
      console.error("Logout error:", error);
    }

  };

  useEffect(() => {
    const initAuth = async () => {
      const isValid = await validateAuth();
      if (isValid) {
        await fetchUser();
      } else {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const name = user?.name || 'Loading...';
  const partnerName = user?.partnerName || 'Loading...';

  return (
    <UserContext.Provider value={{ 
      name, 
      partnerName, 
      user, 
      setUser, 
      isLoading, 
      isAuthenticated, 
      setIsAuthenticated,
      validateAuth,
      fetchUser, 
      logout 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};