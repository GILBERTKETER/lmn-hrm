import React from "react";
import { useNavigate, Outlet } from "react-router";
import { useAuth } from "@/hooks/Auth";

export function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return !isAuthenticated ? <Outlet /> : null;
}
