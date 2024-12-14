// src/app/Contexts/Auth/AuthContext.jsx

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import api from "@/app/lib/api";
import {
  setAccessToken,
  getAccessToken,
  clearAuthTokens,
} from "@/app/lib/authStorage";
import { useRouter } from "next/navigation";
import logger from "@/app/lib/logger";

// Create Auth Context
const AuthContext = createContext(null);

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false); // Initialize as false
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Enhanced error handling function with detailed error parsing
  const handleApiError = useCallback((err, defaultMessage) => {
    let errorMessage = defaultMessage;
    let errorDetails = {};

    if (err.response) {
      // Handle structured API errors
      const { data, status } = err.response;
      errorDetails.statusCode = status;
      errorDetails.endpoint = err.config?.url;

      if (data) {
        if (data.message) {
          errorMessage = data.message;
        }
        if (data.details) {
          errorDetails.details = data.details;
        }
        if (data.validationErrors) {
          errorDetails.validationErrors = data.validationErrors;
        }
      }

      // Handle specific error status codes
      switch (status) {
        case 401:
          errorMessage = "Authentication failed. Please login again.";
          break;
        case 403:
          errorMessage = "You don't have permission to perform this action.";
          break;
        case 404:
          errorMessage = "The requested resource was not found.";
          break;
        case 429:
          errorMessage = "Too many requests. Please try again later.";
          break;
      }
    } else if (err.request) {
      // Network error
      errorMessage = "Network error. Please check your connection.";
      errorDetails.networkError = true;
    }

    // Log detailed error information
    logger.error(`Auth Error: ${errorMessage}`, {
      error: err,
      ...errorDetails,
      stack: err.stack
    });

    // Set error state with enhanced information
    setError({
      message: errorMessage,
      details: errorDetails,
      timestamp: new Date().toISOString(),
      errorId: Math.random().toString(36).substr(2, 9)
    });

    return false;
  }, []);

  // Enhanced API request wrapper with better error handling
  const makeAuthRequest = useCallback(
    async (requestFn, errorMessage) => {
      try {
        setAuthLoading(true);
        setError(null);
        const result = await requestFn();
        return result;
      } catch (err) {
        return handleApiError(err, errorMessage);
      } finally {
        setAuthLoading(false);
      }
    },
    [handleApiError]
  );

  /**
   * Register with Phone - Send OTP
   * @param {string} phone - User's phone number
   * @returns {boolean} - Success status
   */
  const registerWithPhone = useCallback(
    async (phone) => {
      if (!phone?.trim()) {
        setError({
          message: "Phone number is required",
          details: { field: "phone", code: "REQUIRED" }
        });
        return false;
      }

      return makeAuthRequest(async () => {
        logger.info("Requesting registration OTP for phone:", phone);
        const res = await api.post("/auth/register/phone", { phone });
        return res.status === 200;
      }, "Registration failed");
    },
    [makeAuthRequest]
  );

  /**
   * Verify OTP for Registration - Create User
   * @param {string} phone - User's phone number
   * @param {string} otp - OTP code
   * @returns {boolean} - Success status
   */
  const verifyOtpForRegistration = useCallback(
    async (phone, otp) => {
      if (!phone?.trim() || !otp?.trim()) {
        setError({
          message: "Phone number and OTP are required",
          details: {
            fields: ["phone", "otp"],
            code: "REQUIRED_FIELDS"
          }
        });
        return false;
      }

      return makeAuthRequest(async () => {
        logger.info("Verifying registration OTP for phone:", phone);
        const res = await api.post("/auth/register/phone/verify", {
          phone,
          code: otp,
        });

        if (res.status === 201 && res.data?.accessToken) {
          const { accessToken } = res.data;
          setAccessToken(accessToken);
          setUser(res.data.user);
          router.push("/auth/complete-profile");
          return true;
        }
        return false;
      }, "OTP verification failed");
    },
    [makeAuthRequest, router]
  );

  /**
   * Complete Profile - Add Email, First Name, Last Name
   * @param {Object} profileData - User's profile information
   * @returns {boolean} - Success status
   */
  const completeProfile = useCallback(
    async (profileData) => {
      const requiredFields = ["firstName", "lastName", "email"];
      const missingFields = requiredFields.filter(field => !profileData?.[field]);
      
      if (missingFields.length > 0) {
        setError({
          message: "All profile fields are required",
          details: {
            missingFields,
            code: "INCOMPLETE_PROFILE"
          }
        });
        return false;
      }

      return makeAuthRequest(async () => {
        logger.info("Submitting profile data");
        const res = await api.post("/auth/profile/complete", profileData);

        if (res.status === 200) {
          const { user: updatedUser } = res.data;
          setUser(updatedUser);

          const nextRoute = !updatedUser.isPhoneVerified
            ? "/auth/verify-phone"
            : !updatedUser.isEmailVerified
            ? "/auth/verify-email"
            : "/user";

          router.push(nextRoute);
          return true;
        }
        return false;
      }, "Profile completion failed");
    },
    [makeAuthRequest, router]
  );

  /**
   * Send Verification Email
   * @returns {boolean} - Success status
   */
  const sendVerificationEmail = useCallback(async () => {
    if (!user?.email) {
      setError({
        message: "No email address available",
        details: {
          code: "MISSING_EMAIL",
          userId: user?._id
        }
      });
      return false;
    }

    if (user?.isEmailVerified) {
      setError({
        message: "Email is already verified",
        details: {
          code: "EMAIL_ALREADY_VERIFIED",
          userId: user?._id
        }
      });
      return false;
    }

    return makeAuthRequest(async () => {
      logger.info("Sending verification email to:", user.email);
      const res = await api.post("/auth/resend-verification-email", {
        email: user.email,
      });
      return res.status === 200;
    }, "Failed to send verification email");
  }, [makeAuthRequest, user?.email, user?.isEmailVerified]);

  /**
   * Verify Email from Link
   * @param {string} token - Email verification token
   * @returns {boolean} - Success status
   */
  const verifyEmailFromLink = useCallback(
    async (token) => {
      if (!token) {
        setError({
          message: "Verification token is required",
          details: {
            code: "MISSING_TOKEN"
          }
        });
        router.push("/auth/login");
        return false;
      }

      if (user?.isEmailVerified) {
        setError({
          message: "Email is already verified",
          details: {
            code: "EMAIL_ALREADY_VERIFIED",
            userId: user?._id
          }
        });
        router.push("/user");
        return false;
      }

      return makeAuthRequest(async () => {
        logger.info("Verifying email with token:", token);
        const res = await api.post("/auth/verify-email", { token });

        if (res.status === 200) {
          // Optionally, fetch updated user data
          const userRes = await api.get("/users/me");
          setUser(userRes.data.user);
          router.push("/user");
          return true;
        }
        return false;
      }, "Email verification failed");
    },
    [makeAuthRequest, router, user?.isEmailVerified]
  );

  /**
   * Login with Phone - Send OTP
   * @param {string} phone - User's phone number
   * @returns {boolean} - Success status
   */
  const loginWithPhone = useCallback(
    async (phone) => {
      if (!phone?.trim()) {
        setError({
          message: "Phone number is required",
          details: {
            field: "phone",
            code: "REQUIRED"
          }
        });
        return false;
      }

      return makeAuthRequest(async () => {
        logger.info("Requesting login OTP for phone:", phone);
        const res = await api.post("/auth/login/phone", { phone });
        return res.status === 200;
      }, "Login failed");
    },
    [makeAuthRequest]
  );

  /**
   * Verify OTP for Login - Authenticate User
   * @param {string} phone - User's phone number
   * @param {string} otp - OTP code
   * @returns {boolean} - Success status
   */
  const verifyOtpForLogin = useCallback(
    async (phone, otp) => {
      if (!phone?.trim() || !otp?.trim()) {
        setError({
          message: "Phone number and OTP are required",
          details: {
            fields: ["phone", "otp"],
            code: "REQUIRED_FIELDS"
          }
        });
        return false;
      }

      return makeAuthRequest(async () => {
        logger.info("Verifying login OTP for phone:", phone);
        const res = await api.post("/auth/login/phone/verify", {
          phone,
          code: otp,
        });

        if (res.status === 200 && res.data?.accessToken) {
          const { accessToken } = res.data;
          setAccessToken(accessToken);
          setUser(res.data.user);
          router.push("/user");
          return true;
        }
        return false;
      }, "OTP verification failed");
    },
    [makeAuthRequest, router]
  );

  /**
   * Handle Google OAuth Callback
   * @param {string} accessToken - Access token from backend
   * @param {string} refreshToken - Refresh token handled via HTTP-only cookie
   * @returns {void}
   */
  const handleGoogleCallback = useCallback(
    async (accessToken, refreshToken) => {
      if (!accessToken) {
        setError({
          message: "Authentication failed",
          details: {
            code: "OAUTH_FAILED",
            provider: "google"
          }
        });
        router.push("/auth/login");
        return;
      }

      setAccessToken(accessToken);
      // No need to handle refreshToken as it's in HTTP-only cookie
      // Fetch user data
      try {
        const res = await api.get("/users/me");
        setUser(res.data.user);
        router.push("/user");
      } catch (err) {
        handleApiError(err, "Failed to fetch user data after OAuth");
      }
    },
    [handleApiError, router]
  );

  /**
   * Add Phone Number for Google Users - Send OTP
   * @param {string} phone - User's phone number
   * @returns {boolean} - Success status
   */
  const addPhoneForGoogleUser = useCallback(
    async (phone) => {
      if (!phone?.trim()) {
        setError({
          message: "Phone number is required",
          details: {
            field: "phone",
            code: "REQUIRED",
            userId: user?._id
          }
        });
        return false;
      }

      if (user?.isPhoneVerified) {
        setError({
          message: "Phone number is already verified",
          details: {
            code: "PHONE_ALREADY_VERIFIED",
            userId: user?._id
          }
        });
        return false;
      }

      return makeAuthRequest(async () => {
        logger.info("Adding phone number for user:", user._id);
        const res = await api.post("/auth/add-phone", { phone });
        return res.status === 200;
      }, "Adding phone number failed");
    },
    [makeAuthRequest, user?.id, user?.isPhoneVerified]
  );

  /**
   * Verify OTP for Phone Verification (Google Users)
   * @param {string} phone - User's phone number
   * @param {string} otp - OTP code
   * @returns {boolean} - Success status
   */
  const verifyOTPForPhoneVerification = useCallback(
    async (phone, otp) => {
      if (!phone?.trim() || !otp?.trim()) {
        setError({
          message: "Phone number and OTP are required",
          details: {
            fields: ["phone", "otp"],
            code: "REQUIRED_FIELDS",
            userId: user?._id
          }
        });
        return false;
      }

      if (user?.isPhoneVerified) {
        setError({
          message: "Phone number is already verified",
          details: {
            code: "PHONE_ALREADY_VERIFIED",
            userId: user?._id
          }
        });
        return false;
      }

      return makeAuthRequest(async () => {
        logger.info("Verifying phone OTP for user:", user._id);
        const res = await api.post("/auth/verify-phone-otp", {
          phone,
          code: otp,
        });

        if (res.status === 200) {
          // Optionally, fetch updated user data
          const userRes = await api.get("/users/me");
          setUser(userRes.data.user);
          router.push("/user");
          return true;
        }
        return false;
      }, "OTP verification failed");
    },
    [makeAuthRequest, router, user?.id, user?.isPhoneVerified]
  );

  /**
   * Fetch current user on initialization
   */
  useEffect(() => {
    const fetchUser = async () => {
      setAuthLoading(true); // Set loading state before fetching
      const token = getAccessToken();
      if (!token) {
        setIsInitialized(true);
        setAuthLoading(false);
        return;
      }

      try {
        const res = await api.get("/users/me");
        setUser(res.data.user);
      } catch (err) {
        handleApiError(err, "Failed to fetch user data");
      } finally {
        setIsInitialized(true);
        setAuthLoading(false);
      }
    };

    fetchUser();
  }, [handleApiError]);

  /**
   * Logout function
   * Clears tokens and redirects to login
   */
  const logout = useCallback(async () => {
    return makeAuthRequest(async () => {
      logger.info("Logging out user:", user?.id);
      await api.post("/auth/logout");
      await clearAuthTokens(); // Clears accessToken and revokes refreshToken
      setUser(null);
      router.push("/auth/login");
    }, "Logout failed");
  }, [makeAuthRequest, router, user?.id]);

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null);
    logger.info("Error cleared");
  }, []);

  /**
   * Context Value
   */
  const contextValue = useMemo(
    () => ({
      user,
      authLoading,
      error,
      isInitialized,
      registerWithPhone,
      verifyOtpForRegistration,
      loginWithPhone,
      verifyOtpForLogin,
      completeProfile,
      sendVerificationEmail,
      verifyEmailFromLink,
      handleGoogleCallback,
      addPhoneForGoogleUser,
      verifyOTPForPhoneVerification,
      logout,
      clearError,
    }),
    [
      user,
      authLoading,
      error,
      isInitialized,
      registerWithPhone,
      verifyOtpForRegistration,
      loginWithPhone,
      verifyOtpForLogin,
      completeProfile,
      sendVerificationEmail,
      verifyEmailFromLink,
      handleGoogleCallback,
      addPhoneForGoogleUser,
      verifyOTPForPhoneVerification,
      logout,
      clearError,
    ]
  );

  console.log("AuthContext initialized", user);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
