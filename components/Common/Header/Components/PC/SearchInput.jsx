// components/Header/SearchInput.js

import React, { useState } from "react";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchTerm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 text-sm text-secondary border border-border rounded-full px-4 hover:border-accent transition-all duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 22 22"
        fill="currentColor"
        strokeWidth={1}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          fillRule="evenodd"
          d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
          clipRule="evenodd"
        />
      </svg>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow p-2 border-none outline-none text-primary bg-bg"
      />
    </form>
  );
};

export default SearchInput;
