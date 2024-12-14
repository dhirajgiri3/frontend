// src/app/hocs/guestOnlyRoute.jsx

"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/app/Contexts/Auth/AuthContext";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/Loaders/LoadingSpinner";

const guestOnlyRoute = (WrappedComponent) => {
  return (props) => {
    const { user, authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!authLoading && user) {
        router.push("/dashboard");
      }
    }, [authLoading, user, router]);

    if (user) {
      return null; // Render nothing while redirecting
    }

    return <WrappedComponent {...props} />;
  };
};

export default guestOnlyRoute;
