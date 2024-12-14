// src/Pages/account/my-account.jsx

"use client";

import React from "react";
import { useAuth } from "@/app/Contexts/Auth/AuthContext";
import withAuth from "@/app/RouteProtector/withAuth";

function MyAccount() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen px-6 py-4">
      <h2 className="text-2xl font-bold text-primary">My Account</h2>

      <div className="mt-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-secondary">Personal Info</h3>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Gender: {user.gender}</p>
          <p>Birth Date: {new Date(user.birthDate).toLocaleDateString()}</p>
          <p>Email Verified: {user.isEmailVerified ? "Yes" : "No"}</p>
          <p>Phone Verified: {user.isPhoneVerified ? "Yes" : "No"}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-secondary">Addresses</h3>
          {user.addresses && user.addresses.length > 0 ? (
            user.addresses.map((address, index) => (
              <div key={index} className="p-4 border border-border rounded-lg mb-4">
                <p>Type: {address.type}</p>
                <p>Full Name: {address.fullName}</p>
                <p>Street: {address.street}</p>
                <p>City: {address.city}</p>
                <p>State: {address.state}</p>
                <p>Postal Code: {address.postalCode}</p>
                <p>Country: {address.country}</p>
                <p>Phone: {address.phone}</p>
              </div>
            ))
          ) : (
            <p>No addresses added.</p>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default withAuth(MyAccount);
