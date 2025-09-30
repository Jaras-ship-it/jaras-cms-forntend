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
    <div className="relative min-h-[400px] pt-[120px] flex items-center justify-center">
      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-black via-gray-800 to-gray-700 leading-[1.2] md:leading-[1.3] py-2">
          {data?.heading || "دليلك لإختيار أفضل شركات تجهيز الفنادق"}
        </h1>

        {/* Description */}
        {data?.description && (
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {data.description}
          </p>
        )}

        {/* Search Container */}
        <div className="relative max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="البحث عن شركات ، موردين أنظمة إدارة الفنادق ... إلخ"
              className="w-full px-6 py-4 text-sm rounded-full border border-slate-300 
                focus:outline-none focus:ring-2 focus:ring-blue-500/50 
                shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                bg-white/80 backdrop-blur-sm
                transition-all duration-300
                hover:shadow-[0_8px_40px_rgb(0,0,0,0.06)]
                hover:border-gray-300/50"
            />
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 
                p-3 rounded-full bg-blue-700 hover:bg-blue-600 
                transition-colors duration-200 shadow-lg"
            >
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <p className="text-lg md:text-base mt-4 text-slate-500">
          اكتشف شركات وخدمات ومنتجات مختارة بعناية لتلبية احتياجات فندقك
        </p>
        {data?.heroslider?.ads_banners &&
          data.heroslider.ads_banners.length > 0 && (
            <BannerSlider banners={data.heroslider.ads_banners} />
          )}
      </div>
    </div>
  );
};

export default HeroSection;
