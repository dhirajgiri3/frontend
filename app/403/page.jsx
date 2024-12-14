// src/app/403/page.jsx

"use client";

import React from "react";
import Link from "next/link";

function ForbiddenPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-bg px-6 py-4 sm:px-10 md:px-20 lg:px-32">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500">403 Forbidden</h1>
        <p className="text-lg mt-4 text-secondary">
          You do not have permission to access this page.
        </p>
        <Link href="/" className="text-accent underline mt-6 inline-block">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}

export default ForbiddenPage;