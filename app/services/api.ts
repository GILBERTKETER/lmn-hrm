import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_AUTH_URL || "https://auth.lmn.co.ke";
const token = Cookies.get("auth_token");

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export const LogUserOut = async () => {
  try {
    const currentToken = Cookies.get("auth_token");
    console.log("Logging out with token: ", currentToken);

    // First make the API call to invalidate the session on the server
    const response = await api.post(
      "/api/auth/sign-out",
      {},
      {
        headers: {
          Authorization: currentToken ? `Bearer ${currentToken}` : "",
        },
      }
    );

    // Then remove the cookie from the browser
    Cookies.remove("auth_token", {
      path: "/",
      domain: ".lmn.co.ke", // Make sure this matches the domain that was used to set it
    });

    if (!response.data.success) {
      toast.error(response.data.error || "Our bad. Logout failed.");
    } else {
      toast.success(
        response.data.message || "You have logged out successfully."
      );
    }

    // You might want to redirect the user here
    // window.location.href = "/login";

    return response.data;
  } catch (error: any) {
    // Remove the cookie anyway, even if the server request fails
    Cookies.remove("auth_token", {
      path: "/",
      domain: ".lmn.co.ke",
    });

    if (error.response && error.response.data) {
      toast.error(
        error.response.data.error || "Invalid token or unknown error."
      );
      throw new Error(
        error.response.data.error || "Invalid token or unknown error."
      );
    }

    toast.error("Unable to connect to the server. Please try again.");
    throw new Error("Unable to connect to the server. Please try again.");
  }
};
