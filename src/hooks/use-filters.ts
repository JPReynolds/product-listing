import type { FacetFilters } from "@/api/products/products.type";
import { hydrateFilters, parseAsFilters } from "@/lib/filters";
import { useFacetsQuery } from "./use-facets-query";
import { useMemo } from "react";
import { useQueryState } from "nuqs";

export type UseFiltersReturn = {
  filters: FacetFilters;
};

export const useFilters = (): UseFiltersReturn => {
  const [filterParams] = useQueryState(
    "filters",
    parseAsFilters.withDefault({})
  );

  const { data: facets } = useFacetsQuery();

  const filters: FacetFilters = useMemo(() => {
    if (!facets) return {};
    return hydrateFilters(filterParams, facets);
  }, [filterParams, facets]);

  return {
    filters,
  };
};
