"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/Contexts/Auth/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

function SendVerificationEmail() {
  const { user, authLoading, error, sendVerificationEmail, clearError } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");
  const [localError, setLocalError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let timer;
    if (successMessage && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [successMessage, resendTimer]);

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const handleSendVerificationEmail = async () => {
    if (!user?.email) {
      setLocalError("No email address found. Please complete your profile first.");
      return;
    }

    if (resendTimer > 0) {
      setLocalError(`Please wait ${resendTimer} seconds before requesting another email.`);
      return;
    }

    setLocalError("");
    setSuccessMessage("");
    clearError();

    try {
      const success = await sendVerificationEmail();
      if (success) {
        setSuccessMessage("Verification email sent! Please check your inbox and spam folder.");
        setResendTimer(60);
      }
    } catch (err) {
      setLocalError(
        err.response?.data?.message || 
        "Failed to send verification email. Please try again later."
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center"
    >
      <div className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {user?.isEmailVerified && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="max-w-md mx-auto mb-8 p-6 bg-green-50/30 backdrop-blur-sm border border-green-100 rounded-lg 
                dark:bg-green-900/10 dark:border-green-800/30"
            >
              <div className="flex items-center space-x-4">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
                <p className="text-green-700 dark:text-green-300 font-medium">
                  Your email has been verified successfully!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-100 
            dark:border-gray-700/30"
        >
          <div className="p-8">
            <motion.div
              className="flex justify-center mb-10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href="/" aria-label="Go to homepage">
                <Image
                  className="object-contain"
                  src="/Assets/Images/Logos/Navkar-logo3.png"
                  alt="Navkar Logo"
                  width={100}
                  height={100}
                  priority
                />
              </Link>
            </motion.div>

            <AnimatePresence mode="wait">
              {successMessage && (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="mb-6 p-4 bg-green-50/50 border-l-2 border-green-400 rounded-lg 
                    dark:bg-green-900/20 dark:border-green-500"
                >
                  <p className="text-green-700 dark:text-green-300">
                    {successMessage}
                  </p>
                  {resendTimer > 0 && (
                    <motion.p
                      className="mt-2 text-green-600/80 dark:text-green-400/80"
                      animate={{ opacity: [0.7, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      You can request another email in {resendTimer}s
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {(error || localError) && (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="mb-6 p-4 bg-red-50/50 border-l-2 border-red-400 rounded-lg 
                    dark:bg-red-900/20 dark:border-red-500"
                >
                  <p className="text-red-700 dark:text-red-300">
                    {error || localError}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {!user?.isEmailVerified ? (
              <div className="space-y-6">
                <motion.h1
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-3xl font-medium text-gray-900 dark:text-white text-center"
                >
                  Verify Your Email
                </motion.h1>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="p-6 bg-gray-50/30 dark:bg-gray-700/30 backdrop-blur-sm rounded-lg"
                >
                  <p className="text-gray-700 dark:text-gray-200 mb-4">
                    Please verify your email address:
                    <span className="block mt-2 font-medium text-primary dark:text-white break-all 
                      bg-white/30 dark:bg-gray-600/30 p-3 rounded-lg">
                      {user?.email || "Not Found"}
                    </span>
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleSendVerificationEmail}
                    className={`w-full py-3 px-6 bg-accent text-white font-medium rounded-lg transition-colors
                      ${authLoading || !user?.email || resendTimer > 0 
                        ? "opacity-50 cursor-not-allowed" 
                        : "hover:bg-accentDark"}`}
                    disabled={authLoading || !user?.email || resendTimer > 0}
                  >
                    {authLoading ? (
                      <span className="flex items-center justify-center">
                        <motion.svg
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 mr-2"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </motion.svg>
                        Sending...
                      </span>
                    ) : resendTimer > 0 ? (
                      `Wait ${resendTimer}s to resend`
                    ) : (
                      "Send Verification Email"
                    )}
                  </motion.button>
                </motion.div>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <Link
                    href="/"
                    className="inline-block text-accent hover:text-accentDark dark:text-accent 
                      dark:hover:text-accentHover font-medium transition-colors"
                  >
                    Return to Homepage
                  </Link>
                </motion.div>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-6"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg
                    className="w-20 h-20 mx-auto text-green-500"
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
                </motion.div>

                <h2 className="text-3xl font-medium text-green-600 dark:text-green-400">
                  Email Verified Successfully!
                </h2>

                <p className="text-gray-600 dark:text-gray-300">
                  Your email has been verified. You now have full access to all features.
                </p>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Link
                    href="/dashboard"
                    className="inline-block px-8 py-3 bg-accent hover:bg-accentDark text-white 
                      font-medium rounded-lg transition-colors"
                  >
                    Continue to Dashboard
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default SendVerificationEmail;
