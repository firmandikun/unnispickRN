import { useQuery } from "@tanstack/react-query";
import { fetchBrands } from "../api/brands";

export const useBrands = (page = 1, perPage = 10) =>
  useQuery({
    queryKey: ["brands", page, perPage],
    queryFn: () => fetchBrands(page, perPage),
    staleTime: 60_000,
  });
