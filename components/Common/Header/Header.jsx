// Components/Common/Header/Header.js

"use client";

import React, { useEffect, useState } from "react";
import PCHeader from "./Components/PC/PCHeader";
import MobileHeader from "./Components/Mobile/MobileHeader";

function Header() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 820);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile ? <MobileHeader /> : <PCHeader />;
}

export default Header;
