"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Mesh overlay for hero section only */}
      <Image
        src="/mesh.svg"
        alt="Background Mesh"
        fill
        className="object-cover opacity-5 mix-blend-overlay"
        sizes="100vw"
        priority
        quality={100}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 leading-[1.2] md:leading-[1.3] py-2">
          كل ما تحتاجه لتجهيز فندقك
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-700">
          اكتشف شركات وخدمات ومنتجات مختارة بعناية لتلبية احتياجات فندقك
        </p>

        {/* Search Container */}
        <div className="relative max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="البحث عن شركات ، موردين أنظمة إدارة الفنادق ... إلخ"
              className="w-full px-6 py-4 text-lg rounded-full border border-slate-300 
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
      </div>
    </div>
  );
};

export default HeroSection;
