// components/BreadcrumbNavigation.jsx
"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { ChevronRight, Home, Menu } from "lucide-react";

const BreadcrumbNavigation = ({ category, productName }) => {
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <Breadcrumb className=" p-4 border border-zinc-100 rounded-xl">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-xl" />
        <BreadcrumbList className="relative z-10">
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center gap-1.5 hover:text-primary transition-all duration-300 group">
                <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:translate-x-0.5 transition-transform">Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </motion.div>

          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4 text-zinc-300" />
          </BreadcrumbSeparator>

          <motion.div 
            variants={itemVariants} 
            initial="hidden" 
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-zinc-50 transition-all duration-300">
                  <Menu className="h-4 w-4" />
                  <span className="text-sm font-medium">Browse</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  side="bottom"
                  sideOffset={10}
                  className="bg-white/80 backdrop-blur-xl border-none rounded-xl p-2 min-w-[180px] shadow-xl"
                >
                  <DropdownMenuItem asChild>
                    <Link href="/products" className="flex items-center gap-2 px-4 py-2.5 hover:bg-zinc-50 rounded-lg transition-all duration-300">
                      All Products
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/products/men" className="flex items-center gap-2 px-4 py-2.5 hover:bg-zinc-50 rounded-lg transition-all duration-300">
                      Men
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/products/women" className="flex items-center gap-2 px-4 py-2.5 hover:bg-zinc-50 rounded-lg transition-all duration-300">
                      Women
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </motion.div>

          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4 text-zinc-300" />
          </BreadcrumbSeparator>

          <motion.div 
            variants={itemVariants} 
            initial="hidden" 
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <BreadcrumbItem>
              <BreadcrumbLink 
                href={`/products/${category}`}
                className="hover:text-primary transition-all duration-300 hover:translate-x-0.5"
              >
                {category
                  ? category.charAt(0).toUpperCase() + category.slice(1)
                  : "Products"}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </motion.div>

          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4 text-zinc-300" />
          </BreadcrumbSeparator>

          <motion.div 
            variants={itemVariants} 
            initial="hidden" 
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-primary">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {productName}
                </motion.span>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </motion.div>
        </BreadcrumbList>
      </Breadcrumb>
    </motion.div>
  );
};

export default BreadcrumbNavigation;