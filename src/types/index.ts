export interface Image {
  url: string;
  width: number;
  height: number;
  alt?: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  Image: Image;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
