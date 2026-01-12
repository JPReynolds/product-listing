import type { FacetFilters, FilterValue } from "@/api/products/products.type";
import { RESERVED_PARAMS } from "@/lib/constants";
import {
  generateFilters,
  getFilterParam,
  parseAsCommaSeparated,
  type FilterParams,
} from "@/lib/filters";
import { useFacetsQuery } from "./use-facets-query";
import { useMemo } from "react";
import { useSearchParams } from "react-router";

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: facets } = useFacetsQuery();

  const filterParams: FilterParams = useMemo(() => {
    const result: FilterParams = {};

    if (!facets) return result;

    const identifiers = new Set(facets.map((f) => f.identifier));

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

  const isFilterSelected = (identifier: string, value: FilterValue) => {
    const filterParam = getFilterParam(value);
    return filterParams[identifier]?.includes(filterParam) ?? false;
  };

  const toggleFilter = (identifier: string, value: FilterValue) => {
    const param = getFilterParam(value);
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        const filterValues =
          parseAsCommaSeparated.parse(params.get(identifier) ?? "") ?? [];

        const paramIndex = filterValues.indexOf(param);

        if (paramIndex >= 0) {
          filterValues.splice(paramIndex, 1);
        } else {
          filterValues.push(param);
        }

        if (filterValues.length > 0) {
          params.set(identifier, parseAsCommaSeparated.serialize(filterValues));
        } else {
          params.delete(identifier);
        }

        params.set("page", "1");

        return params;
      },
      { replace: true }
    );
  };

  const clearFilters = () => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams();

        for (const key of RESERVED_PARAMS) {
          const value = prev.get(key);
          if (value) {
            newParams.set(key, value);
          }
        }

        return newParams;
      },
      { replace: true }
    );
  };

  const hasActiveFilters = Object.keys(filterParams).length > 0;

  return {
    filters,
    isFilterSelected,
    toggleFilter,
    clearFilters,
    hasActiveFilters,
  };
};
