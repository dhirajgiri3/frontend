// src/app/components/NotAuthorized.jsx

"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NotAuthorized = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4"
    >
      <motion.div
        initial={{ scale: 0.5, y: -100 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="relative"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="text-[120px] font-bold text-red-100 select-none"
        >
          403
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-red-500 whitespace-nowrap"
        >
          Not Authorized
        </motion.h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-lg text-gray-600 mt-8 mb-6 text-center max-w-md"
      >
        Oops! Looks like you don't have permission to access this area.
      </motion.p>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link 
          href="/dashboard" 
          className="px-8 py-3 bg-primary text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-300 flex items-center gap-2"
        >
          <span>Return to Dashboard</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotAuthorized;