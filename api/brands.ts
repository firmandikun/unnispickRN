import { api } from "@/api/client";

export type Brand = { id: number; name: string; logo_url?: string; products_count?: number };
export type Paginated<T> = { data: T[]; meta: { current_page: number; per_page: number; total: number; last_page: number } };

const normalize = <T,>(raw: any): Paginated<T> => ({
  data: raw?.data ?? [], // aman walau undefined
  meta: {
    current_page: Number(raw?.meta?.current_page ?? raw?.current_page ?? 1),
    per_page: Number(raw?.meta?.per_page ?? raw?.per_page ?? 10),
    total: Number(raw?.meta?.total ?? raw?.total ?? 0),
    last_page: Number(raw?.meta?.last_page ?? raw?.last_page ?? 1),
  },
});

export async function fetchBrands(page=1, perPage=10): Promise<Paginated<Brand>> {
  const { data } = await api.get("/brands", { params: { page, per_page: perPage } });
  return normalize<Brand>(data);
}
