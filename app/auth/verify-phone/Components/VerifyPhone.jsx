// src/app/auth/verify-phone/page.jsx

"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/Contexts/Auth/AuthContext";
import Link from "next/link";
import withAuth from "@/app/RouteProtector/withVerifiedUser";
import Image from "next/image";

function VerifyPhone() {
  const {
    user,
    authLoading,
    error,
    sendOtpForPhoneVerification,
    verifyOtpForPhoneVerification,
  } = useAuth();
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [localError, setLocalError] = useState("");
  const [otpCountdown, setOtpCountdown] = useState(0);

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

  // Function to handle sending OTP
  const handleSendOtp = async () => {
    if (!user?.phone) {
      setLocalError("No phone number found. Please complete your profile.");
      return;
    }

    setIsSendingOtp(true);
    setLocalError("");
    setSuccessMessage("");

    try {
      const success = await sendOtpForPhoneVerification(user.phone);
      if (success) {
        setSuccessMessage("OTP sent successfully to your phone.");
        setOtpCountdown(60); // Start 60 seconds countdown
      }
    } catch (err) {
      setLocalError(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Function to handle verifying OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLocalError("");
    setSuccessMessage("");

    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      setLocalError("OTP must be a 6-digit number.");
      return;
    }

    setIsVerifyingOtp(true);

    try {
      const success = await verifyOtpForPhoneVerification(user.phone, otp);
      if (success) {
        setSuccessMessage("Phone number verified successfully.");
        setOtp("");
      }
    } catch (err) {
      setLocalError(err.response?.data?.message || "Failed to verify OTP.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/">
            <Image
              className="object-contain transition-transform hover:scale-105"
              src="/Assets/Images/Logos/Navkar-logo3.png"
              alt="Navkar Logo"
              width={100}
              height={100}
              priority
            />
          </Link>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg shadow-md dark:bg-green-200 animate-fadeIn">
            {successMessage}
          </div>
        )}

        {/* Error Messages */}
        {(error || localError) && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg shadow-md dark:bg-red-200 animate-fadeIn">
            {error || localError}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl px-8 py-8 backdrop-blur-sm bg-opacity-90">
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
            Your phone number:{" "}
            <span className="font-semibold text-primary dark:text-primary-light">
              {user?.phone}
            </span>
          </p>

          {/* Send OTP Button */}
          {!user?.isPhoneVerified && (
            <>
              {" "}
              <h2 className="mt-6 text-3xl font-extrabold text-center text-primary">
                Verify Your Phone
              </h2>
              <div className="mb-8">
                <button
                  onClick={handleSendOtp}
                  className={`w-full py-3 px-6 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 ${
                    isSendingOtp || authLoading || otpCountdown > 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={isSendingOtp || authLoading || otpCountdown > 0}
                >
                  {isSendingOtp ? (
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
                      Sending...
                    </span>
                  ) : otpCountdown > 0 ? (
                    `Resend OTP in ${otpCountdown}s`
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </div>
            </>
          )}

          {/* OTP Verification Form */}
          {user?.isPhoneVerified ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <svg
                  className="w-16 h-16 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-green-600 dark:text-green-400 font-semibold text-lg">
                Your phone number is verified!
              </p>
            </div>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  required
                  pattern="^\d{6}$"
                  title="OTP must be a 6-digit number."
                  className={`mt-1 block w-full px-4 py-3 border-2 ${
                    localError
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white transition-colors duration-200`}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={isVerifyingOtp || authLoading}
                  aria-invalid={localError ? "true" : "false"}
                  aria-describedby={localError ? "otp-error" : null}
                />
                {localError && (
                  <p
                    className="mt-2 text-sm text-red-600 dark:text-red-400"
                    id="otp-error"
                  >
                    {localError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className={`w-full py-3 px-6 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 ${
                  isVerifyingOtp || authLoading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={isVerifyingOtp || authLoading}
              >
                {isVerifyingOtp ? (
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
            </form>
          )}

          {/* Navigation Links */}
          <div className="mt-8 text-center">
            <Link
              href="/dashboard"
              className="text-accent hover:text-accent-dark dark:text-accent-light dark:hover:text-accent font-medium transition duration-200"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(VerifyPhone);
