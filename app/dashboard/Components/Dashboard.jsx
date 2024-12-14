"use client";

import React from "react";
import withCompleteProfile from "@/app/RouteProtector/withCompleteProfile";
import Sidebar from "./Sidebar";
import { useAuth } from "@/app/Contexts/Auth/AuthContext";

function Dashboard() {
  const { logout } = useAuth();
  return (
    <div>
      <Sidebar />
      <button className="..." onClick={logout}>
        Logouttt
      </button>
    </div>
  );
}

export default Dashboard;
