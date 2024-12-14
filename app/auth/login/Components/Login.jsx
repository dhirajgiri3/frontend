// src/Pages/auth/login.jsx

"use client";

import React from "react";
import LoginLeft from "@/app/auth/login/Components/LoginLeft";
import LoginRight from "@/app/auth/login/Components/LoginRight";
import guestOnlyRoute from "@/app/RouteProtector/guestOnlyRoute";

function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* Left Side */}
      <div className="flex-1">
        <LoginLeft />
      </div>

      {/* Right Side */}
      <div className="hidden sm:flex flex-1 justify-center items-center border-l border-dashed border-border">
        <LoginRight />
      </div>
    </div>
  );
}

export default guestOnlyRoute(Login);
