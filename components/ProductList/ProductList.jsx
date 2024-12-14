import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon, EyeIcon, ShoppingCartIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ProductList = ({ ProductData }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.2,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="product-list"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <Carousel className="w-full max-w-[95vw] mx-auto">
          <CarouselContent className="-ml-4 bg-dark">
            {ProductData.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 basis-full md:basis-1/2 lg:basis-1/4 bg-dark"
              >
                <motion.div
                  className="relative bg-dark"
                  variants={itemVariants}
                  layout
                >
                  <Link href={product.link}>
                    <Card className="border rounded-lg overflow-hidden shadow-none">
                      <CardContent className="p-0 overflow-hidden">
                        <div className="relative h-[27rem] w-full group overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            quality={100}
                            priority
                            fill
                            className="object-cover group-hover:scale-110 transition-all duration-700"
                          />
                          <div className="absolute top-4 right-4 w-full h-full flex flex-col items-end justify-start gap-2">
                            <AnimatePresence>
                              <motion.button
                                key={`eye-${product.id}`}
                                variants={iconVariants}
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="hidden group-hover:block text-white bg-[#ff406c]/50 hover:bg-[#ff406c] backdrop-blur-sm p-2 h-10 w-10 rounded-full"
                              >
                                <EyeIcon className="w-6 h-6" />
                              </motion.button>
                              <motion.button
                              
                                key={`heart-${product.id}`}
                                variants={iconVariants}
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="hidden group-hover:block text-white bg-[#ff406c]/50 hover:bg-[#ff406c] backdrop-blur-sm p-2 h-10 w-10 rounded-full"
                              >
                                <HeartIcon className="w-6 h-6" />
                              </motion.button>
                            </AnimatePresence>
                          </div>
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center pb-4">
                            <AnimatePresence>
                              <motion.button
                                key={`heart-${product.id}`}
                                variants={buttonVariants}
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="hidden group-hover:flex items-center justify-center gap-2 text-white bg-[#ff406c]/50 hover:bg-[#ff406c] backdrop-blur-sm p-2 px-4 rounded-full"
                              >
                                <ShoppingCartIcon className="w-6 h-6" />
                                <span className="hidden md:block text-sm">
                                  Add to Cart
                                </span>
                              </motion.button>
                            </AnimatePresence>
                          </div>
                        </div>
                        <motion.div
                          className="p-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: 0.2 }}
                          layout
                        >
                          <h3 className="font-normal text-lg mb-2">
                            {product.name}
                          </h3>
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-secondary line-through text-sm">
                                ${product.price}
                              </span>
                              <span className="text-primary ml-2 font-bold">
                                ${product.discountPrice}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-yellow-400 text-base">
                                ★
                              </span>
                              <span className="ml-1 text-base">
                                {product.rating}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-accent text-white border-none outline-none" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent text-white border-none outline-none" />
        </Carousel>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductList;
