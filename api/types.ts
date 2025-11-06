export type Brand = {
  id: number;
  name: string;
  logo_url?: string;
  products_count?: number;
};
// src/api/types.ts
export type ProductDetailSpec = Record<string, string>;
export type ProductDetail = {
  sku: string;
  stock: number;
  specs?: ProductDetailSpec;
};

export type BrandLite = { id: number; name: string; logo_url?: string };

export type Product = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  thumbnail_url?: string;
  brand?: BrandLite;
  detail?: ProductDetail;
};

export type Paginated<T> = {
  data: T[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
};
