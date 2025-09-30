// Product and Category related types

import { Image, StrapiBaseEntity } from "./common";

export interface Product extends StrapiBaseEntity {
  name: string;
  description?: string;
  image?: Image;
  category?: string;
  price?: number;
  rating?: number;
  stock?: number | string;
}

export interface Category extends StrapiBaseEntity {
  name: string;
  description: string;
  Image: Image;
  slug?: string;
  products?: {
    id: number;
    name: string;
    description?: string;
  }[];
}
