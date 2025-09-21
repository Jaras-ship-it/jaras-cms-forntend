"use client";
import React from "react";
import Logo from "@/components/custom/Logo";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  data: {
    logoText: {
      id: number;
      text: string;
      url: string;
    };
    ctaBtn: {
      id: number;
      text: string;
      url: string;
    };
  };
}
const Navbar = ({ data }: Readonly<NavbarProps>) => {
  const { ctaBtn } = data;
  return (
    <header className="fixed top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm pointer-events-none">
      <nav className="mt-4 relative max-w-2xl w-full border border-gray-200 rounded-[24px] mx-2 flex flex-wrap md:flex-nowrap items-center justify-between p-1 ps-4 md:py-1 sm:mx-auto shadow-lg backdrop-blur-sm bg-white/90 pointer-events-auto">
        <div className="flex items-center">
          <a
            className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
            href="../templates/personal/index.html"
            aria-label="Preline"
          >
            <Logo />
          </a>
          <div className="ms-1 sm:ms-2"></div>
        </div>

        <div className="flex items-center gap-1 md:order-4 md:ms-4">
          <a
            className="w-full sm:w-auto whitespace-nowrap py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-transparent bg-blue-600 text-white hover:bg-gray-900 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            href="#"
          >
            {ctaBtn.text ?? "إحجز مساحتك الآن"}
          </a>

          <div className="md:hidden">
            <a
              type="button"
              href={ctaBtn.url}
              className="hs-collapse-toggle flex justify-center items-center size-9.5 border border-gray-200 text-gray-500 rounded-full hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200"
              id="hs-navbar-header-floating-collapse"
              aria-expanded="false"
              aria-controls="hs-navbar-header-floating"
              aria-label="Toggle navigation"
              data-hs-collapse="#hs-navbar-header-floating"
            >
              <Menu className="hs-collapse-open:hidden shrink-0 size-3.5" />
              <X className="hs-collapse-open:block hidden shrink-0 size-4" />
            </a>
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
