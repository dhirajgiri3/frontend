// src/pages/complete-profile.jsx

"use client";

import React, { useEffect } from "react";
import CompleteProfileForm from "./CompleteProfileForm";
import { useAuth } from "@/app/Contexts/Auth/AuthContext";
import withAuth from "@/app/RouteProtector/withAuth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function CompleteProfile() {
  const { authLoading, user } = useAuth();
  const router = useRouter();

  // Redirect if profile is already complete
  useEffect(() => {
    if (
      user?.isEmailVerified &&
      user?.isPhoneVerified &&
      user?.email &&
      user?.firstName &&
      user?.lastName
    ) {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="relative">
          {/* Outer spinning ring */}
          <motion.div
            className="w-16 h-16 border-4 border-blue-500 rounded-full"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          {/* Inner pulsing circle */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-8 h-8 bg-blue-400 rounded-full -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 0.4, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Loading text */}
          <motion.p
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-blue-400 font-medium"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Loading...
          </motion.p>
        </div>
      </div>
    );
  }

  return <CompleteProfileForm />;
}

export default withAuth(CompleteProfile);
