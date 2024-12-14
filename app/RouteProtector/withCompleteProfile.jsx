// src/HOCs/withCompleteProfile.jsx

import React, { useEffect, useMemo } from "react";
import { useAuth } from "@/app/Contexts/Auth/AuthContext";
import { useRouter } from "next/navigation";

const withCompleteProfile = (WrappedComponent) => {
  // Define required profile fields at HOC level to avoid recreation
  const REQUIRED_PROFILE_FIELDS = [
    "firstName",
    "lastName", 
    "email",
    "phone",
    "dateOfBirth",
    "address",
    "city",
    "country"
  ];

  return (props) => {
    const { user, isInitialized } = useAuth();
    const router = useRouter();

    // Memoize profile completion check
    const isProfileComplete = useMemo(() => {
      if (!user) return false;
      return REQUIRED_PROFILE_FIELDS.every(
        (field) => user[field] && typeof user[field] === 'string' && user[field].trim() !== ""
      );
    }, [user]);

    useEffect(() => {
      if (isInitialized && user && !isProfileComplete) {
        router.push("/auth/complete-profile");
      }
    }, [isInitialized, user, router, isProfileComplete]);

    if (!isInitialized || !user) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    if (!isProfileComplete) {
      return null; // Redirect handled in useEffect
    }

    // Pass profile completion status as prop
    return <WrappedComponent isProfileComplete={isProfileComplete} {...props} />;
  };
};

export default withCompleteProfile;