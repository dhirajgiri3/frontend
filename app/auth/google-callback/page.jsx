//app/auth/google-callback/page.jsx

"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/Contexts/Auth/AuthContext';

const GoogleCallback = () => {
  const router = useRouter();
  const { verifyEmailFromLink, setAccessToken, setRefreshToken, fetchCurrentUser } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const { accessToken, refreshToken } = router.query;

      if (accessToken && refreshToken) {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        await fetchCurrentUser();
        router.push('/dashboard');
      } else {
        router.push('/auth/login');
      }
    };

    if (router.query) {
      handleCallback();
    }
  }, [router.query]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="mb-4">
          <div className="w-16 h-16 mx-auto border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Authenticating
        </h2>
        <p className="text-gray-600">
          Please wait while we complete your sign-in...
        </p>
      </div>
    </div>
  );
};

export default GoogleCallback;