import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { LogUserOut } from "@/services/api";
import { Loader } from "lucide-react";

// Define types
interface User {
  email: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  city?: string;
  phone?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  requireAuth: (allowed: boolean, redirectTo: string) => void;
  checkAuth: () => Promise<User | null>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
    };

    initAuth();

    window.addEventListener("focus", initAuth);
    window.addEventListener("online", initAuth);
    window.addEventListener("load", initAuth);

    return () => {
      window.removeEventListener("focus", initAuth);
      window.removeEventListener("online", initAuth);
      window.removeEventListener("load", initAuth);
    };
  }, []);

  const checkAuth = async () => {
    setIsLoading(true);

    const cookieString = document.cookie;
    const tokenMatch = cookieString.match(/auth_token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : Cookies.get("auth_token");

    if (token) {
      try {
        const decoded: User = jwtDecode(token);
        setUser(decoded);
        setIsLoading(false);
        return decoded;
      } catch (error) {
        await logout();
        return null;
      }
    } else {
      setUser(null);
      // Stay in loading state to block empty dashboards
      return null;
    }
  };

  const logout = async () => {
    const cookieString = document.cookie;
    const tokenMatch = cookieString.match(/auth_token=([^;]+)/);
    const auth_token = tokenMatch ? tokenMatch[1] : Cookies.get("auth_token");

    if (auth_token) {
      try {
        const response = await LogUserOut();
        if (!response.success) {
          toast.error("Failed to log out: " + response.error);
        }
      } catch (error) {
        // handle silently
      } finally {
        Cookies.remove("auth_token", {
          path: "/",
          domain: "cw.co.ke",
        });
        document.cookie =
          "auth_token=; path=/; domain=cw.co.ke; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        localStorage.removeItem("auth_token");
        setUser(null);
        toast.success("Logged out successfully");
        window.location.href = "https://lmn.co.ke/auth/signin";
      }
    } else {
      toast.error("No token found.");
      window.location.href = "https://lmn.co.ke/auth/signin";
    }
  };

  const requireAuth = (
    requiresAuth: boolean,
    redirectTo: string = "https://lmn.co.ke/auth/signin"
  ) => {
    const DASHBOARD_URL = "https://mybusiness.lmn.co.ke";
    const SIGNIN_URL = "https://lmn.co.ke/auth/signin";

    if (requiresAuth && !user && !isLoading) {
      window.location.href = redirectTo || SIGNIN_URL;
    }

    if (!requiresAuth && user && !isLoading) {
      window.location.href = redirectTo || DASHBOARD_URL;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    logout,
    requireAuth,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? (
        <div className="flex min-h-screen items-center justify-center gap-2">
          <Loader className="animate-spin text-primary w-6 h-6" />
          <p>Please wait</p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Higher-order component to wrap protected pages
export const withAuth = (
  Component: React.ComponentType<any>,
  requiresAuth: boolean = true,
  redirectTo: string = "https://lmn.co.ke/auth/signin"
) => {
  const WithAuth = (props: any) => {
    const { requireAuth, isLoading, checkAuth } = useAuth();

    useEffect(() => {
      const refreshAuth = async () => {
        await checkAuth();
        requireAuth(requiresAuth, redirectTo);
      };

      refreshAuth();
    }, []);

    return isLoading ? (
      <div className="flex min-h-screen items-center justify-center gap-2">
        <Loader className="animate-spin text-primary w-6 h-6" />
        <p>Please wait</p>
      </div>
    ) : (
      <Component {...props} />
    );
  };

  return WithAuth;
};
