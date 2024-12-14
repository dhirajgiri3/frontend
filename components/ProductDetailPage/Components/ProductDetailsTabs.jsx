// components/ProductDetailsTabs.jsx

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Star, Package, RotateCcw } from "lucide-react";

const ProductDetailsTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("Product Details");

  const tabs = [
    {
      name: "Product Details",
      icon: <Package className="w-4 h-4" />,
    },
    {
      name: "FAQs", 
      icon: <Info className="w-4 h-4" />,
    },
    {
      name: "Reviews",
      icon: <Star className="w-4 h-4" />,
    },
    {
      name: "Return Policy",
      icon: <RotateCcw className="w-4 h-4" />,
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Product Details":
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 bg-zinc-50/80 backdrop-blur-sm rounded-2xl px-8"
          >
            <p className="text-zinc-700 leading-relaxed">
              {product.details.description}
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-medium text-lg text-zinc-900">Highlights</h3>
              <ul className="list-disc pl-5 space-y-2">
                {product.details.highlights.map((highlight, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-zinc-600"
                  >
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-medium text-lg mb-4 text-zinc-900">Product Information</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "SKU", value: product.sku },
                  { label: "Brand", value: product.brand },
                  { label: "Color", value: product.color },
                  { label: "Fabric Type", value: product.fabric.type },
                  { label: "Fabric Details", value: product.fabric.details },
                  { label: "Fabric Weight", value: product.fabric.weight },
                  { label: "Fabric Opacity", value: product.fabric.opacity },
                  { label: "Care Instructions", value: product.fabric.care },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-white rounded-xl border border-zinc-100 hover:border-zinc-200 transition-all duration-300"
                  >
                    <p className="text-zinc-400 text-sm">{item.label}</p>
                    <p className="font-medium mt-1 text-zinc-800">{item.value}</p>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="p-4 bg-white rounded-xl border border-zinc-100 hover:border-zinc-200 transition-all duration-300"
                >
                  <p className="text-zinc-400 text-sm">Features</p>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    {product.fabric.features.map((feature, index) => (
                      <li key={index} className="text-zinc-600">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                {[
                  { label: "Occasion", value: product.occasion.join(", ") },
                  { label: "Style", value: product.style },
                  { label: "Weight", value: product.weight },
                  { label: "Material", value: product.details.materials },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + (index * 0.1) }}
                    className="p-4 bg-white rounded-xl border border-zinc-100 hover:border-zinc-200 transition-all duration-300"
                  >
                    <p className="text-zinc-400 text-sm">{item.label}</p>
                    <p className="font-medium mt-1 text-zinc-800">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );
      case "FAQs":
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 bg-zinc-50/80 backdrop-blur-sm rounded-2xl p-8"
          >
            {product.faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white rounded-xl border border-zinc-100 hover:border-zinc-200 transition-all duration-300"
              >
                <h4 className="font-medium text-zinc-900">{faq.question}</h4>
                <p className="text-zinc-600 mt-2">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        );
      case "Reviews":
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 bg-zinc-50/80 backdrop-blur-sm rounded-2xl p-8"
          >
            <div className="flex items-center space-x-4 bg-white p-6 rounded-xl border border-zinc-100">
              <div className="text-4xl font-bold text-zinc-900">
                {product.averageRating}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= product.averageRating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-zinc-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-zinc-500 text-sm mt-1">
                  Based on {product.reviews.length} reviews
                </span>
              </div>
            </div>
            <div className="space-y-4">
              {product.reviews.map((review, index) => (
                <motion.div 
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-white rounded-xl border border-zinc-100 hover:border-zinc-200 transition-all duration-300"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-zinc-900">{review.user}</span>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-zinc-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-zinc-600 mt-3">{review.comment}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-zinc-400">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                    {review.verified && (
                      <span className="text-sm text-zinc-900 bg-zinc-100 px-3 py-1 rounded-full">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      case "Return Policy":
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 bg-zinc-50/80 backdrop-blur-sm rounded-2xl p-8"
          >
            <h3 className="font-medium text-xl text-zinc-900">
              Return Policy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Return Window", value: `${product.returnPolicy.days} days` },
                { label: "Conditions", value: product.returnPolicy.conditions },
                { label: "Process", value: product.returnPolicy.process },
                { label: "Exchange Allowed", value: product.returnPolicy.exchangeAllowed ? "Yes" : "No" },
                { label: "Refund Method", value: product.returnPolicy.refundMethod }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white rounded-xl border border-zinc-100 hover:border-zinc-200 transition-all duration-300"
                >
                  <p className="text-zinc-400 text-sm">{item.label}</p>
                  <p className="font-medium mt-1 text-zinc-800">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="border-b border-zinc-200">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <motion.div
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`pb-4 relative font-medium cursor-pointer flex items-center gap-2 ${
                activeTab === tab.name
                  ? "text-zinc-900"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              role="button"
              tabIndex={0}
            >
              {tab.icon}
              {tab.name}
              {activeTab === tab.name && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="py-6"
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductDetailsTabs;
