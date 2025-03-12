import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_AUTH_URL;

const token = Cookies.get("auth_token");
//console.log("Cookies: ", token);
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export const LogUserOut = async (token: string) => {
  try {
    const response = await api.post("/api/auth/sign-out", {
      Toke: token,
    });
    if (!response.data.success) {
      toast.error("Our bad. Logout failed.");
    }
    toast.success("You have Logged out successfullly.");
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      toast.error(
        error.response.data.error || "Invalid token or uknown error."
      );
      throw new Error(
        error.response.data.error || "Invalid token or uknown error."
      );
    }
    toast.error(
      "Error: ",
      error || "Unable to connect to the server. Please try again."
    );
    throw new Error("Unable to connect to the server. Please try again.");
  }
};
