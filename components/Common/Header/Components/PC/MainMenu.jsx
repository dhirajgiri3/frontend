// components/MainMenu.js

import Link from "next/link";
import React, { useState } from "react";
import { menuData } from "@/app/Data/menuData";
import MegaMenu from "./Megamenu";

const MainMenu = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMouseEnter = (index) => {
    setActiveMenu(index);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <nav className="relative bg-white dark:bg-bg">
      <div className="max-w-[100vw] w-full mx-auto">
        <div className="flex justify-center items-center">
          <ul className="flex space-x-8">
            {menuData.map((menu, index) => (
              <li
                key={menu.title}
                className="relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={menu.link}
                  className="text-sm text-primary hover:text-accent font-semibold transition-colors duration-300"
                >
                  {menu.title}
                </Link>
                <MegaMenu
                  isOpen={activeMenu === index}
                  submenus={menu.submenus}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainMenu;
