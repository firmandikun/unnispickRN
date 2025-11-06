import { useQuery } from "@tanstack/react-query";
import { fetchProduct, fetchProducts } from "../api/products";

export const useProducts = (page = 1, perPage = 5, brandId?: number) =>
  useQuery({
    queryKey: ["products", page, perPage, brandId],
    queryFn: () => fetchProducts(page, perPage, brandId),
    staleTime: 30_000,
  });

export function useProduct(id?: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id as number),
    enabled: !!id,
    staleTime: 30_000,
  });
}
