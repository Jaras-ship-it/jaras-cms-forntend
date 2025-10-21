// Global application data types

import { Header, Footer } from "./layout";
import { Meta, StrapiBaseEntity, StrapiImage } from "./common";

export interface GlobalData extends StrapiBaseEntity {
  siteName: string;
  siteDescription: string;
  header: Header;
  footer: Footer;
  meta: Meta;
  favicon?: StrapiImage;
}
