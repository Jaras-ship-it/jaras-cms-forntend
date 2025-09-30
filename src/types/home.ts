// Home page specific types

import { StrapiImage, Meta, StrapiBaseEntity } from "./common";
import { Category } from "./product";

export interface AdBanner extends StrapiBaseEntity {
  name: string;
  url: string;
  banner_image: StrapiImage;
  localizations: Record<string, unknown>[];
}

export interface HeroSlider {
  id: number;
  name: string;
  ads_banners: AdBanner[];
}

export interface HeroSection {
  __component: "layout.hero-section";
  id: number;
  heading: string;
  description: string;
  heroslider: HeroSlider;
}

export interface CategoriesSection {
  __component: "layout.categories-section";
  id: number;
  sectionTitle: string;
  categories: Category[];
}

export type HomePageBlock = HeroSection | CategoriesSection;

export interface HomePageData extends StrapiBaseEntity {
  title: string;
  blocks: HomePageBlock[];
}

export interface HomePageResponse {
  data: HomePageData;
  meta: Meta;
}
