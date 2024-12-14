"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import banner1 from "@/Public/Assets/Images/Navkar-banner/1.png";
import banner2 from "@/Public/Assets/Images/Navkar-banner/2.png";
import banner3 from "@/Public/Assets/Images/Navkar-banner/3.png";
import banner4 from "@/Public/Assets/Images/Navkar-banner/4.png";
import banner7 from "@/Public/Assets/Images/Navkar-poster.png";

function Banners() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4 w-full max-w-[95vw] mx-auto">
      {/* Large banner taking 2 rows and 2 columns on desktop */}
      <Link 
        href="/" 
        className="relative group h-[300px] sm:h-[400px] lg:h-[800px] lg:row-span-2 lg:col-span-2"
      >
        <Image 
          src={banner1} 
          alt="banner1"
          fill
          className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </Link>
      
      {/* Two banners that stack on mobile/tablet, side by side on desktop */}
      <Link 
        href="/" 
        className="relative group h-[300px] sm:h-[400px] lg:h-[390px]"
      >
        <Image 
          src={banner3} 
          alt="banner2"
          fill
          className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <Link 
        href="/" 
        className="relative group h-[300px] sm:h-[400px] lg:h-[390px]"
      >
        <Image 
          src={banner4} 
          alt="banner3"
          fill
          className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      
      {/* Two banners that stack on mobile/tablet, side by side on desktop */}
      <Link 
        href="/" 
        className="relative group h-[300px] sm:h-[400px] lg:h-[390px]"
      >
        <Image 
          src={banner2} 
          alt="banner4"
          fill
          className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <Link 
        href="/" 
        className="relative group h-[300px] sm:h-[400px] lg:h-[390px]"
      >
        <Image 
          src={banner7} 
          alt="banner5"
          fill
          className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
    </div>
  );
}

export default Banners;
