// components/SizeSelector.jsx

"use client";

import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Ruler } from "lucide-react";

const SizeSelector = ({ sizes, selectedSize, setSelectedSize, isInStock }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 bg-zinc-50/80 backdrop-blur-md rounded-2xl p-6 border border-zinc-100"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ruler className="w-5 h-5 text-zinc-600" />
          <h3 className="text-lg font-medium text-zinc-800">Select Size</h3>
        </div>
        <motion.span 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full"
        >
          {sizes.filter(s => s.inStock).length} sizes available
        </motion.span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {sizes.map((sizeObj, index) => (
          <TooltipProvider key={sizeObj.size}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ 
                    scale: sizeObj.inStock ? 1.05 : 1,
                    backgroundColor: sizeObj.inStock ? "rgb(244 244 245)" : ""
                  }}
                  whileTap={{ scale: sizeObj.inStock ? 0.95 : 1 }}
                  onClick={() =>
                    sizeObj.inStock && setSelectedSize(sizeObj.size)
                  }
                  className={`
                    h-16 w-16 text-sm font-medium rounded-full border flex items-center justify-center
                    transition-all duration-300 relative overflow-hidden
                    ${selectedSize === sizeObj.size
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : sizeObj.inStock
                      ? "border-zinc-200 hover:border-zinc-300 text-zinc-800"
                      : "border-zinc-100 bg-zinc-50/50 text-zinc-400 cursor-not-allowed"
                    }
                  `}
                  aria-label={`Select size ${sizeObj.size}`}
                  aria-disabled={!sizeObj.inStock}
                  disabled={!sizeObj.inStock}
                >
                  {sizeObj.size}
                  {selectedSize === sizeObj.size && (
                    <motion.div
                      layoutId="selected-size"
                      className="absolute inset-0 bg-zinc-900 -z-10 rounded-full"
                      transition={{ type: "spring", bounce: 0.2 }}
                    />
                  )}
                </motion.button>
              </TooltipTrigger>
              <TooltipContent 
                side="top"
                className="bg-zinc-900 text-white text-sm py-2 px-3 rounded-lg"
              >
                {selectedSize === sizeObj.size
                  ? `Selected size ${sizeObj.size}`
                  : sizeObj.inStock
                  ? `Select size ${sizeObj.size}`
                  : `Size ${sizeObj.size} out of stock`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </motion.div>
  );
};

export default SizeSelector;
