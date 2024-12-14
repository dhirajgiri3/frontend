// src/app/components/LoadingSpinner.jsx

"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <AnimatePresence mode="wait">
      <div className="flex items-center justify-center">
        <div className="relative w-24 h-24">
          {/* Outer rotating ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary"
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Middle ring */}
          <motion.div
            className="absolute inset-2 rounded-full border-4 border-transparent border-t-primary/60 border-l-primary/60"
            animate={{
              rotate: -360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: {
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />

          {/* Orbiting particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full"
              initial={{ scale: 0 }}
              animate={{
                scale: [0, 1, 0],
                rotate: 360,
                x: [0, 30, 0],
                y: [0, 30, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${60 * i}deg) translateX(10px)`
              }}
            />
          ))}

          {/* Center pulsing dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-4 h-4 -mt-2 -ml-2 bg-primary rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Floating particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-primary rounded-full"
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: [-10, -30],
                x: [-5 + i * 5, 5 + i * 5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut"
              }}
              style={{
                bottom: '0%',
                left: '50%'
              }}
            />
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
};

export default LoadingSpinner;