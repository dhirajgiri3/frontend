// src/HOCs/withVerifiedUser.jsx

import React, { useEffect, useMemo } from "react";
import { useAuth } from "@/app/Contexts/Auth/AuthContext";
import { useRouter } from "next/navigation";

const withVerifiedUser = (WrappedComponent) => {
  const VerifiedUserComponent = (props) => {
    const { user, isInitialized } = useAuth();
    const router = useRouter();

    // Memoize verification checks to avoid unnecessary re-renders
    const verificationStatus = useMemo(() => {
      if (!user) return { isVerified: false, redirectPath: "/auth/login" };
      if (!user.isPhoneVerified) return { isVerified: false, redirectPath: "/auth/verify-phone" };
      if (!user.isEmailVerified) return { isVerified: false, redirectPath: "/auth/send-verification-email" };
      return { isVerified: true, redirectPath: null };
    }, [user]);

    useEffect(() => {
      if (isInitialized && !verificationStatus.isVerified) {
        // Store current URL as return destination
        const currentPath = window.location.pathname;
        const redirectUrl = `${verificationStatus.redirectPath}?returnUrl=${encodeURIComponent(currentPath)}`;
        router.push(redirectUrl);
      }
    }, [isInitialized, verificationStatus, router]);

    if (!isInitialized || !verificationStatus.isVerified) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Verifying user status...</p>
          </div>
        </div>
      );
    }

    // Pass verification status as prop
    return <WrappedComponent isVerified={true} {...props} />;
  };

  // Add display name for debugging purposes
  VerifiedUserComponent.displayName = `WithVerifiedUser(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return VerifiedUserComponent;
};

export default withVerifiedUser;