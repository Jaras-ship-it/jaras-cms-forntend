import React from "react";
import Logo from "@/components/custom/logoIcons/Logo";
import { Footer as FooterData, SocialLink } from "@/types";
import {
  getSocialMediaIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsAppIcon,
} from "./SocialMediaIcons";

interface FooterProps {
  data?: FooterData;
}

const Footer = ({ data }: FooterProps) => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Main Content - Single Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Logo />
            {/* <h2 className="text-base font-bold text-slate-600">
              {data?.logoText?.title || "دليل الموردين والشركات"}
            </h2> */}
          </div>
          <span className="text-gray-500 text-sm">
            {data?.footerCopyText || "© 2024 جميع الحقوق محفوظة"}
          </span>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {data?.socialLinks
              ?.filter((social) => social.title && social.url)
              ?.map((social: SocialLink) => (
                <a
                  key={social.id}
                  href={social.url}
                  target={social.isExternal ? "_blank" : "_self"}
                  rel={social.isExternal ? "noopener noreferrer" : undefined}
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                  aria-label={social.title || "Social link"}
                >
                  {getSocialMediaIcon(social.title)}
                </a>
              )) || (
              // Default social links if data is not available
              <>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <TwitterIcon className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
