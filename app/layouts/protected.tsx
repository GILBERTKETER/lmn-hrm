import { Outlet, useNavigate } from "react-router";
import { useAuth } from "@/hooks/Auth";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";

export default function PlainLayout() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user === null) {
      navigate("/auth/signin");
    }
  }, [isLoading, user]); // Runs again when isLoading or user state changes

  // **Show Lucide Loader while checking authentication**
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle className="animate-spin text-blue-500 w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        {user != null ? (
          <>
            <h2>Logged in user: {user?.email || "None"}</h2>
            <h2>Authent: {isAuthenticated ? "✅ Yes" : "❌ No"}</h2>
            <h2>Loading: {isLoading ? "⏳ Yes" : "✅ No"}</h2>
            <Outlet />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
