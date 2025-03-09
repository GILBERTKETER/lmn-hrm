import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { LogUserOut } from "@/services/api";
import { LoaderCircle } from "lucide-react";

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

  // Check authentication on mount and whenever window gains focus
  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
    };

    initAuth();

    // Add event listeners for when the window regains focus or comes back online
    window.addEventListener("focus", initAuth);
    window.addEventListener("online", initAuth);

    // Run checkAuth on page loads/refreshes
    window.addEventListener("load", initAuth);

    return () => {
      window.removeEventListener("focus", initAuth);
      window.removeEventListener("online", initAuth);
      window.removeEventListener("load", initAuth);
    };
  }, []);

  const checkAuth = async () => {
    setIsLoading(true);
    //console.log("Checking authentication...");

    // Try to get the cookie directly from document.cookie
    const cookieString = document.cookie;
    //console.log("All cookies:", cookieString);

    // Extract auth_token manually if js-cookie is having issues
    const tokenMatch = cookieString.match(/auth_token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : Cookies.get("auth_token");

    //console.log("token extracted:", token);

    if (token) {
      try {
        const decoded: User = jwtDecode(token);
        //console.log("Decoded user: ", decoded);
        setUser(decoded);
        return decoded; // Return user data for potential use elsewhere
      } catch (error) {
        //console.error("Invalid token:", error);
        await logout();
        return null;
      } finally {
        setIsLoading(false);
      }
    } else {
      //console.log("No auth token found");
      setUser(null);
      setIsLoading(false);
      return null;
    }
  };

  const logout = async () => {
    const cookieString = document.cookie;
    const tokenMatch = cookieString.match(/auth_token=([^;]+)/);
    const auth_token = tokenMatch ? tokenMatch[1] : Cookies.get("auth_token");

    if (auth_token) {
      try {
        const response = await LogUserOut(auth_token);
        if (!response.success) {
          toast.error("Failed to log out: " + response.error);
        }
      } catch (error) {
        //console.error("Error during logout:", error);
      } finally {
        Cookies.remove("auth_token", {
          path: "/",
          domain: "cw.co.ke",
        });

        // Also remove manually
        document.cookie =
          "auth_token=; path=/; domain=cw.co.ke; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        localStorage.removeItem("auth_token");
        setUser(null);
        toast.success("Logged out successfully");
        window.location.href = "http://local.cw.co.ke:3001/auth/signin";
      }
    } else {
      //console.warn("No auth_token found");
      toast.error("No token found.");
      // Still redirect to login page
      window.location.href = "http://local.cw.co.ke:3001/auth/signin";
    }
  };

  const requireAuth = (
    requiresAuth: boolean,
    redirectTo: string = "http://local.cw.co.ke:3001/auth/signin"
  ) => {
    //console.log("requireAuth function called");
    //console.log("isLoading:", isLoading);
    // console.log("user:", user);

    const DASHBOARD_URL = "http://local.cw.co.ke:3000";
    const SIGNIN_URL = "http://local.cw.co.ke:3001/auth/signin";

    if (isLoading) {
      //console.log("Still loading auth state, waiting...");
      return;
    }

    //console.log("Require Auth running...");
    if (requiresAuth && !user) {
      //console.log("User is NOT authenticated. Redirecting to sign-in...");
      window.location.href = redirectTo || SIGNIN_URL;
    }

    if (!requiresAuth && user) {
      //console.log("User is authenticated. Redirecting to dashboard...");
      window.location.href = redirectTo || DASHBOARD_URL;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    logout,
    requireAuth,
    checkAuth, // Expose checkAuth in the context
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

// Higher order component to wrap pages that require authentication
export const withAuth = (
  Component: React.ComponentType<any>,
  requiresAuth: boolean = true,
  redirectTo: string = "http://local.cw.co.ke:3001/auth/signin"
) => {
  const WithAuth = (props: any) => {
    const { requireAuth, isLoading, checkAuth } = useAuth();

    useEffect(() => {
      // Force a fresh check on component mount
      const refreshAuth = async () => {
        await checkAuth();
        if (!isLoading) {
          requireAuth(requiresAuth, redirectTo);
        }
      };

      refreshAuth();
    }, [isLoading]);

    return isLoading ? (
      <div className="flex min-h-screen items-center justify-center gap-2">
        <LoaderCircle className="animate-spin text-primary w-6 h-6" />
        <p>Please wait</p>
      </div>
    ) : (
      <Component {...props} />
    );
  };

  return WithAuth;
};
