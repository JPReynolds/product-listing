import type { FacetFilters } from "@/api/products/products.type";
import { RESERVED_PARAMS } from "@/lib/constants";
import {
  generateFilters,
  parseAsCommaSeparated,
  type FilterParams,
} from "@/lib/filters";
import { useFacetsQuery } from "./use-facets-query";
import { useMemo } from "react";
import { useSearchParams } from "react-router";

export type UseFiltersReturn = {
  filters: FacetFilters;
  filterParams: FilterParams;
};

export const useFilters = (): UseFiltersReturn => {
  const [searchParams] = useSearchParams();

  const { data: facets } = useFacetsQuery();

  const filterParams: FilterParams = useMemo(() => {
    const result: FilterParams = {};

    if (!facets) return result;

    const identifiers = new Set(facets.map(({ identifier }) => identifier));

    for (const [key, value] of searchParams.entries()) {
      if (RESERVED_PARAMS.includes(key) || !identifiers.has(key)) continue;

      const parsed = parseAsCommaSeparated.parse(value);
      if (parsed) {
        result[key] = parsed;
      }
    }

    return result;
  }, [searchParams, facets]);

  const filters: FacetFilters = useMemo(() => {
    if (!facets) return {};
    return generateFilters(filterParams, facets);
  }, [filterParams, facets]);

  return {
    filters,
    filterParams,
  };
};
