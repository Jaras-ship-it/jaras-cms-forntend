import React from "react";
import { Facebook, Instagram, Twitter, Linkedin, Mail } from "lucide-react";
import Logo from "@/components/custom/logoIcons/Logo";
import { Footer as FooterData, SocialLink } from "@/types";

interface FooterProps {
  data?: FooterData;
}

const Footer = ({ data }: FooterProps) => {
  const getSocialIcon = (title: string) => {
    const iconName = title.toLowerCase();
    switch (iconName) {
      case "facebook":
        return <Facebook className="w-5 h-5" />;
      case "instagram":
        return <Instagram className="w-5 h-5" />;
      case "twitter":
        return <Twitter className="w-5 h-5" />;
      case "linkedin":
        return <Linkedin className="w-5 h-5" />;
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

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
            {data?.socialLinks?.map((social: SocialLink) => (
              <a
                key={social.id}
                href={social.url}
                target={social.isExternal ? "_blank" : "_self"}
                rel={social.isExternal ? "noopener noreferrer" : undefined}
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                aria-label={social.title}
              >
                {getSocialIcon(social.title)}
              </a>
            )) || (
              // Default social links if data is not available
              <>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
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
