"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { HeroSection as HeroSectionType } from "@/types";
import BannerSlider from "./BannerSlider";

interface HeroSectionProps {
  data?: HeroSectionType;
}

const HeroSection = ({ data }: HeroSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative min-h-[400px] pt-[120px]  flex items-center justify-center">
      {/* Content Container */}
      <div className="relative z-10 w-full px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-b from-black via-gray-800 to-gray-700 leading-[1.2] md:leading-[1.3] py-2 max-w-5xl mx-auto">
          {data?.heading || "دليلك لإختيار أفضل شركات تجهيز الفنادق"}
        </h1>

        {/* Description */}
        {data?.description && (
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {data.description}
          </p>
        )}
        {data?.heroslider?.ads_banners &&
          data.heroslider.ads_banners.length > 0 && (
            <BannerSlider banners={data.heroslider.ads_banners} />
          )}
      </div>
    </div>
  );
};

export default HeroSection;
