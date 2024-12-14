// components/ProductDetails.jsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import BreadcrumbNavigation from "./Components/BreadcrumbNavigation";
import ImageGallery from "./Components/ImageGallery";
import ProductInfo from "./Components/ProductInfo";
import ColorSelector from "./Components/ColorSelector";
import SizeSelector from "./Components/SizeSelector";
import QuantitySelector from "./Components/QuantitySelector";
import DeliverySection from "./Components/DeliverySection";
import ActionButtons from "./Components/ActionButtons";
import ProductDetailsTabs from "./Components/ProductDetailsTabs";
import SimilarProducts from "./Components/SimilarProducts";
import { EyeIcon } from "lucide-react";

// Sample product data (ideally, this should come from props or a data fetching method)
const product = {
  name: "Cream Embroidered Sherwani For Wedding",
  code: "MSH58960",
  weight: "2.50kg",
  price: 23995,
  discountPrice: 19995,
  stock: 10,
  sku: "SHW-CRM-001",
  brand: "Royal Ethnic",
  category: "sherwanis",
  subcategory: "wedding-sherwanis",
  occasion: ["Wedding", "Formal Events"],
  style: "Traditional Indian",
  color: "Cream",
  colors: [
    {
      name: "Cream",
      code: "#ff773d",
      inStock: true,
      images: [
        "/Assets/Images/Products/Bride/Traditional-2.jpeg",
        "/Assets/Images/Products/Women/Bride-1.jpeg",
        "/Assets/Images/Products/Women/Bride-3.jpg",
      ],
    },
    {
      name: "Navy Blue",
      code: "#2c73ff",
      inStock: true,
      images: [
        "/Assets/Images/Random/Girl-blue.png",
        "/Assets/Images/Products/Bride/Traditional-2.jpeg",
        "/Assets/Images/Products/Women/Street-2.jpeg",
      ],
    },
    {
      name: "Maroon",
      code: "#800000",
      inStock: false,
      images: [
        "/Assets/Images/Products/Women/Festive-1.jpg",
        "/Assets/Images/Products/Women/Street-2.jpeg",
        "/Assets/Images/Products/Women/Traditional-2.jpeg",
      ],
    },
    {
      name: "Gold",
      code: "#571bff",
      inStock: true,
      images: [
        "/Assets/Images/Random/Navkar-1.jpeg",
        "/Assets/Images/Products/Women/Street-2.jpeg",
        "/Assets/Images/Products/Women/Festive-1.jpg",
      ],
    },
  ],
  fabric: {
    type: "Pure Silk",
    details: "Premium quality pure silk with a rich sheen and smooth texture",
    weight: "Heavy",
    opacity: "Opaque",
    care: "Dry clean only",
    features: [
      "Natural sheen",
      "Breathable",
      "Temperature regulating",
      "Durable",
      "Luxurious drape",
    ],
  },
  images: [
    "/Assets/Images/Products/Bride/Traditional-2.jpeg",
    "/Assets/Images/Products/Women/Bride-1.jpeg",
    "/Assets/Images/Products/Women/Bride-3.jpg",
    "/Assets/Images/Products/Women/Smart-1.jpeg",
    "/Assets/Images/Products/Women/Street-2.jpeg",
    "/Assets/Images/Products/Women/Festive-1.jpg",
    "/Assets/Images/Products/Women/Traditional-2.jpeg",
  ],
  sizes: [
    { size: "S", inStock: true, price: 23995, discountPrice: 19995 },
    { size: "M", inStock: false, price: 24995, discountPrice: 20995 },
    { size: "L", inStock: true, price: 25995, discountPrice: 21995 },
    { size: "XL", inStock: false, price: 26995, discountPrice: 22995 },
    { size: "XXL", inStock: true, price: 27995, discountPrice: 23995 },
  ],
  details: {
    description:
      "Steal the limelight on your special day in this captivating cream silk sherwani set. This masterpiece is adorned with delicate thread, zari, and shimmering sequins embroidery all over. It is designed with a mandarin collar, front opening embroidered buttons, and long sleeves. Paired with matching trouser bottom and dupatta. Slight variation in color, fabric, & work is possible. Pictures shown are for illustration purposes only.",
    materials: "100% Silk with Zari and Sequins",
    careInstructions:
      "Dry clean only. Do not bleach. Iron on low heat if necessary.",
    additionalInfo: "Made in India",
    highlights: [
      "Premium silk fabric",
      "Intricate hand embroidery",
      "Mandarin collar",
      "Full sleeves",
      "Comes with matching bottom wear",
      "Perfect for wedding ceremonies",
    ],
    fitType: "Regular",
    season: "All Seasons",
    washCare: "Dry Clean Only",
    transparency: "Opaque",
  },
  reviews: [
    {
      id: 1,
      user: "John Doe",
      rating: 5,
      comment: "Absolutely stunning! The embroidery is exquisite.",
      date: "2024-01-15",
      verified: true,
      fitFeedback: "Just Right",
      qualityRating: 5,
      images: [],
    },
    {
      id: 2,
      user: "Jane Smith",
      rating: 4,
      comment: "Great quality but the size runs a bit small.",
      date: "2024-02-20",
      verified: true,
      fitFeedback: "Too Small",
      qualityRating: 4,
      images: [],
    },
  ],
  averageRating: 4.5,
  similarProducts: [
    {
      id: 101,
      name: "Navy Blue Embroidered Sherwani",
      price: 21995,
      discountPrice: 19995,
      image: "/Assets/Images/Products/Women/Bride-1.jpeg",
      slug: "navy-blue-embroidered-sherwani",
    },
    {
      id: 102,
      name: "Black Silk Sherwani with Zari Work",
      price: 25995,
      discountPrice: 22995,
      image: "/Assets/Images/Products/Women/Bride-3.jpg",
      slug: "black-silk-sherwani-zari-work",
    },
    {
      id: 103,
      name: "Maroon Silk Sherwani with Zari Work",
      price: 25995,
      discountPrice: 22995,
      image: "/Assets/Images/Products/Women/Festive-1.jpg",
      slug: "maroon-silk-sherwani-zari-work",
    },
  ],
  faqs: [
    {
      question: "What is the delivery time?",
      answer: "Standard delivery takes 5-7 business days within India.",
    },
    {
      question: "Is customization available?",
      answer:
        "Yes, we offer customization services. Please contact our support team.",
    },
  ],
  returnPolicy: {
    days: 7,
    conditions: "Product must be unused and in original packaging",
    process: "Initiate return from your order history page",
    exchangeAllowed: true,
    refundMethod: "Original Payment",
  },
  validPincodes: [
    {
      code: "400001",
      city: "Mumbai",
      state: "Maharashtra",
      deliveryDays: 3,
      codAvailable: true,
      expressDelivery: true,
    },
    {
      code: "110001",
      city: "Delhi",
      state: "Delhi",
      deliveryDays: 4,
      codAvailable: true,
      expressDelivery: true,
    },
    {
      code: "560001",
      city: "Bangalore",
      state: "Karnataka",
      deliveryDays: 5,
      codAvailable: true,
      expressDelivery: false,
    },
    {
      code: "700001",
      city: "Kolkata",
      state: "West Bengal",
      deliveryDays: 6,
      codAvailable: false,
      expressDelivery: false,
    },
  ],
};

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 1,
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const actionButtonVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 25,
      delay: 0.3,
    },
  },
  exit: {
    y: 100,
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 30,
    },
  },
};

