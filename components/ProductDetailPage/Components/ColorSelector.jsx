// components/ColorSelector.jsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ColorSelector = ({ colors, selectedColor, setSelectedColor }) => {
  return (
    <motion.div
      className="space-y-4 bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-100"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Select Color</h3>
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          key={selectedColor.name}
        >
          <motion.span
            className="text-sm font-medium px-4 py-2 bg-gray-900 text-white rounded-full"
            layoutId="selectedColorPill"
          >
            {selectedColor.name}
          </motion.span>
          <motion.div
            className="absolute inset-0 bg-gray-900/10 rounded-full blur-xl -z-10"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.2 }}
            transition={{
              repeat: Infinity,
              duration: 2,
              repeatType: "reverse",
            }}
          />
        </motion.div>
      </div>

      <motion.div
        className="flex flex-wrap gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {colors.map((color) => (
          <TooltipProvider key={color.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  onClick={() => setSelectedColor(color)}
                  className={`group h-14 w-14 rounded-2xl transition-all duration-300 relative 
                    ${
                      selectedColor.name === color.name
                        ? "scale-110 ring-4 ring-gray-900 ring-offset-4"
                        : "hover:ring-2 hover:ring-gray-400 hover:ring-offset-2"
                    } ${
                    !color.inStock
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:scale-105"
                  }`}
                  style={{ backgroundColor: color.code }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${color.name} color`}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 20 },
                    visible: { opacity: 1, scale: 1, y: 0 },
                  }}
                  whileHover={
                    color.inStock
                      ? {
                          rotate: [0, -5, 5, 0],
                          transition: { duration: 0.3 },
                        }
                      : {}
                  }
                >
                  <AnimatePresence>
                    {selectedColor.name === color.name && (
                      <motion.div
                        layoutId="colorCheck"
                        className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div
                          className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <motion.span
                            className="text-gray-900 text-sm"
                            animate={{
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            ✓
                          </motion.span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent
                className="bg-gray-900 text-white text-center px-4 py-2 rounded-xl"
                sideOffset={5}
              >
                {color.inStock
                  ? `Available in ${color.name}`
                  : `${color.name} - Currently Out of Stock`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ColorSelector;
