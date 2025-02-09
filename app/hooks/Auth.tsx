import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { LogUserOut } from "@/services/api";

// Define types
interface User {
  email: string;
  name?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = Cookies.get("auth_token");
    if (token) {
      try {
        const decoded: User = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    } else {
      setUser(null);
    }
    setIsLoading(false);
  };

  const login = (token: string) => {
    try {
      // Decode and set user data
      const decoded: User = jwtDecode(token);
      setUser(decoded);

      // Store token in cookies
      Cookies.set("auth_token", token, {
        expires: 1, // 1 day
        path: "/",
        secure: window.location.protocol === "https:",
        sameSite: "Lax",
      });
    } catch (error) {
      console.error("Invalid login token:", error);
    }
  };
  const logout = () => {
    const auth_token = Cookies.get("auth_token");

    // Check if auth_token exists before calling LogUserOut
    if (auth_token) {
      LogUserOut(auth_token);
    } else {
      console.warn("No auth_token found");
    }

    Cookies.remove("auth_token", { path: "/" });
    setUser(null);
    toast("Logged out successfully");

    navigate("/auth/signin");
  };

  const updateUser = (userData: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...userData } : null));
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
