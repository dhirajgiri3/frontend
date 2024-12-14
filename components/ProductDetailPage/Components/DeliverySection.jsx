// components/DeliverySection.jsx
"use client";

import { useState } from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaMapMarkerAlt, FaTruck, FaBox } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const DeliverySection = () => {
  const [pincode, setPincode] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validatePincode = (pin) => {
    const pinRegex = /^[1-9]{1}[0-9]{5}$/;
    return pinRegex.test(pin);
  };

  const handleCheckDelivery = async () => {
    setError("");
    setDeliveryInfo(null);

    if (!validatePincode(pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    setLoading(true);

    // Check against validPincodes from product data
    const validPincodes = {
      "400001": {
        available: true,
        city: "Mumbai",
        state: "Maharashtra",
        deliveryTime: "3 business days",
        shippingCost: "Free",
        estimatedDate: new Date(Date.now() + 3*24*60*60*1000).toLocaleDateString(),
        expressAvailable: true,
        expressCharge: "₹500",
        expressDelivery: "Next Day",
        codAvailable: true
      },
      "110001": {
        available: true,
        city: "Delhi",
        state: "Delhi", 
        deliveryTime: "4 business days",
        shippingCost: "Free",
        estimatedDate: new Date(Date.now() + 4*24*60*60*1000).toLocaleDateString(),
        expressAvailable: true,
        expressCharge: "₹500",
        expressDelivery: "Next Day",
        codAvailable: true
      },
      "560001": {
        available: true,
        city: "Bangalore",
        state: "Karnataka",
        deliveryTime: "5 business days",
        shippingCost: "₹100",
        estimatedDate: new Date(Date.now() + 5*24*60*60*1000).toLocaleDateString(),
        expressAvailable: false,
        codAvailable: true
      },
      "700001": {
        available: true,
        city: "Kolkata", 
        state: "West Bengal",
        deliveryTime: "6 business days",
        shippingCost: "₹150",
        estimatedDate: new Date(Date.now() + 6*24*60*60*1000).toLocaleDateString(),
        expressAvailable: false,
        codAvailable: false
      }
    };

    setTimeout(() => {
      const info = validPincodes[pincode];
      
      if (info) {
        setDeliveryInfo(info);
      } else {
        setDeliveryInfo({ available: false });
      }

      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary/10 rounded-xl">
          <FaTruck className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-zinc-800">
          Check Delivery Options
        </h3>
      </div>

      <div className="p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-zinc-100 space-y-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative flex-1">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400">
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <FaMapMarkerAlt className="w-4 h-4" />
                    </motion.div>
                  </div>
                  <input
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter delivery pincode"
                    className="w-full pl-10 py-3 bg-white/50 hover:bg-white/80 transition-all duration-300 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-zinc-800 text-white text-sm p-2 rounded-lg">
                Enter 6-digit pincode
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <button
            onClick={handleCheckDelivery}
            disabled={loading}
            className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto whitespace-nowrap"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Checking...
              </div>
            ) : (
              <span className="flex items-center gap-2">
                <FaBox className="w-4 h-4" />
                Check
              </span>
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2"
            >
              ⚠️ {error}
            </motion.div>
          )}

          {deliveryInfo && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {deliveryInfo.available ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <FaBox className="w-5 h-5" />
                    <span className="font-medium">Delivery Available in {deliveryInfo.city}, {deliveryInfo.state}!</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 bg-white rounded-xl border border-zinc-100 hover:border-primary/20 transition-all duration-300">
                      <p className="text-sm font-medium text-primary">Standard Delivery</p>
                      <p className="text-lg font-semibold mt-1">{deliveryInfo.estimatedDate}</p>
                      <p className="text-sm text-zinc-500 mt-1">Shipping: {deliveryInfo.shippingCost}</p>
                      {deliveryInfo.codAvailable && (
                        <p className="text-sm text-emerald-600 mt-2">Cash on Delivery Available</p>
                      )}
                    </div>

                    {deliveryInfo.expressAvailable && (
                      <div className="p-4 bg-white rounded-xl border border-zinc-100 hover:border-primary/20 transition-all duration-300">
                        <p className="text-sm font-medium text-primary">Express Delivery</p>
                        <p className="text-lg font-semibold mt-1">{deliveryInfo.expressDelivery}</p>
                        <p className="text-sm text-zinc-500 mt-1">Express Charge: {deliveryInfo.expressCharge}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-100 rounded-lg">
                      <span className="text-lg">❌</span>
                    </div>
                    <div>
                      <p className="font-medium text-zinc-800">Not Available</p>
                      <p className="text-sm text-zinc-500 mt-0.5">
                        We don't deliver to this location yet
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DeliverySection;
