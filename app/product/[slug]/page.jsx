import React from "react";
import ProductSlug from "./Components/ProductSlug";
import Header from "@/components/Common/Header/Header";
import Footer from "@/components/Common/Footer/Footer";

function Page() {
  return (
    <div className="bg-white mt-8">
      <Header />
      <ProductSlug />
      <Footer />
    </div>
  );
}

export default Page;