import { api } from "./client";
import { Paginated, Product } from "./types";

function normalize<T>(raw: any): Paginated<T> {
  // Tahan dua format: {data, meta:{...}} ATAU {data, current_page, ...}
  const data = Array.isArray(raw?.data) ? raw.data : Array.isArray(raw) ? raw : [];
  const metaSource = raw?.meta ?? raw ?? {};

  return {
    data,
    meta: {
      current_page: Number(metaSource.current_page ?? 1),
      per_page: Number(metaSource.per_page ?? 5),
      total: Number(metaSource.total ?? 0),
      last_page: Number(metaSource.last_page ?? 1),
    },
  };
}

export async function fetchProducts(
  page = 1,
  perPage = 5,
  brandId?: number
): Promise<Paginated<Product>> {
  const params: Record<string, any> = { page, per_page: perPage };
  if (brandId) params.brand_id = brandId;

  try {
    const { data } = await api.get("/products", { params });
    return normalize<Product>(data);
  } catch (e: any) {
    console.log("fetchProducts error:", e?.response?.status, e?.response?.data ?? e?.message);
    return {
      data: [],
      meta: { current_page: 1, per_page: perPage, total: 0, last_page: 1 },
    };
  }
}

export async function fetchProduct(id: number): Promise<Product> {
  const { data } = await api.get(`/products/${id}`);
  return (data?.data ?? data) as Product;
}
