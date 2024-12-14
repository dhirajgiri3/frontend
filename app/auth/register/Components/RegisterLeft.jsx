// src/app/auth/register/RegisterLeft.jsx

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "@/app/Contexts/Auth/AuthContext";
// import { getGoogleAuthURL } from "@/utils/api"; // Uncomment if needed

function RegisterLeft() {
  // Updated method names to match AuthContext
  const { registerWithPhone, verifyOtpForRegistration, authLoading, error } =
    useAuth();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [formErrors, setFormErrors] = useState({ phone: "", otp: "" });

  // Effect to handle OTP countdown
  useEffect(() => {
    let timer;
    if (otpCountdown > 0) {
      timer = setInterval(() => {
        setOtpCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [otpCountdown]);

  // Function to handle requesting OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setFormErrors({ phone: "", otp: "" });

    const isValid = /^\+?[1-9]\d{1,14}$/.test(phone);
    if (!isValid) {
      setFormErrors((prev) => ({
        ...prev,
        phone: "Please enter a valid phone number with country code.",
      }));
      return;
    }

    const success = await registerWithPhone(phone); // Updated method call
    if (success) {
      setIsOtpSent(true);
      setOtpCountdown(60); // Start 60 seconds countdown
    }
  };

  // Function to handle verifying OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setFormErrors({ phone: "", otp: "" });

    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      setFormErrors((prev) => ({
        ...prev,
        otp: "OTP must be a 6-digit number.",
      }));
      return;
    }

    const success = await verifyOtpForRegistration(phone, otp); // Updated method call
    if (success) {
      // Redirect handled in AuthContext (e.g., redirect to complete profile or dashboard)
    }
  };

  // Function to handle resending OTP
  const resendOtp = async () => {
    const success = await registerWithPhone(phone); // Updated method call
    if (success) {
      setOtpCountdown(60); // Reset countdown
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 px-6 py-8 sm:px-10 md:px-20 lg:pl-40 min-h-screen">
      <div className="w-full space-y-10 max-w-md">
        {/* Logo */}
        <div className="flex justify-center sm:justify-start">
          <Image
            src="/Assets/Images/Logos/Navkar-logo3.png"
            alt="Navkar Logo"
            width={100}
            height={100}
            priority
          />
        </div>

        {/* Heading */}
        <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-primary text-center sm:text-left">
          Register Your Account
        </h2>

        {/* Error Messages */}
        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {/* Request OTP Form */}
        {!isOtpSent ? (
          <form className="space-y-4 sm:space-y-6" onSubmit={handleRequestOtp}>
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
                pattern="^\+?[1-9]\d{1,14}$"
                title="Phone number must be in E.164 format (e.g., +1234567890)"
                className={`mt-2 w-full px-4 py-2 border ${
                  formErrors.phone ? "border-red-500" : "border-gray-300"
                } rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={authLoading}
                aria-invalid={formErrors.phone ? "true" : "false"}
                aria-describedby={formErrors.phone ? "phone-error" : null}
              />
              {formErrors.phone && (
                <p className="mt-1 text-xs text-red-600" id="phone-error">
                  {formErrors.phone}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-primary text-white font-semibold rounded-full hover:bg-accent transition duration-200 disabled:bg-gray-400"
              disabled={authLoading}
            >
              {authLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Sending OTP...
                </span>
              ) : (
                "Request OTP"
              )}
            </button>
          </form>
        ) : (
          /* Verify OTP Form */
          <form className="space-y-4 sm:space-y-6" onSubmit={handleVerifyOtp}>
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
                pattern="^\d{6}$"
                title="OTP must be 6 digits"
                className={`mt-2 w-full px-4 py-2 border ${
                  formErrors.otp ? "border-red-500" : "border-gray-300"
                } rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary`}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={authLoading}
                aria-invalid={formErrors.otp ? "true" : "false"}
                aria-describedby={formErrors.otp ? "otp-error" : null}
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
                className={`text-sm text-accent underline hover:text-accent-dark ${
                  authLoading || otpCountdown > 0
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                onClick={resendOtp}
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
                className="py-2 px-4 bg-primary text-white font-semibold rounded-full hover:bg-accent transition duration-200 disabled:bg-gray-400"
                disabled={authLoading}
              >
                {authLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  "Verify OTP"
                )}
              </button>
            </div>
          </form>
        )}

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">Or continue with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Sign-Up (Optional) */}
        {/* Uncomment and ensure `getGoogleAuthURL` is defined in `api.js` */}
        {/* <a
          href={getGoogleAuthURL()}
          className="w-full block"
          target="_self"
          rel="noopener noreferrer"
        >
          <button
            className="flex justify-center items-center w-full py-2 px-4 border border-gray-300 text-primary text-sm rounded-full hover:bg-gray-100 gap-3 font-semibold transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={authLoading}
          >
            {authLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Signing in...
              </span>
            ) : (
              <>
                <FaGoogle className="h-6 w-6 text-primary" />
                Register with Google
              </>
            )}
          </button>
        </a> */}

        {/* Navigation Links */}
        <p className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-accent hover:text-accent-dark"
          >
            Login
          </Link>
        </p>

        <p className="mt-6 text-xs text-center text-gray-500">
          By registering, you agree to our{" "}
          <Link href="#" className="underline text-accent-dark">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline text-accent-dark">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default RegisterLeft;
