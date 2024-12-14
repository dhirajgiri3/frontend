"use client";

import React from "react";
import { AnimatedTooltipPreview } from "@/components/Animations/AnimatedTooltipPreview";

function AuthRight({ title, description }) {
  return (
    <div className="flex flex-col justify-center items-center px-20 pr-[10rem]">
      <AnimatedTooltipPreview />
      <h1 className="text-lg font-semibold text-center text-primary mb-8">
        {title}
      </h1>
      <p className="text-center text-xs text-secondary">{description}</p>
    </div>
  );
}

export default AuthRight;
