// components/ImageGallery.jsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Lens } from "@/components/ui/lens";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const ImageGallery = ({ images, selectedImage, setSelectedImage }) => {
  const nextImage = () => {
    const currentIndex = images.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const previousImage = () => {
    const currentIndex = images.indexOf(selectedImage);
    const previousIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[previousIndex]);
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Main Image */}
      <motion.div
        className="relative w-full h-[550px] overflow-hidden rounded-2xl group bg-zinc-50"
        layoutId="main-image"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full h-[550px] object-cover"
          >
            <Lens>
              <Image
                src={selectedImage}
                alt="Product Image"
                quality={100}
                priority
                height={550}
                width={500}
                className="object-cover h-[550px] w-full transform hover:scale-105 transition-all duration-500 ease-out cursor-zoom-in bg-top bg-no-repeat"
                style={{ objectPosition: "top" }}
              />
            </Lens>

            {/* Zoom indicator */}
            <motion.div 
              className="absolute top-4 right-4 backdrop-blur-md bg-white/30 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.1, rotate: 10 }}
            >
              <ZoomIn className="w-5 h-5" />
            </motion.div>

            {/* Navigation arrows */}
            <motion.button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 backdrop-blur-md bg-white/30 hover:bg-white/50 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
              whileHover={{ x: -2, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 backdrop-blur-md bg-white/30 hover:bg-white/50 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
              whileHover={{ x: 2, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Thumbnail Images */}
      <motion.div
        className="grid grid-cols-5 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, staggerChildren: 0.1 }}
      >
        {images.map((img, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(img)}
                  className={`relative h-24 cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                    selectedImage === img
                      ? "ring-2 ring-black ring-offset-4"
                      : "hover:ring-1 hover:ring-black/30"
                  }`}
                  layoutId={`thumbnail-${index}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover bg-top bg-no-repeat transition-transform duration-500 ease-out"
                    style={{ objectPosition: "top" }}
                    sizes="(max-width: 768px) 20vw, 10vw"
                    loading="lazy"
                  />
                  {selectedImage === img && (
                    <motion.div
                      className="absolute inset-0 bg-black/5 backdrop-blur-[1px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </TooltipTrigger>
              <TooltipContent 
                className="backdrop-blur-md bg-black/80 text-white text-center px-4 py-2 rounded-lg text-sm"
                sideOffset={8}
              >
                View image {index + 1}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </motion.div>
    </div>
  );
};

export default ImageGallery;
