import React from "react";
import ProductList from "@/components/ProductList/ProductList";
import Child1 from "@/Public/Assets/Images/Products/Child/Child-1.jpg";
import Child2 from "@/Public/Assets/Images/Products/Child/Child-2.jpg";
import Child3 from "@/Public/Assets/Images/Products/Child/Child-3.jpg";
import Child4 from "@/Public/Assets/Images/Products/Child/Child-4.jpg";
import Child5 from "@/Public/Assets/Images/Products/Child/Child-5.jpg";
import Childg1 from "@/Public/Assets/Images/Products/Child/Child-g1.jpg";
import Childg2 from "@/Public/Assets/Images/Products/Child/Child-g2.jpg";
import Childind1 from "@/Public/Assets/Images/Products/Child/Child-ind1.jpg";

const KidsProductData = [
  {
    id: 1,
    name: "Kids Casual T-Shirt",
    image: Child1,
    price: 35,
    discountPrice: 28,
    description: "Comfortable cotton t-shirt for kids",
    rating: 4.5,
    reviews: 45,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    isSale: true,
    isStock: true,
    link: "/products/kids/casual-tshirt", // Added meaningful link
  },
  {
    id: 2,
    name: "Children's Party Dress",
    image: Child2,
    price: 55,
    discountPrice: 45,
    description: "Beautiful party dress for special occasions",
    rating: 4.8,
    reviews: 62,
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    isSale: true,
    isStock: true,
    link: "/products/kids/party-dress",
  },
  {
    id: 3,
    name: "Boys Sports Set",
    image: Child3,
    price: 45,
    discountPrice: 38,
    description: "Comfortable sports wear set for active kids",
    rating: 4.3,
    reviews: 38,
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    isSale: true,
    isStock: true,
    link: "/products/kids/sports-set",
  },
  {
    id: 4,
    name: "Kids Winter Jacket",
    image: Child4,
    price: 65,
    discountPrice: 52,
    description: "Warm winter jacket with hood",
    rating: 4.6,
    reviews: 55,
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    isSale: true,
    isStock: true,
    link: "/products/kids/winter-jacket",
  },
  {
    id: 5,
    name: "Children's Denim Set",
    image: Child5,
    price: 48,
    discountPrice: 40,
    description: "Stylish denim outfit for kids",
    rating: 4.4,
    reviews: 42,
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    isSale: true,
    isStock: true,
    link: "/products/kids/denim-set",
  },
  {
    id: 6,
    name: "Girls Summer Dress",
    image: Childg1,
    price: 42,
    discountPrice: 35,
    description: "Light and comfortable summer dress",
    rating: 4.7,
    reviews: 58,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    isSale: true,
    isStock: true,
    link: "/products/kids/summer-dress",
  },
  {
    id: 7,
    name: "Girls Party Wear",
    image: Childg2,
    price: 58,
    discountPrice: 48,
    description: "Elegant party wear for little girls",
    rating: 4.9,
    reviews: 65,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    isSale: true,
    isStock: true,
    link: "/products/kids/party-wear",
  },
  {
    id: 8,
    name: "Kids Traditional Wear",
    image: Childind1,
    price: 75,
    discountPrice: 60,
    description: "Beautiful traditional outfit for festivals",
    rating: 4.8,
    reviews: 72,
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    isSale: true,
    isStock: true,
    link: "/products/kids/traditional-wear",
  }
];

const Kids = () => {
  return (
    <section className="w-full">
      <ProductList ProductData={KidsProductData} />
    </section>
  );
};

export default Kids;
