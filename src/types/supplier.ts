export interface Supplier {
  id: number;
  documentId: string;
  name: string;
  description?: string;
  slug: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  rating?: number;
  verified?: boolean;
  established?: number;
  logo?: {
    id: number;
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
}

export interface ProductWithSuppliers {
  id: number;
  documentId: string;
  name: string;
  description?: string;
  slug: string;
  suppliers: Supplier[];
  image?: Array<{
    id: number;
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  }>;
}
