"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { Category } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

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
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-0 py-12">
      {/* Section Header with Navigation */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">التصنيفات</h2>
        <div className="flex gap-2">
          <button
            onClick={scrollRight}
            className="p-2 rounded-full hover:bg-white hover:shadow-md transition-shadow duration-200 hover:border-gray-200"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={scrollLeft}
            className="p-2 rounded-full hover:bg-white hover:border-gray-200 hover:shadow-md transition-shadow duration-200 "
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="scroll-fade-container">
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide"
        >
          <div className="flex gap-4 pb-4 min-w-max">
            {data?.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug ?? category.id}`}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col min-w-[280px] max-w-[280px] shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer "
                aria-label={`عرض تصنيف ${category.name}`}
              >
                <div className="h-48 overflow-hidden relative">
                  <Image
                    src={process.env.NEXT_PUBLIC_URL + category.Image.url}
                    alt={category.Image?.alt || category.name}
                    width={280}
                    height={592}
                    priority
                    className="rounded-md h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 border border-white "
                  />
                  {/* Gradient overlay for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-t-md"></div>

                  {/* Category title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-white text-lg font-semibold line-clamp-2 drop-shadow-lg">
                      {category.name}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
