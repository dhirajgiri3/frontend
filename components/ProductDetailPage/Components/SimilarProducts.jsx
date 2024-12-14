// components/SimilarProducts.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Tag, ArrowRight, ShoppingBag } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SimilarProducts = ({ products }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      y: -4,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full px-4 md:px-6 lg:px-8 py-4 flex flex-col items-center justify-center gap-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center gap-3 bg-zinc-50/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-zinc-100"
      >
        <ShoppingBag className="w-5 h-5 text-primary" />
        <h2 className="text-xl md:text-xl lg:text-2xl font-semibold">
          Similar Products
        </h2>
        <motion.div
          animate={{ 
            x: [0, 5, 0],
            transition: { 
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }
          }}
        >
          <ArrowRight className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 w-full max-w-[1400px] mx-auto"
      >
        <AnimatePresence>
          {products.map((item, index) => {
            const hasDiscount = item.discountedPrice != null && item.discountedPrice !== item.price;
            const displayPrice = hasDiscount ? item.discountedPrice : item.price;

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover="hover"
                layout
                className="w-full"
              >
                <Link
                  href={`/products/${item.slug}`}
                  className="group h-full block rounded-2xl overflow-hidden bg-white border border-zinc-100 transition-all duration-300"
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-50">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            loading="lazy"
                            quality={90}
                          />
                          {hasDiscount && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute top-3 right-3 bg-primary text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg"
                            >
                              {Math.round(((item.price - item.discountedPrice) / item.price) * 100)}% OFF
                            </motion.div>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-zinc-900 text-white text-sm px-3 py-1.5 rounded-xl">
                        Click to view {item.name}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <div className="p-4 space-y-3">
                    <h3 className="text-base font-medium line-clamp-2 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>

                    {item.rating && (
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm text-zinc-600">{item.rating}</span>
                      </div>
                    )}

                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-semibold text-primary">
                        ₹{displayPrice.toLocaleString()}
                      </span>
                      {hasDiscount && (
                        <span className="text-sm text-zinc-400 line-through">
                          ₹{item.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default SimilarProducts;
