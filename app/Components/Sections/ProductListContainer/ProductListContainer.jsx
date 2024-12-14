import React from "react";
import Men from "./Men/Men";
import Women from "./Women/Women";
import Kids from "./Kids/Kids";
import { useState } from "react";

function ProductListContainer({ title, mainState }) {
  const [selectedCategory, setSelectedCategory] = useState(mainState);
  return (
    <div className="w-full max-w-[95vw] mx-auto h-fit pt-10 flex flex-col align-center items-center justify-center gap-8 bg-white">
      <h2 className="text-5xl font-semibold text-center before:content-[''] before:block before:w-full before:h-[2px] before:bg-gradient-to-r from-transparent via-accent to-accent-dark before:mb-4">
        {title}
      </h2>

      <div className="options flex flex-row justify-center items-center gap-4 text-center">
        <button
          className="text-lg font-medium bg-none p-2 text-primary hover:text-accent transition-all duration-300 focus:border-b-2 focus:border-accent"
          onClick={() => setSelectedCategory("Women")}
        >
          Women
        </button>
        <button
          className="text-lg font-medium bg-none p-2 text-primary hover:text-accent transition-all duration-300 focus:border-b-2 focus:border-accent"
          onClick={() => setSelectedCategory("Men")}
        >
          Men
        </button>

        <button
          className="text-lg font-medium bg-none p-2 text-primary hover:text-accent transition-all duration-300 focus:border-b-2 focus:border-accent"
          onClick={() => setSelectedCategory("Kids")}
        >
          Kids
        </button>
      </div>
      {selectedCategory === "Men" && <Men />}
      {selectedCategory === "Kids" && <Kids />}
      {selectedCategory === "Women" && <Women />}
    </div>
  );
}

export default ProductListContainer;
