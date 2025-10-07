// Common/shared types used across the application

export interface Image {
  url: string;
  width: number;
  height: number;
  alt?: string;
}

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Link {
  id: number;
  title: string;
  url: string;
  isExternal: boolean;
}

export interface SocialLink {
  id: number;
  title: string | null;
  url: string;
  isExternal: boolean;
}

// Meta data types (extensible for future use)
export interface Meta {
  [key: string]: string | number | boolean | object | null | undefined;
}

// Base Strapi entity interface
export interface StrapiBaseEntity {
  id: number;
  documentId?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: string;
}
