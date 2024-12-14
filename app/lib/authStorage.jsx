// src/app/lib/authStorage.js

/**
 * Retrieves the access token from localStorage.
 * @returns {string|null} - The access token or null if not found.
 */
export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

/**
 * Stores the access token in localStorage.
 * @param {string|null} token - The access token to store or null to remove it.
 */
export const setAccessToken = (token) => {
  if (typeof window !== "undefined") {
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  }
};

/**
 * Clears the access token from localStorage.
 */
export const clearAccessToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
  }
};

/**
 * Clears authentication tokens by:
 * - Logging out via the backend.
 * - Clearing the access token from localStorage.
 */
export const clearAuthTokens = async () => {
  try {
    const accessToken = getAccessToken(); // Retrieve before clearing

    if (accessToken) {
      // Call logout endpoint to clear refresh token cookie
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include", // Required for cookies
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // Empty body as refreshToken is in cookies
      });
    }
  } catch (error) {
    console.error("Error clearing auth tokens:", error);
  } finally {
    // Clear access token from localStorage regardless of logout success
    clearAccessToken();
  }
};
