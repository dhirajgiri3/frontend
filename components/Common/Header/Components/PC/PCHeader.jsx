// Components/PC/PCHeader.js

"use client";

import React from "react";
import Logo from "@/Public/Assets/Images/Logos/Navkar-logo3.png";
import Image from "next/image";
import SearchInput from "./SearchInput";
import HeaderOptions from "./HeaderOptions";
import Link from "next/link";
import HoverMegaMenu from "./HoverMegaMenu";

function PCHeader() {
  return (
    <div className="shadow fixed top-0 left-0 right-0 z-50 flex justify-evenly items-center px-10 py-4 mx-auto gap-16 bg-white dark:bg-bg">
      <div className="flex items-center gap-16">
        <Link href="/">
          <Image
            src={Logo}
            alt="Navkar Logo"
            quality={100}
            width={100}
            height={100}
            loading="eager"
          />
        </Link>
        <HoverMegaMenu />
      </div>
      <div className="flex items-center gap-16">
        <SearchInput />
        <HeaderOptions />
      </div>
    </div>
  );
}

export default PCHeader;
