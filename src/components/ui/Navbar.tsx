"use client";
import React, { useState, useEffect } from "react";
import Logo from "@/components/custom/Logo";
import GlobalSearch from "@/components/ui/GlobalSearch";
import { Menu, X } from "lucide-react";
import { Header } from "@/types";
import Link from "next/link";

interface NavbarProps {
  data: Header;
}
const Navbar = ({ data }: Readonly<NavbarProps>) => {
  const { ctaBtn } = data;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if navbar should be compact
      setIsScrolled(currentScrollY > 50);

      // Determine visibility based on scroll direction
      if (currentScrollY < 10) {
        // Always show at top of page
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold - hide navbar
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50  text-sm transition-transform duration-300 ease-in-out max-w-[1400px] mx-auto ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ top: 0 }}
    >
      <nav
        className={`
        relative w-full flex flex-wrap md:flex-nowrap items-center justify-between 
        transition-all duration-500 ease-in-out
        ${
          isScrolled
            ? "mt-4 max-w-4xl border border-gray-200 rounded-[24px] mx-2 p-1 ps-4 md:py-1 sm:mx-auto shadow-lg backdrop-blur-sm bg-white/90"
            : "mt-0 max-w-none px-8 sm:px-4 lg:px-4 py-4 bg-transparent md:mx-4 shadow-none border-transparent"
        }
      `}
      >
        <div className="flex items-center ">
          <Link
            className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
            href="/"
            aria-label="Preline"
          >
            <Logo />
          </Link>
          <div
            className={`mr-3 px-2 border-r-[2px] w-full border-slate-300 ${
              isScrolled ? "hidden" : "block"
            }`}
          >
            <p className="text-sm font-bold leading-tight">
              دليل الشركات والموردين
            </p>
          </div>
          <div className="ms-1 sm:ms-2"></div>
        </div>

        {/* Global Search - Center */}
        <div className="hidden md:flex flex-1 justify-center mx-4">
          <div
            className={`${isScrolled ? "w-full max-w-md" : "w-full max-w-lg"}`}
          >
            <GlobalSearch placeholder="البحث في دليل الشركات..." />
          </div>
        </div>

        <div className="flex items-center gap-1 md:order-4 md:ms-4">
          {/* Mobile Search Button */}
          <div className="md:hidden">
            <GlobalSearch placeholder="البحث..." />
          </div>

          <a
            className={`
              w-full sm:w-auto whitespace-nowrap py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border 
              transition-all duration-500 ease-in-out transform hover:scale-105
              ${
                isScrolled
                  ? "border-transparent bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                  : "border-blue-600 bg-blue-700 text-white hover:bg-blue-700 hover:shadow-md"
              }
              focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none
            `}
            href={ctaBtn.url}
            target={ctaBtn.isExternal ? "_blank" : "_self"}
            rel={ctaBtn.isExternal ? "noopener noreferrer" : undefined}
          >
            {ctaBtn.title ?? "إحجز مساحتك الآن"}
          </a>

          <div className="md:hidden">
            <button
              type="button"
              className={`
                hs-collapse-toggle flex justify-center items-center size-9.5 border rounded-full 
                transition-all duration-500 ease-in-out transform hover:scale-105
                ${
                  isScrolled
                    ? "border-gray-200 text-gray-500 hover:bg-gray-200 focus:bg-gray-200"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100 focus:bg-gray-100"
                }
                focus:outline-hidden
              `}
              id="hs-navbar-header-floating-collapse"
              aria-expanded="false"
              aria-controls="hs-navbar-header-floating"
              aria-label="Toggle navigation"
              data-hs-collapse="#hs-navbar-header-floating"
            >
              <Menu className="hs-collapse-open:hidden shrink-0 size-3.5" />
              <X className="hs-collapse-open:block hidden shrink-0 size-4" />
            </button>
          </div>
        </div>

        <div
          id="hs-navbar-header-floating"
          className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow md:block"
          aria-labelledby="hs-navbar-header-floating-collapse"
        >
          {/* <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-2 md:gap-3 mt-3 md:mt-0 py-2 md:py-0 md:ps-7">
            <a
              className="py-0.5 md:py-3 px-4 md:px-1  sm:border-s-0 md:border-b-2 border-gray-800 font-medium text-gray-800 hover:text-gray-800 focus:outline-hidden"
              href="#"
              aria-current="page"
            >
              Home
            </a>
          </div> */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
