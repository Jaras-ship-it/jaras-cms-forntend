// Global layout types (Header, Footer, Navigation)

import { Link, SocialLink } from "./common";

export interface Header {
  id: number;
  ctaBtn: Link;
  logoText: Link;
}

export interface Footer {
  id: number;
  footerCopyText: string;
  socialLinks: SocialLink[];
  logoText: Link;
}
