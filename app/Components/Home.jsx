"use client";

import React from "react";
import Hero from "./Sections/Hero/Hero";
import Banners from "./Sections/Banners/Banners";
import NewArrival from "./Sections/NewArrival/NewArrival";
import Banners2 from "./Sections/Banners-2/Banners2";
import Trendings from "./Sections/Trendings/Trendings";
import Wedding from "./Sections/Wedding/Wedding";

function Home() {
  return (
    <div className="flex flex-col gap-4 overflow-hidden w-[100vw] mx-auto">
      <Hero />
      <Banners />
      <NewArrival />
      <Banners2 />
      <Trendings />
      <Wedding />
    </div>
  );
}

export default Home;
