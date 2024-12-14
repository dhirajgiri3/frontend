// app/pages/auth/google/callback.jsx

"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/Contexts/Auth/AuthContext"; // Adjust the import path as needed
import { useRouter } from "next/router";

const GoogleCallback = () => {
  const { verifyGoogleLogin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      const success = await verifyGoogleLogin();
      if (!success) {
        // Handle failed login
        router.push("/auth/login?error=GoogleAuthFailed");
      }
    };

    handleGoogleLogin();
  }, [verifyGoogleLogin, router]);

  return <div>Authenticating with Google...</div>;
};

export default GoogleCallback;