const removeButtonVariants = {
  hover: {
    scale: 1.1,
    rotate: 180,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.9,
  },
};

const svgVariants = {
  initial: { rotate: 0, scale: 1 },
  animate: {
    rotate: 360,
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const floatingButtonVariants = {
  hidden: { scale: 0, opacity: 0, rotate: -180 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 25,
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    rotate: 180,
    transition: { duration: 0.3 },
  },
};

const ProductDetails = ({ slug, category = "", url }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(
    product.colors[0].images[0]
  );
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(product.price);
  const [currentDiscountPrice, setCurrentDiscountPrice] = useState(
    product.discountPrice
  );

  // Derived isInStock based on product stock and selected color's availability
  const isInStock = product.stock > 0 && selectedColor.inStock;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Update selected image when color changes
  useEffect(() => {
    if (
      selectedColor &&
      selectedColor.images &&
      selectedColor.images.length > 0
    ) {
      setSelectedImage(selectedColor.images[0]);
    }
  }, [selectedColor]);

  // Update prices when size changes
  useEffect(() => {
    if (selectedSize) {
      const selectedSizeData = product.sizes.find(
        (s) => s.size === selectedSize
      );
      if (selectedSizeData) {
        setCurrentPrice(selectedSizeData.price);
        setCurrentDiscountPrice(selectedSizeData.discountPrice);
      }
    }
  }, [selectedSize]);

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + change, product.stock)));
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    if (!selectedColor) {
      alert("Please select a color");
      return;
    }
    if (!isInStock) {
      alert("Selected variant is out of stock");
      return;
    }
    // Implement your add to cart logic here
    console.log("Adding to cart:", {
      product,
      size: selectedSize,
      color: selectedColor,
      quantity,
      price: currentPrice,
      discountPrice: currentDiscountPrice,
    });
    alert("Product added to cart!");
  };

  const handleRemove = async () => {
    setIsVisible(false);
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  const handleShowFixedBar = () => {
    setIsVisible(true);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Breadcrumb */}
        <motion.div className="mb-2" variants={itemVariants}>
          <BreadcrumbNavigation
            category={category}
            productName={product.name}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Image Gallery */}
          <motion.div
            className="relative lg:sticky lg:top-[6rem] h-fit"
            variants={itemVariants}
          >
            <ImageGallery
              images={selectedColor.images}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          </motion.div>

          {/* Right Column - Product Information and Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-6 lg:space-y-8"
          >
            <div className="space-y-6 lg:space-y-6">
              {/* Product Info Section */}
              <ProductInfo
                name={product.name}
                code={product.code}
                price={currentPrice}
                discountPrice={currentDiscountPrice}
                averageRating={product.averageRating}
                reviewsCount={product.reviews.length}
                isInStock={isInStock}
                brand={product.brand}
              />

              {/* Main Action Buttons */}
              <AnimatePresence>
                {!isVisible && (
                  <motion.div
                    className="mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ActionButtons
                      selectedSize={selectedSize}
                      selectedColor={selectedColor}
                      onAddToCart={handleAddToCart}
                      isWishlisted={isWishlisted}
                      toggleWishlist={toggleWishlist}
                      disabled={!isInStock}
                      className="w-full sm:w-auto"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Product Options */}
              <div className="space-y-6 bg-gray-50/50 backdrop-blur-md rounded-xl shadow-sm">
                <ColorSelector
                  colors={product.colors}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />

                <SizeSelector
                  sizes={product.sizes}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                  isInStock={isInStock}
                />

                <QuantitySelector
                  quantity={quantity}
                  handleQuantityChange={handleQuantityChange}
                  maxQuantity={product.stock}
                />
              </div>

              {/* Delivery Section */}
              <div className="border-t pt-6">
                <DeliverySection />
              </div>

              {/* Fabric Details Section */}
              <motion.div
                className="border border-gray-100 rounded-xl p-6 bg-white transition-shadow duration-300"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className="text-lg font-medium mb-4 text-primary">
                  Fabric Details
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-gray-600 text-sm">Type</span>
                      <p className="font-medium">{product.fabric.type}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-gray-600 text-sm">Weight</span>
                      <p className="font-medium">{product.fabric.weight}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-gray-600 text-sm">Opacity</span>
                      <p className="font-medium">{product.fabric.opacity}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-gray-600 text-sm">Care</span>
                      <p className="font-medium">{product.fabric.care}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-3">Key Features:</h4>
                    <ul className="grid grid-cols-2 gap-3">
                      {product.fabric.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          className="flex items-center text-sm"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div variants={itemVariants} className="mt-16">
          <ProductDetailsTabs product={product} />
        </motion.div>

        {/* Similar Products */}
        {product.similarProducts.length > 0 && (
          <motion.div variants={itemVariants} className="mt-6">
            <SimilarProducts products={product.similarProducts} />
          </motion.div>
        )}

        {/* Fixed Bottom Bar */}
        <AnimatePresence>
          {isVisible && (
            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-white/90 border-t border-gray-200/30 backdrop-blur-lg z-50 px-4 py-4 shadow-lg"
              variants={actionButtonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-8">
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <motion.div
                    className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={selectedImage}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-lg truncate text-primary">
                      {product.name}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <div className="flex items-center gap-2">
                        <motion.span
                          key={currentDiscountPrice}
                          className="text-lg font-semibold"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          ₹{currentDiscountPrice.toLocaleString()}
                        </motion.span>
                        {currentDiscountPrice !== currentPrice && (
                          <motion.span
                            className="line-through text-gray-500"
                            key={currentPrice}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            ₹{currentPrice.toLocaleString()}
                          </motion.span>
                        )}
                      </div>
                      <motion.div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          isInStock
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {isInStock ? "In Stock" : "Out of Stock"}
                      </motion.div>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      {selectedColor && (
                        <motion.div
                          className="flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                        >
                          <span
                            className="w-4 h-4 rounded-full border shadow-sm"
                            style={{ backgroundColor: selectedColor.code }}
                          ></span>
                          <span>{selectedColor.name}</span>
                        </motion.div>
                      )}
                      {selectedSize && (
                        <motion.div
                          className="flex items-center gap-1"
                          whileHover={{ scale: 1.05 }}
                        >
                          <span>Size:</span>
                          <span className="font-medium">{selectedSize}</span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="flex-1 sm:flex-none">
                    <ActionButtons
                      selectedSize={selectedSize}
                      selectedColor={selectedColor}
                      onAddToCart={handleAddToCart}
                      isWishlisted={isWishlisted}
                      toggleWishlist={toggleWishlist}
                      disabled={!isInStock}
                      className="w-full sm:w-auto"
                    />
                  </div>
                  <motion.button
                    onClick={handleRemove}
                    className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-lg"
                    variants={removeButtonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      variants={svgVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </motion.svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating View Button */}
        <AnimatePresence>
          {!isVisible && (
            <motion.button
              className="fixed bottom-6 right-6 bg-primary hover:bg-zinc-900 text-white p-4 rounded-full shadow-xl z-50"
              onClick={handleShowFixedBar}
              variants={floatingButtonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="View Cart"
            >
              <EyeIcon className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetails;
