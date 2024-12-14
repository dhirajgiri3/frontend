import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/app/Contexts/Auth/AuthContext";

function HeaderOptions() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to logout");
    }
  };

  return (
    <div className="flex gap-6">
      <div
        className="flex flex-col items-center profile hover:text-accent transition-all duration-300"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.2}
          stroke={`var(--${isDropdownOpen ? "accent" : "primary"})`}
          className="size-6 transition-colors duration-300 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>

        <p
          className={`text-xs ${
            isDropdownOpen ? "text-accent" : "text-primary"
          } font-semibold cursor-pointer`}
        >
          Profile
        </p>

        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 top-[5rem] bg-bg shadow w-[18rem] rounded-lg p-4 before:absolute before:content-[''] before:w-12 before:h-8 transform before:bg-transparent before:left-1/2 before:top-[-2rem] before:translate-x-[-50%]"
          >
            {user ? (
              <>
                <div className="font-semibold text-md text-primary">
                  {user.isProfileCompleted ? (
                    `Welcome ${user.firstName} ${user.lastName}`
                  ) : (
                    <div>
                      Welcome {user.phone}
                      <br />
                      <p className="text-xs text-secondary mt-1">
                        Please complete your profile to access all features -{" "}
                        <Link className="text-accent" href="/auth/complete-profile">
                          Click Here
                        </Link>
                      </p>
                    </div>
                  )}
                </div>
                <hr className="my-2 py-1 border-t border-border" />

                {!user.isEmailVerified && (
                  <>
                    <p className="text-xs text-secondary mt-1">
                      Please verify your email to access all features -{" "}
                      <Link className="text-accent" href="/auth/send-verification-email">
                        Click Here
                      </Link>
                    </p>
                    <hr className="my-2 py-1 border-t border-border" />
                  </>
                )}

                <ul className="space-y-2 text-sm text-primary mt-4">
                  <li className="w-fit mb-5">
                    <button
                      onClick={handleLogout}
                      className="hover:text-bg hover:bg-accent hover:border-accent text-accent font-semibold text-sm py-2 px-6 border border-border rounded-md w-fit transition-all duration-300 cursor-pointer"
                    >
                      Logout
                    </button>
                  </li>

                  <hr className="my-8 py-1 border-t border-border" />

                  <li className="hover:text-accent text-primary text-sm">
                    <Link href="/orders">Orders</Link>
                  </li>
                  <li className="hover:text-accent text-primary text-sm">
                    <Link href="/wishlist">Wishlist</Link>
                  </li>
                  <li className="hover:text-accent text-primary text-sm">
                    <Link href="/gift-cards">Gift Cards</Link>
                  </li>

                  <hr className="my-8 py-1 border-t border-border" />

                  <li className="hover:text-accent text-primary text-sm">
                    <Link href="/coupons">Coupons</Link>
                  </li>
                  <li className="hover:text-accent text-primary text-sm">
                    <Link href="/saved-cards">Saved Cards</Link>
                  </li>
                  <li className="hover:text-accent text-primary text-sm">
                    <Link href="/saved-vpa">Saved VPA</Link>
                  </li>
                  <li className="hover:text-accent text-primary text-sm">
                    <Link href="/saved-addresses">Saved Addresses</Link>
                  </li>
                </ul>
              </>
            ) : (
              <div>
                <p className="font-semibold text-md text-primary mb-4">Welcome Guest</p>
                <Link
                  className="hover:text-bg hover:bg-accent hover:border-accent text-accent font-semibold text-sm py-2 px-6 border border-border rounded-md w-fit transition-all duration-300 cursor-pointer"
                  href="/auth/login"
                >
                  Login / Signup
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
      <Link href={user ? "/wishlist" : "/auth/login"} className="flex flex-col gap-0.5 items-center wishlist hover:text-accent transition-all duration-300 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.2}
          stroke="var(--primary)"
          className="size-6 transition-colors duration-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
        <p className="text-xs text-primary font-semibold">Wishlist</p>
      </Link>
      <Link href={user ? "/cart" : "/auth/login"} className="flex flex-col items-center gap-0.5 cart hover:text-accent transition-all duration-300 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.2}
          stroke="var(--primary)"
          className="size-6 transition-colors duration-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        <p className="text-xs text-primary font-semibold">Your Bag</p>
      </Link>
    
    </div>
  );
}

export default HeaderOptions;
