// src/Pages/auth/register.jsx
"use client";

import React from "react";
import RegisterLeft from "./RegisterLeft";
import AuthRight from "../../Common/AuthRight";
import guestOnlyRoute from "@/app/RouteProtector/guestOnlyRoute";

function Register() {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      {/* Left Side */}
      <div className="flex-1">
        <RegisterLeft />
      </div>

      {/* Right Side */}
      <div className="hidden sm:flex flex-1 justify-center items-center border-l border-dashed border-border">
        <AuthRight
          title={
            <>
              Join the <span className="text-accent">Navkar Selection</span>{' '}
              family today!
            </>
          }
          description={
            <>
              Create your <span className="text-accent">Navkar Selection</span>{' '}
              account to enjoy exclusive deals and personalized recommendations
              just for you.
            </>
          }
        />
      </div>
    </div>
  );
}

export default guestOnlyRoute(Register);
