// Home page specific types

import { StrapiImage, Meta, StrapiBaseEntity } from "./common";
import { Category } from "./product";

export interface AdBanner extends StrapiBaseEntity {
  target: string;
  image: StrapiImage;
  localizations: Record<string, unknown>[];
}

export interface HeroSlider {
  id: number;
  name: string;
  ads_banners: AdBanner[];
  slider: AdBanner[];
}

export interface HeroSection {
  __component: "layout.hero-section";
  id: number;
  heading: string;
  description: string;
  slider: {
    banners: AdBanner[];
  };
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
