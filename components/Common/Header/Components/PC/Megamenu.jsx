// components/MegaMenu.js

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const MegaMenu = ({ isOpen, submenus }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="absolute left-0 top-[2rem] py-6 bg-white dark:bg-bg shadow z-10 before:absolute before:translate-y-[-50%] before:inset-0 before:bg-accent before:h-[.5rem] before:w-[4rem] dark:before:bg-accent w-[50vw] overflow-y-auto hide-scrollbar max-h-[calc(90vh-2rem)]"
        >
          <div className="flex justify-center items-center mx-auto px-6 py-2">
            {/* Responsive Grid: min 3 columns, max 5 columns */}
            <div className="grid grid-cols-4 gap-12">
              {Object.entries(submenus).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-primary font-semibold mb-4 text-md">
                    {category}
                  </h3>
                  <ul className="space-y-2">
                    {items.length > 0 ? (
                      items.map((item) => (
                        <li key={item}>
                          <Link
                            href={`/${item
                              .toLowerCase()
                              .replace(/ & /g, "-")
                              .replace(/ /g, "-")}`}
                            className="text-sm text-secondary hover:text-accent transition-colors duration-200"
                          >
                            {item}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li>
                        <Link href="#" className="text-sm text-secondary">
                          Coming Soon
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;
