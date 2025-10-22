"use client";
import React, { useState, useEffect } from "react";
import Logo from "@/components/custom/logoIcons/Logo";
import JarasIcon from "@/components/custom/logoIcons/JarasIcon";
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
  const [isClient, setIsClient] = useState(false);

  // Set client state to handle hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

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
  }, [lastScrollY, isClient]);

  return (
    <header
      className={`fixed inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 text-sm transition-transform duration-300 ease-in-out max-w-[1400px] mx-auto justify-between  ${
        isClient && isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ top: 0 }}
    >
      <nav
        className={`
        relative w-full flex flex-wrap md:flex-nowrap
        transition-all duration-500 ease-in-out justify-between items-center
        ${
          isClient && isScrolled
            ? "mt-4 max-w-5xl border border-gray-200 rounded-[24px] mx-2 p-1 ps-4 md:py-1 sm:mx-auto shadow-lg backdrop-blur-sm bg-white/90"
            : "mt-0 max-w-none px-8 sm:px-4 lg:px-4 py-4  md:mx-4 shadow-none border-transparent  bg-transparent "
        }
      `}
      >
        <div className="flex items-center">
          <Link
            className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
            href="/"
            aria-label="Preline"
          >
            {isClient && isScrolled ? (
              <JarasIcon
                width={32}
                height={32}
                className="transition-all duration-300"
              />
            ) : (
              <div className="block md:block">
                <div className="block sm:hidden">
                  <JarasIcon
                    width={28}
                    height={28}
                    className="transition-all duration-300"
                  />
                </div>
                <div className="hidden sm:block">
                  <Logo />
                </div>
              </div>
            )}
          </Link>
          <div
            className={`mr-3 px-2 border-r-[2px] border-slate-300 ${
              isClient && isScrolled ? "hidden" : "hidden sm:block"
            }`}
          >
            <p className="text-sm font-bold leading-tight">
              دليل الشركات والموردين
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="hidden md:flex w-fit ">
            {/* <div className="w-80 md:w-96">
              <GlobalSearch placeholder="البحث في دليل الشركات..." />
            </div> */}
          </div>
          {/* Mobile Search Button */}
          <div className="hidden">
            <GlobalSearch placeholder="البحث..." />
          </div>
          <Link
            href="/suppliers/register"
            className={`
              w-full sm:w-auto whitespace-nowrap py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border 
              transition-all duration-500 ease-in-out transform hover:scale-105
              ${
                isClient && isScrolled
                  ? "border-transparent bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                  : "border-blue-600 bg-blue-700 text-white hover:bg-blue-700 hover:shadow-md"
              }
              focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none
            `}
          >
            {ctaBtn?.title ?? "انضم كمورد"}
          </Link>

          <div className="hidden">
            <button
              type="button"
              className={`
                hs-collapse-toggle flex justify-center items-center size-9.5 border rounded-full 
                transition-all duration-500 ease-in-out transform hover:scale-105
                ${
                  isClient && isScrolled
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
      </nav>
    </header>
  );
};
export default Navbar;
