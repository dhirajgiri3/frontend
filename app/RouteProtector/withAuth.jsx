// src/app/hocs/withAuth.jsx

"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/app/Contexts/Auth/AuthContext";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/Loaders/LoadingSpinner";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!authLoading && !user) {
        router.push("/auth/login");
      }
    }, [authLoading, user, router]);

    if (authLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <LoadingSpinner />
        </div>
      );
    }

    if (!user) {
      return null; // Render nothing while redirecting
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
