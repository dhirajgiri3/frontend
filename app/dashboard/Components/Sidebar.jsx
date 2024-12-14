// components/Sidebar.jsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineSetting,
  AiOutlineClose,
} from "react-icons/ai";
import { FaShippingFast, FaUsers, FaBars } from "react-icons/fa";
import { BsCardChecklist } from "react-icons/bs";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styled from "styled-components";
import logo from "@/Public/Assets/Images/Logos/Navkar-logo3.png";
import Image from "next/image";

const SidebarContainer = styled(motion.div)`
  width: 16rem;
  background-color: white;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative; /* Changed to relative */
  top: 0;
  left: 0;
  z-index: 50;

  &::-webkit-scrollbar {
    display: block;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  @media (min-width: 1024px) {
    /* Keep position relative to maintain full viewport height */
    position: relative; /* Changed to relative */
    height: 100vh;
    overflow-y: auto;

    /* Remove overflow: visible to allow scrolling */
    /* overflow: visible; */ /* Removed */

    &::-webkit-scrollbar {
      display: block;
    }
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 40;
`;

const ToggleButton = styled(motion.button)`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 40;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const Sidebar = () => {
  const [openSubmenus, setOpenSubmenus] = useState({
    products: false,
    orders: false,
    sellers: false,
    invoice: false,
    shipping: false,
    coupons: false,
    reviews: false,
    brands: false,
    statistics: false,
    localization: false,
    accounts: false,
    multiLevel: false,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const toggleSubmenu = (menu) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: <AiOutlineDashboard className="text-xl mr-3" />,
      to: "/dashboard",
    },
    {
      label: "Products",
      icon: <AiOutlineShoppingCart className="text-xl mr-3" />,
      submenu: [
        { label: "List View", to: "/products/list" },
        { label: "Grid View", to: "/products/grid" },
        { label: "Overview", to: "/products/overview" },
        { label: "Create Product", to: "/products/create" },
        { label: "Categories", to: "/products/categories" },
        { label: "Sub Categories", to: "/products/sub-categories" },
      ],
      key: "products",
    },
    {
      label: "Orders",
      icon: <AiOutlineCalendar className="text-xl mr-3" />,
      submenu: [
        { label: "Order List", to: "/orders/list" },
        { label: "Order Calendar", to: "/orders/calendar" },
      ],
      key: "orders",
    },
    {
      label: "Calendar",
      icon: <AiOutlineCalendar className="text-xl mr-3" />,
      to: "/calendar",
    },
    {
      label: "Sellers",
      icon: <FaUsers className="text-xl mr-3" />,
      submenu: [
        { label: "Seller List", to: "/sellers/list" },
        { label: "Seller Reports", to: "/sellers/reports" },
      ],
      key: "sellers",
    },
    {
      label: "Invoice",
      icon: <AiOutlineMail className="text-xl mr-3" />,
      submenu: [
        { label: "Generate Invoice", to: "/invoice/generate" },
        { label: "Invoice History", to: "/invoice/history" },
      ],
      key: "invoice",
    },
    {
      label: "Users List",
      icon: <AiOutlineUser className="text-xl mr-3" />,
      to: "/users",
    },
    {
      label: "Shipping",
      icon: <FaShippingFast className="text-xl mr-3" />,
      submenu: [
        { label: "Shipping Options", to: "/shipping/options" },
        { label: "Track Shipments", to: "/shipping/track" },
      ],
      key: "shipping",
    },
    {
      label: "Coupons",
      icon: <AiOutlineMail className="text-xl mr-3" />,
      submenu: [
        { label: "Active Coupons", to: "/coupons/active" },
        { label: "Expired Coupons", to: "/coupons/expired" },
        { label: "Create New Coupon", to: "/coupons/create" },
      ],
      key: "coupons",
    },
    {
      label: "Reviews & Ratings",
      icon: <BsCardChecklist className="text-xl mr-3" />,
      submenu: [
        { label: "All Reviews", to: "/reviews/all" },
        { label: "Ratings Overview", to: "/reviews/overview" },
      ],
      key: "reviews",
    },
    {
      label: "Brands",
      icon: <AiOutlineSetting className="text-xl mr-3" />,
      submenu: [
        { label: "All Brands", to: "/brands/all" },
        { label: "Add New Brand", to: "/brands/add" },
      ],
      key: "brands",
    },
    {
      label: "Statistics",
      icon: <AiOutlineSetting className="text-xl mr-3" />,
      submenu: [
        { label: "Overview", to: "/statistics/overview" },
        { label: "Revenue", to: "/statistics/revenue" },
        { label: "Conversion Rate", to: "/statistics/conversion" },
      ],
      key: "statistics",
    },
    {
      label: "Localization",
      icon: <AiOutlineSetting className="text-xl mr-3" />,
      submenu: [
        { label: "Languages", to: "/localization/languages" },
        { label: "Currencies", to: "/localization/currencies" },
      ],
      key: "localization",
    },
    {
      label: "Account",
      icon: <AiOutlineUser className="text-xl mr-3" />,
      submenu: [
        { label: "Account Overview", to: "/accounts/overview" },
        { label: "Account Settings", to: "/accounts/settings" },
      ],
      key: "accounts",
    },
    {
      label: "Components",
      icon: <AiOutlineSetting className="text-xl mr-3" />,
      to: "/components",
    },
    {
      label: "Multi Level",
      icon: <BsCardChecklist className="text-xl mr-3" />,
      submenu: [
        { label: "Version 1.0", to: "/multi-level/v1" },
        { label: "Advanced Options", to: "/multi-level/advanced" },
      ],
      key: "multiLevel",
    },
  ];

  const submenuVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  // Close sidebar on window resize if it's desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial state
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Toggle Button for Mobile & Tablet */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <ToggleButton
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open Sidebar Menu"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaBars />
          </ToggleButton>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <Overlay
            onClick={() => setIsSidebarOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <SidebarContainer
        initial={{ x: "-100%" }}
        animate={{
          x: isSidebarOpen || isDesktop ? "0%" : "-100%",
        }}
        exit={{ x: "-100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="bg-white border-r border-gray-200"
      >
        {/* Close Button for Mobile & Tablet */}
        <div className="flex justify-between items-center p-4 lg:hidden">
          <Image src={logo} alt="Navkar Logo" width={100} height={100} />
          <button
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close Sidebar Menu"
          >
            <AiOutlineClose className="text-xl" />
          </button>
        </div>

        {/* Logo Section for Desktop */}
        <div className="hidden lg:block p-4">
          <Link href="/">
            <Image src={logo} alt="Navkar Logo" width={100} height={100} />
          </Link>
        </div>

        {/* Menu Header */}
        <h3 className="text-gray-500 text-sm font-bold p-4 pb-0">Menu</h3>

        {/* Navigation Menu */}
        <ul className="mt-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              {item.submenu ? (
                <>
                  <div
                    onClick={() => toggleSubmenu(item.key)}
                    className="flex justify-between items-center text-gray-600 hover:text-[#d85271] pl-4 px-6 py-3 cursor-pointer transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <div className="text-sm">
                      {openSubmenus[item.key] ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {openSubmenus[item.key] && (
                      <motion.ul
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={submenuVariants}
                        className="pl-8 overflow-hidden"
                      >
                        {item.submenu.map((subItem) => (
                          <li key={subItem.label}>
                            <Link href={subItem.to} legacyBehavior>
                              <a className="block text-gray-500 hover:text-[#d85271] p-2 transition-colors duration-200 text-sm">
                                {subItem.label}
                              </a>
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link href={item.to} legacyBehavior>
                  <a className="flex items-center text-gray-600 hover:text-[#d85271] pl-4 pr-4 py-3 cursor-pointer transition-colors duration-200">
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </a>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
