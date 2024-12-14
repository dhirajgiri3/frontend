"use client";

import { motion } from "framer-motion";

const CustomButton = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
  ariaLabel,
  type = "button",
  loading = false,
}) => {
  // Base styles for the button
  const baseClasses =
    "relative px-4 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden";

  // Styles for different variants
  const variantClasses = {
    primary: "bg-primary text-white hover:brightness-110 focus:ring-primary/50",
    secondary: "bg-gray-100 text-primary hover:bg-gray-200 focus:ring-gray-300",
    outline: "bg-transparent border-2 border-gray-300 text-primary hover:bg-gray-50 hover:border-primary focus:ring-primary/50",
    default: "bg-white border-2 border-gray-200 hover:border-primary focus:ring-primary/50",
    accent: "bg-accent text-white hover:brightness-110 focus:ring-accent/50",
  };

  // Loading animation styles
  const loadingClasses = loading ? "relative !text-transparent" : "";

  // Combining classes based on state
  const combinedClasses = `${baseClasses} ${
    variantClasses[variant] || variantClasses.default
  } ${
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  } ${loadingClasses} ${className}`;

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      type={type}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className={combinedClasses}
    >
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
      
      {/* Button Content */}
      <motion.div
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-center gap-2 relative z-10"
      >
        {children}
      </motion.div>

      {/* Modern Ripple Effect */}
      <motion.div
        className="absolute inset-0 bg-black/5"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 2, opacity: 0.3 }}
        transition={{ duration: 0.5 }}
      />

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-45"
        initial={{ x: "-100%" }}
        whileHover={{ x: "200%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </motion.button>
  );
};

export default CustomButton;
