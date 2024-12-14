"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import sld1 from "@/Public/Assets/Images/Navkar-slider/1.png";
import sld2 from "@/Public/Assets/Images/Navkar-slider/2.png";
import sld3 from "@/Public/Assets/Images/Navkar-slider/3.png";
import sld4 from "@/Public/Assets/Images/Navkar-slider/4.png";
import Link from "next/link";

const slides = [
  {
    id: 1,
    src: sld1,
    link: "/",
  },
  {
    id: 2,
    src: sld3,
    link: "/",
  },
  {
    id: 3,
    src: sld2,
    link: "/",
  },
  {
    id: 4,
    src: sld4,
    link: "/",
  },
];

export function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <div className="relative w-full">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-[250px] md:h-screen max-h-[92.5vh]"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <Link href={slide.link} className="block w-full h-full">
                <Card className="rounded-none border-none shadow-none transition-transform duration-300 hover:scale-[1.01]">
                  <CardContent className="relative p-0 h-[250px] md:h-screen max-h-[92.5vh]">
                    <Image
                      src={slide.src}
                      alt={`hero-carousel-${slide.id}`}
                      fill
                      priority
                      className="object-cover w-full h-full"
                      sizes="(max-width: 768px) 100vw, 100vw"
                      quality={100}
                    />
                    <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 hover:opacity-0" />
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg transition-all duration-300 hover:scale-110 z-10" />
        <CarouselNext className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg transition-all duration-300 hover:scale-110 z-10" />
      </Carousel>
    </div>
  );
}
