// components/QuantitySelector.jsx
"use client";

import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import CustomButton from "./CustomButton";

const QuantitySelector = ({ quantity, handleQuantityChange, maxQuantity }) => {
  const handleDirectInput = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      const validValue = Math.min(Math.max(value, 1), maxQuantity);
      handleQuantityChange(validValue - quantity);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 bg-zinc-50/80 backdrop-blur-md rounded-2xl p-6 border border-zinc-100"
    >
      <div className="flex items-center justify-between">
        <motion.h3 
          className="text-lg font-medium bg-clip-text"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
        >
          Quantity
        </motion.h3>
        <motion.span 
          className="text-sm px-3 py-1 bg-zinc-900 text-white rounded-full"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          {quantity} / {maxQuantity}
        </motion.span>
      </div>
      
      <div className="flex items-center justify-center space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CustomButton
                variant="outline"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                ariaLabel="Decrease quantity"
                className="p-1 h-12 w-12 hover:bg-zinc-100 transition-all duration-300 rounded-full border-zinc-200"
              >
                <Minus className="w-4 h-4" />
              </CustomButton>
            </TooltipTrigger>
            <TooltipContent className="bg-zinc-900 text-white text-sm py-1 px-3 rounded-xl">
              Decrease quantity
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <input
          type="number"
          value={quantity}
          onChange={handleDirectInput}
          min={1}
          max={maxQuantity}
          className="bg-white min-w-[4rem] py-3 px-5 rounded-full text-center font-medium border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CustomButton
                variant="outline"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= maxQuantity}
                ariaLabel="Increase quantity"
                className="p-1 h-12 w-12 hover:bg-zinc-100 transition-all duration-300 rounded-full border-zinc-200"
              >
                <Plus className="w-4 h-4" />
              </CustomButton>
            </TooltipTrigger>
            <TooltipContent className="bg-zinc-900 text-white text-sm py-1 px-3 rounded-xl">
              Increase quantity
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="relative w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-zinc-900"
          initial={{ width: 0 }}
          animate={{ 
            width: `${(quantity / maxQuantity) * 100}%`,
            transition: { duration: 0.3 }
          }}
        />
        <motion.div
          className="absolute top-0 left-0 h-full bg-zinc-900/20 blur-sm"
          initial={{ width: 0 }}
          animate={{ 
            width: `${(quantity / maxQuantity) * 100}%`,
            transition: { duration: 0.5 }
          }}
        />
      </div>
    </motion.div>
  );
};

export default QuantitySelector;