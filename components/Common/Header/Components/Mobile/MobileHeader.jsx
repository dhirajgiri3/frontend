// components/MobileHeader.js

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/Public/Assets/Images/Logos/Navkar-logo3.png";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MenuIcon, ArrowLeftIcon, XIcon } from "lucide-react";
import { menuData } from "@/app/Data/menuData";

function MobileHeader() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // null means main menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to handle opening a submenu
  const openSubMenu = (menu) => {
    setActiveMenu(menu);
  };

  // Function to handle going back to the main menu
  const goBack = () => {
    setActiveMenu(null);
  };

  return (
    <div className="shadow fixed top-0 left-0 right-0 z-50 bg-white dark:bg-bg">
      <div className="flex justify-between items-center px-4 py-3">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-primary focus:outline-none"
        >
          <MenuIcon className="h-8 w-8" />
        </button>

        <Link href="/">
          <Image
            src={Logo}
            alt="Navkar Logo"
            quality={90}
            width={90}
            height={90}
            className="object-contain"
          />
        </Link>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="profile-icon focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.2}
              stroke="currentColor"
              className="size-8 transition-colors duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 top-[3rem] right-0 bg-bg shadow w-[18rem] rounded-lg p-4"
            >
              <p className="font-semibold text-md text-primary">Welcome</p>
              <p className="text-xs text-gray-500 mb-4">
                To access account and manage orders
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="w-fit mb-5">
                  <Link
                    className="hover:text-primary hover:bg-accent hover:text-white hover:border-accent text-accent font-semibold text-sm cursor-pointer py-2 px-6 border border-border rounded-md w-fit transition-all duration-300"
                    href="/login"
                  >
                    Login / Signup
                  </Link>
                </li>
                <hr className="my-8 py-1 border-t border-border" />
                <li className="hover:text-accent text-sm cursor-pointer">
                  <Link href="/orders">Orders</Link>
                </li>
                <li className="hover:text-accent text-sm cursor-pointer">
                  <Link href="/wishlist">Wishlist</Link>
                </li>
                <li className="hover:text-accent text-sm cursor-pointer">
                  <Link href="/gift-cards">Gift Cards</Link>
                </li>

                <hr className="my-8 py-1 border-t border-border" />

                <li className="hover:text-accent text-sm cursor-pointer">
                  <Link href="/coupons">Coupons</Link>
                </li>
                <li className="hover:text-accent text-sm cursor-pointer">
                  <Link href="/saved-cards">Saved Cards</Link>
                </li>
                <li className="hover:text-accent text-sm cursor-pointer">
                  <Link href="/saved-vpa">Saved VPA</Link>
                </li>
                <li className="hover:text-accent text-sm cursor-pointer">
                  <Link href="/saved-addresses">Saved Addresses</Link>
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 bottom-0 w-3/4 bg-white dark:bg-bg shadow-lg z-50 overflow-y-auto hide-scrollbar"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              {/* Back Button */}
              {activeMenu && (
                <button
                  onClick={goBack}
                  className="flex items-center text-primary focus:outline-none"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-2" />
                  Back
                </button>
              )}

              {/* Close Button */}
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-primary focus:outline-none"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Breadcrumbs */}
            <div className="p-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink className="cursor-pointer" onClick={goBack}>
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {activeMenu && (
                    <>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>{activeMenu.title}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* Menu Content */}
            <div className="p-4 overflow-y-auto hide-scrollbar py-2">
              {/* Main Menu */}
              {!activeMenu && (
                <ul className="space-y-4">
                  {menuData.map((menu) => (
                    <li key={menu.title}>
                      <button
                        onClick={() => openSubMenu(menu)}
                        className="flex justify-between items-center w-full text-primary font-semibold text-md hover:text-accent transition-colors duration-200 focus:outline-none"
                      >
                        {menu.title}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* Submenu */}
              {activeMenu && (
                <motion.div
                  key="submenu"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <ul className="space-y-4">
                    {Object.entries(activeMenu.submenus).map(
                      ([category, items]) => (
                        <li key={category}>
                          <h3 className="text-sm text-accent font-semibold mb-2">
                            {category}
                          </h3>
                          <ul className="space-y-1 pl-4">
                            {items.length > 0 ? (
                              items.map((item) => (
                                <li key={item}>
                                  <Link
                                    href={`/${item
                                      .toLowerCase()
                                      .replace(/ & /g, "-")
                                      .replace(/ /g, "-")}`}
                                    className="text-xs text-secondary hover:text-accent transition-colors duration-200"
                                    onClick={() => setIsSidebarOpen(false)}
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))
                            ) : (
                              <li>
                                <span className="text-sm text-secondary">
                                  Coming Soon
                                </span>
                              </li>
                            )}
                          </ul>
                        </li>
                      )
                    )}
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MobileHeader;
