import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "https://technician-km-exemption-individuals.trycloudflare.com";
// const API_URL = "http://local.cw.co.ke:8000";

const token = Cookies.get("auth_token");

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export const registerUser = async (data: any) => {
  try {
    const response = await api.post("/api/auth/register", data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "Error during registration");
    }
    throw new Error("Unable to connect to the server. Please try again.");
  }
};

export const getPhoneCode = async (Phone: any) => {
  try {
    const response = await api.post("/api/auth/generate-phone-code", {
      Phone: Phone,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "Failed to send phone code");
    }
    throw new Error("Unable to connect to the server. Please try again.");
  }
};

export const getEmailCode = async (Email: any) => {
  try {
    const response = await api.post("/api/auth/generate-email-code", {
      Email: Email,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "Failed to send email code");
    }
    throw new Error("Unable to connect to the server. Please try again.");
  }
};

export const verifyEmailCode = async (Code: any, Email: any) => {
  try {
    const response = await api.post("/api/auth/verify-email", {
      Code: Code,
      Email: Email,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.error || "Invalid email verification code"
      );
    }
    throw new Error("Unable to connect to the server. Please try again.");
  }
};

export const verifyPhoneCode = async (Phone: any, Code: any) => {
  try {
    const response = await api.post("/api/auth/verify-phone", {
      Code: Code,
      Phone: Phone,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.error || "Invalid phone verification code"
      );
    }
    throw new Error("Unable to connect to the server. Please try again.");
  }
};

export const getResetCode = async (Email: any) => {
  try {
    const response = await api.post("/api/auth/get-reset-code", {
      Email: Email,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "Failed to send reset code");
    }
    throw new Error("Unable to connect to the server. Please try again.");
  }
};

export const verifyResetCode = async (Code: any, Email: any) => {
  try {
    const response = await api.post("/api/auth/verify-reset-code", {
      Email: Email,
      Code: Code,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "Invalid reset code");
    }
    throw new Error("Unable to connect to the server. Please try again.");
  }
};

export const ResetPassword = async (
  Email: string,
  NewPassword: string,
  ConfirmPassword: string
) => {
  try {
    const response = await api.post("/api/auth/reset-password", {
      Email: Email,
      NewPassword: NewPassword,
      ConfirmPassword: ConfirmPassword,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "Failed to reset password");
    }
    throw new Error("Unable to connect to the server. Please try again.");
  }
};

export const VerifyLoginCode = async (Email: string, OTP: string) => {
  try {
    const response = await api.post("/api/auth/verify-code", {
      Email: Email,
      OTP: OTP,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "Invalid verification code");
    }
    throw new Error("Unable to connect to the server. Please try again.");
  }
};

export const SignInUser = async (Email: string, Password: string) => {
  try {
    const response = await api.post("/api/auth/sign-in", {
      Email: Email,
      Password: Password,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "Invalid email or password");
    }
    throw new Error("Unable to connect to the server. Please try again.");
  }
};

export const LogUserOut = async (token: string) => {
  try {
    const response = await api.post("/api/auth/sign-out", {
      Toke: token,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.error || "Invalid token or uknown error."
      );
    }
    throw new Error("Unable to connect to the server. Please try again.");
  }
};
