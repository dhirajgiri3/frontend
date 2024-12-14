// src/app/auth/verify-email/page.jsx

"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/Contexts/Auth/AuthContext";

function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { verifyEmailFromLink, authLoading, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      if (token) {
        const success = await verifyEmailFromLink(token);
        if (!success) {
          // Optionally handle failure
        }
      } else {
        alert("Invalid verification link.");
        router.push("/auth/login");
      }
    };
    verify();
  }, [token, verifyEmailFromLink, router]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Verifying your email...</p>
      </div>
    );
  }

  // Optionally display error if verification failed
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
      </div>
    );
  }

  return null; // Redirection handled in useEffect
}

export default VerifyEmailPage;
