// components/ActionButtons.jsx
"use client";

import { motion } from "framer-motion";
import { TooltipProvider, Tooltip, TooltipContent } from "@/components/ui/tooltip";
import CustomButton from "./CustomButton";

const ActionButtons = ({
  selectedSize,
  selectedColor,
  onAddToCart,
  isWishlisted,
  toggleWishlist,
}) => {
  return (
    <div className="flex space-x-4 items-center">
      <TooltipProvider>
        <Tooltip>
          <div className="flex-1">
            <CustomButton
              variant="accent"
              disabled={!selectedSize || !selectedColor.inStock}
              onClick={onAddToCart}
              className="w-full group relative overflow-hidden transition-all duration-300 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              ariaLabel="Add to cart"
            >
              <motion.div
                className="absolute inset-0 bg-black/5"
                initial={{ height: "0%" }}
                whileHover={{ height: "100%" }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative flex items-center justify-center gap-2">
                <motion.svg 
                  className="w-5 h-5"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </motion.svg>
                Add to Cart
              </span>
            </CustomButton>
          </div>
          <TooltipContent 
            className="bg-black text-white text-center px-4 py-2 rounded-lg"
            sideOffset={5}
          >
            {selectedSize && selectedColor.inStock
              ? "Add this product to your cart"
              : "Select size and color to add to cart"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <motion.div 
        whileTap={{ scale: 0.9 }} 
        onClick={toggleWishlist}
        className="relative"
      >
        <TooltipProvider>
          <Tooltip>
            <div>
              <CustomButton
                variant="outline"
                className="w-12 h-12 flex items-center justify-center relative overflow-hidden rounded-full border-1 border-zinc-200 hover:border-zinc-300 transition-colors duration-300"
                ariaLabel="Toggle wishlist"
              >
                <motion.span
                  initial={{ scale: 1 }}
                  animate={
                    isWishlisted
                      ? {
                          scale: [1, 1.3, 1],
                          rotate: [0, 15, -15, 0],
                          transition: {
                            duration: 0.5,
                            ease: "easeInOut",
                          },
                        }
                      : {}
                  }
                  className="text-xl"
                >
                  {isWishlisted ? (
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-2xl text-accent"
                    >
                      ♥
                    </motion.span>
                  ) : (
                    <motion.span 
                      className="text-2xl hover:text-accent transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      ♡
                    </motion.span>
                  )}
                </motion.span>
                {isWishlisted && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {[...Array(6)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="absolute w-1 h-1 bg-black rounded-full"
                        initial={{ opacity: 1, scale: 0 }}
                        animate={{
                          opacity: 0,
                          scale: 2,
                          x: Math.cos((i * 60 * Math.PI) / 180) * 20,
                          y: Math.sin((i * 60 * Math.PI) / 180) * 20,
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    ))}
                  </motion.div>
                )}
              </CustomButton>
            </div>
            <TooltipContent 
              className="bg-black text-white text-center px-4 py-2 rounded-lg"
              sideOffset={5}
            >
              {isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>
    </div>
  );
};

export default ActionButtons;