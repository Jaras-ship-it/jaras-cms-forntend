"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { AdBanner } from "@/types";

interface BannerSliderProps {
  banners: AdBanner[];
  autoSlideInterval?: number;
}

const BannerSlider = ({
  banners,
  autoSlideInterval = 5000,
}: BannerSliderProps) => {
  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full mx-auto mt-9 mb-6">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: autoSlideInterval,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        loop={banners.length > 1}
        className="rounded-lg border-slate-200 overflow-hidden bg-white"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id}>
            <a
              href={banner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative group"
            >
              <div className="relative h-[200px] md:h-[400px] overflow-hidden">
                <Image
                  src={process.env.NEXT_PUBLIC_URL + banner.banner_image.url}
                  alt={banner.banner_image.alternativeText || banner.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority={index === 0}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Banner Title */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  {/* <h3 className="text-white font-semibold text-lg drop-shadow-lg">
                    {banner.name}
                  </h3> */}
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        {banners.length > 1 && (
          <>
            <button
              className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Previous banner"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Next banner"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination {
          bottom: 16px !important;
        }

        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.7) !important;
          opacity: 1 !important;
        }

        .swiper-pagination-bullet-active {
          background: #2563eb !important;
          transform: scale(1.2);
        }

        .swiper:hover .swiper-button-prev-custom,
        .swiper:hover .swiper-button-next-custom {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default BannerSlider;
