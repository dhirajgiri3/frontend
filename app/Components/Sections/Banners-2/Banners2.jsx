import Image from "next/image";
import React from "react";
import banner1 from "@/Public/Assets/Images/Navkar-banner/5.png";
import banner2 from "@/Public/Assets/Images/Navkar-banner/6.png";
import Link from "next/link";

function Banners2() {
  return (
    <div className="w-full max-w-[95vw] mx-auto h-[85vh] mt-12">
      <div className="w-full h-full grid grid-cols-2 gap-1">
        <Link href="/" className="relative group overflow-hidden">
          <Image
            src={banner1}
            alt="banner1"
            fill
            quality={100}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </Link>
        <Link href="/" className="relative group overflow-hidden">
          <Image
            src={banner2}
            alt="banner2"
            fill
            quality={100}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </Link>
      </div>
    </div>
  );
}

export default Banners2;
