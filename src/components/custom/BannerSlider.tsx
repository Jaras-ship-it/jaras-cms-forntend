"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { AdBanner } from "@/types";

interface BannerSliderProps {
  banners?: AdBanner[];
  autoSlideInterval?: number;
}

const BannerSlider = ({
  banners = [],
  autoSlideInterval = 5000,
}: BannerSliderProps) => {
  // Simple check - return null if no banners or empty array
  if (!banners?.length) return null;

  // Helper function to check if banner is valid
  const isValidBanner = (banner: AdBanner) => banner?.image?.url && banner.id; // Filter valid banners
  const validBanners = banners.filter(isValidBanner);

  if (!validBanners.length) return null;

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
        loop={validBanners.length > 1}
        className="rounded-lg border-slate-200 overflow-hidden bg-white"
      >
        {validBanners.map((banner, index) => (
          <SwiperSlide key={banner.id}>
            <a
              href={banner.url || "#"}
              target={banner.url ? "_blank" : "_self"}
              rel={banner.url ? "noopener noreferrer" : undefined}
              className="block relative group"
            >
              <div className="relative h-[200px] md:h-[400px] overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL || ""}${
                    banner.image.url
                  }`}
                  alt={banner.image.alternativeText || "Banner Image"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority={index === 0}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>
          </SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        {validBanners.length > 1 && (
          <>
            <button
              className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Previous banner"
            >
              ←
            </button>
            <button
              className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Next banner"
            >
              →
            </button>
          </>
        )}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
