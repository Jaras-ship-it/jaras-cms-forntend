"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { Category } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoriesProps {
  data?: Category[];
}

const Categories = ({ data }: CategoriesProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header with Navigation */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">التصنيفات</h2>
        <div className="flex gap-2">
          <button
            onClick={scrollRight}
            className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 hover:bg-gray-50"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={scrollLeft}
            className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 hover:bg-gray-50"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-4 min-w-max">
          {data?.map((category) => (
            <div
              key={category.id}
              className="border border-gray-200 rounded-lg p-1 bg-white shadow-tw-shadow flex flex-col min-w-[280px] max-w-[280px]"
            >
              <div className="h-48 overflow-hidden">
                <Image
                  src={process.env.NEXT_PUBLIC_URL + category.Image.url}
                  alt="category image"
                  width={280}
                  height={192}
                  priority
                  className="rounded-md h-full w-full object-cover"
                />
              </div>
              <hr className="border-slate-300 w-full"></hr>
              <div className="flex flex-col gap-1 p-2">
                <h2 className="text-lg font-semibold line-clamp-1">
                  {category.name}
                </h2>
                <p className="text-gray-700 text-sm line-clamp-2">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
