// src/app/hocs/WithAdmin.jsx

"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/app/Contexts/Auth/AuthContext";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/Loaders/LoadingSpinner";
import NotAuthorized from "@/components/Common/NotAuthorized/NotAuthorized";

const WithAdmin = (WrappedComponent) => {
  return (props) => {
    const { user, authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (
        !authLoading &&
        user &&
        !["Admin", "SuperAdmin"].includes(user.role)
      ) {
        router.push("/not-authorized");
      }
    }, [authLoading, user, router]);

    if (authLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <LoadingSpinner />
        </div>
      );
    }

    if (user && !["Admin", "SuperAdmin"].includes(user.role)) {
      return <NotAuthorized />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default WithAdmin;
