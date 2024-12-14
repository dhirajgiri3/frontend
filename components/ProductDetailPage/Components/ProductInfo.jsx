// components/ProductInfo.jsx

"use client";

import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Star, Info, Box, Tag } from "lucide-react";

const ProductInfo = ({
  name,
  code,
  price,
  discountPrice,
  averageRating,
  reviewsCount,
  isInStock,
  brand,
}) => {
  const discountPercentage = Math.round(
    ((price - discountPrice) / price) * 100
  );

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <motion.div
      {...fadeInUp}
      className="space-y-4 p-8 bg-white/90 backdrop-blur-md rounded-2xl border border-zinc-100"
    >
      <motion.div className="space-y-2">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl font-bold text-zinc-900 tracking-tight"
        >
          {name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 text-zinc-600 text-sm font-medium"
        >
          Code: <span className="text-primary font-semibold">{code}</span>
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4 bg-white/50 backdrop-blur-sm p-6 py-4 rounded-2xl border border-zinc-100 hover:border-zinc-200 transition-colors flex-col justify-center items-start gap-2"
      >
        <div className="flex items-center flex-wrap gap-2">
          <motion.div className="flex flex-col gap-4">
            <motion.div className="flex items-baseline gap-3">
              <motion.span
                key={discountPrice}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-3xl font-bold text-zinc-900"
              >
                ₹{discountPrice.toLocaleString()}
              </motion.span>
              {discountPrice !== price && (
                <motion.span
                  className="text-md text-zinc-400 line-through"
                  key={price}
                >
                  ₹{price.toLocaleString()}
                </motion.span>
              )}
            </motion.div>
            {discountPrice !== price && (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="relative"
              >
                <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-sm font-medium inline-block">
                  Save {discountPercentage}%
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>
        <div className="flex items-center gap-2 rounded-lg backdrop-blur-sm">
          <Tag className="w-4 h-4 text-zinc-400" />
          <p className="text-sm font-medium text-zinc-400">
            Inclusive of all taxes
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-6 bg-zinc-50/50 p-4 py-2 rounded-xl backdrop-blur-sm hover:bg-zinc-50/70 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          <span className="font-semibold text-lg">{averageRating}</span>
        </div>
        <div className="h-6 w-px bg-zinc-200"></div>
        <span className="text-zinc-700 font-medium">
          {reviewsCount.toLocaleString()} verified reviews
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-primary cursor-pointer hover:text-primary/80 transition-colors">
                <Info className="w-5 h-5" />
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="bg-zinc-900 text-white text-sm py-2 px-4 rounded-lg"
            >
              Average rating based on verified customer reviews
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col gap-4"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`inline-flex items-center px-5 py-3 rounded-xl text-sm font-medium transition-all ${
            isInStock
              ? "bg-emerald-50/50 text-emerald-700 border border-emerald-200/50 hover:bg-emerald-50/70"
              : "bg-red-50/50 text-red-700 border border-red-200/50 hover:bg-red-50/70"
          }`}
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`w-2.5 h-2.5 mr-3 rounded-full ${
              isInStock ? "bg-emerald-500" : "bg-red-500"
            }`}
          ></motion.span>
          {isInStock ? "In Stock & Ready to Ship" : "Currently Unavailable"}
        </motion.div>
        <motion.div
          className="flex items-center gap-3 text-zinc-700 bg-zinc-50/50 p-4 pb-0 rounded-xl backdrop-blur-sm"
        >
          <span className="font-medium">Brand:</span>
          <span className="px-4 py-1.5 rounded-full text-sm font-medium border border-zinc-200">
            {brand}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProductInfo;
