"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "@/app/Contexts/Auth/AuthContext";
import LoadingSpinner from "@/components/Loaders/LoadingSpinner";

function LoginLeft() {
  const {
    loginWithPhone,
    verifyOtpForLogin,
    handleGoogleLogin,
    error,
    authLoading
  } = useAuth();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [formErrors, setFormErrors] = useState({ phone: "", otp: "" });

  // Handle OTP countdown timer
  useEffect(() => {
    let timer;
    if (otpCountdown > 0) {
      timer = setInterval(() => {
        setOtpCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpCountdown]);

  // Reset form state when unmounting
  useEffect(() => {
    return () => {
      setPhone("");
      setOtp("");
      setIsOtpSent(false);
      setOtpCountdown(0);
      setFormErrors({ phone: "", otp: "" });
    };
  }, []);

  const validatePhone = (phoneNumber) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneNumber) {
      return "Phone number is required";
    }
    if (!phoneRegex.test(phoneNumber)) {
      return "Please enter a valid phone number with country code";
    }
    return "";
  };

  const validateOtp = (otpValue) => {
    if (!otpValue) {
      return "OTP is required";
    }
    if (!/^\d{6}$/.test(otpValue)) {
      return "OTP must be a 6-digit number";
    }
    return "";
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    
    const phoneError = validatePhone(phone);
    if (phoneError) {
      setFormErrors(prev => ({ ...prev, phone: phoneError }));
      return;
    }

    try {
      const success = await loginWithPhone(phone);
      if (success) {
        setIsOtpSent(true);
        setOtpCountdown(60);
        setFormErrors({ phone: "", otp: "" });
      }
    } catch (err) {
      setFormErrors(prev => ({
        ...prev,
        phone: err.message || "Failed to send OTP. Please try again."
      }));
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const otpError = validateOtp(otp);
    if (otpError) {
      setFormErrors(prev => ({ ...prev, otp: otpError }));
      return;
    }

    try {
      await verifyOtpForLogin(phone, otp);
      setFormErrors({ phone: "", otp: "" });
    } catch (err) {
      setFormErrors(prev => ({
        ...prev,
        otp: err.message || "Invalid OTP. Please try again."
      }));
    }
  };

  const handleResendOtp = async () => {
    if (otpCountdown > 0 || authLoading) return;

    const phoneError = validatePhone(phone);
    if (phoneError) {
      setFormErrors(prev => ({ ...prev, phone: phoneError }));
      return;
    }

    try {
      const success = await loginWithPhone(phone);
      if (success) {
        setOtpCountdown(60);
        setFormErrors({ phone: "", otp: "" });
      }
    } catch (err) {
      setFormErrors(prev => ({
        ...prev,
        phone: err.message || "Failed to resend OTP. Please try again."
      }));
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 px-6 py-8 sm:px-10 md:px-20 lg:pl-40 min-h-screen">
      <div className="w-full space-y-8 max-w-md">
        <div className="flex justify-center sm:justify-start">
          <Image
            src="/Assets/Images/Logos/Navkar-logo3.png"
            alt="Navkar Logo"
            width={100}
            height={100}
            priority
            className="object-contain"
          />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center sm:text-left">
          Login to Your Account
        </h2>

        {error && (
          <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            {error}
          </div>
        )}

        {!isOtpSent ? (
          <form className="space-y-6" onSubmit={handleRequestOtp} noValidate>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+919876543210"
                required
                className={`mt-2 w-full px-4 py-3 border ${
                  formErrors.phone ? "border-red-500" : "border-gray-300"
                } rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors`}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (formErrors.phone) {
                    setFormErrors(prev => ({ ...prev, phone: "" }));
                  }
                }}
                disabled={authLoading}
                aria-invalid={formErrors.phone ? "true" : "false"}
                aria-describedby={formErrors.phone ? "phone-error" : undefined}
              />
              {formErrors.phone && (
                <p className="mt-1 text-xs text-red-600" id="phone-error">
                  {formErrors.phone}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white font-semibold rounded-full hover:bg-accent transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={authLoading}
            >
              {authLoading ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner className="w-5 h-5" />
                    <span>Sending...</span>
                  </div>
                ) : "Request OTP"}
            </button>
          </form>
        ) : (
          <form className="space-y-6" onSubmit={handleVerifyOtp} noValidate>
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="Enter 6-digit OTP"
                required
                maxLength={6}
                className={`mt-2 w-full px-4 py-3 border ${
                  formErrors.otp ? "border-red-500" : "border-gray-300"
                } rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors`}
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setOtp(value);
                  if (formErrors.otp) {
                    setFormErrors(prev => ({ ...prev, otp: "" }));
                  }
                }}
                disabled={authLoading}
                aria-invalid={formErrors.otp ? "true" : "false"}
                aria-describedby={formErrors.otp ? "otp-error" : undefined}
              />
              {formErrors.otp && (
                <p className="mt-1 text-xs text-red-600" id="otp-error">
                  {formErrors.otp}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                className={`text-sm text-accent underline hover:text-accent-dark transition-colors ${
                  authLoading || otpCountdown > 0
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                onClick={handleResendOtp}
                disabled={authLoading || otpCountdown > 0}
              >
                {authLoading
                  ? "Sending..."
                  : otpCountdown > 0
                  ? `Resend OTP (${otpCountdown}s)`
                  : "Resend OTP"}
              </button>
              <button
                type="submit"
                className="py-2 px-6 bg-primary text-white font-semibold rounded-full hover:bg-accent transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={authLoading}
              >
                {authLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Verifying...</span>
                  </div>
                ) : "Verify OTP"}
              </button>
            </div>
          </form>
        )}

        <div className="flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">Or continue with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex justify-center items-center w-full py-3 px-4 border border-gray-300 text-primary text-sm rounded-full hover:bg-gray-100 gap-3 font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={authLoading}
        >
          <FaGoogle className="h-5 w-5 text-primary" />
          Login with Google
        </button>

        <p className="text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-accent hover:text-accent-dark transition-colors"
          >
            Register
          </Link>
        </p>

        <p className="text-xs text-center text-gray-500">
          By logging in, you agree to our{" "}
          <Link href="/terms" className="underline text-accent hover:text-accent-dark transition-colors">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline text-accent hover:text-accent-dark transition-colors">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default LoginLeft;
