"use client";

import { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CustomInput = forwardRef(
  (
    {
      value,
      onChange,
      placeholder = "Enter text",
      type = "text",
      className = "",
      ariaLabel,
      name,
      disabled = false,
      error = "",
      icon,
      label,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    // Base styles for the input wrapper
    const wrapperClasses = "relative flex flex-col gap-2";

    // Modern minimal styles for the input
    const baseClasses = `
      w-full px-4 py-3
      bg-white/90
      border rounded-xl
      transition-all duration-300
      outline-none
      ${isFocused ? "border-primary ring-2 ring-primary/10" : "border-zinc-200"}
      ${error ? "border-red-500 ring-2 ring-red-500/10" : ""}
      ${disabled ? "opacity-50 cursor-not-allowed bg-zinc-50" : "cursor-text hover:border-zinc-300"}
    `;

    const combinedClasses = `${baseClasses} ${className}`;

    return (
      <div className={wrapperClasses}>
        {label && (
          <motion.label
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-sm font-medium text-zinc-800 tracking-wide"
          >
            {label}
            {error && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-2 text-xs text-red-500 font-normal"
              >
                {error}
              </motion.span>
            )}
          </motion.label>
        )}
        
        <div className="relative">
          {icon && (
            <motion.span 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {icon}
            </motion.span>
          )}
          
          <motion.input
            ref={ref}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            aria-label={ariaLabel}
            name={name}
            disabled={disabled}
            className={`${combinedClasses} ${icon ? "pl-10" : ""}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            whileTap={!disabled ? { scale: 0.995 } : {}}
            initial={false}
            animate={isFocused ? { 
              y: 0,
              transition: { type: "spring", stiffness: 300 }
            } : {}}
          />

          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: isFocused ? "100%" : "0%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />

          {value && !disabled && (
            <motion.button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              onClick={() => onChange({ target: { value: "" } })}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>
          )}
        </div>
      </div>
    );
  }
);

// Adding a display name for better debugging
CustomInput.displayName = "CustomInput";

export default CustomInput;