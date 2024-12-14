"use client";

import React from "react";
import ProductDetails from "@/components/ProductDetailPage/ProductDetails";
import { useParams, usePathname } from "next/navigation";

function ProductSlug() {
  const params = useParams();
  const { slug, category } = params;
  const pathname = usePathname();

  // Get the domain URL
  const domain = typeof window !== "undefined" ? window.location.origin : "";
  const fullUrl = `${domain}${pathname}`;

  return (
    <div>
      <ProductDetails slug={slug} category={category} url={fullUrl} />
    </div>
  );
}

export default ProductSlug;
