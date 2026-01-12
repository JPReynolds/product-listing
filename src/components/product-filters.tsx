import { Checkbox } from "@/components/ui/checkbox";
import { useFilters } from "@/hooks/use-filters";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { useProductsQuery } from "@/hooks/use-products-query";
import { useFacetsQuery } from "@/hooks/use-facets-query";
import { getFilterParam, parseAsCommaSeparated } from "@/lib/filters";
import type { FilterValue } from "@/api/products/products.type";
import { useSearchParams } from "react-router";
import { RESERVED_PARAMS } from "@/lib/constants";

export const ProductFilters = () => {
  const [, setSearchParams] = useSearchParams();

  const { data: baseFacets, isPending: isPendingBaseFacets } = useFacetsQuery();

  const { data } = useProductsQuery();

  const filteredFacets = data?.facets;

  const { filterParams } = useFilters();

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

  if (isPendingBaseFacets) {
    return (
      <div className="rounded-lg border bg-card p-4">
        <h2 className="font-semibold text-lg mb-4">Filters</h2>
        <div className=" space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Filters</h2>
        {Object.keys(filterParams).length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {baseFacets &&
          baseFacets.map((facet) => (
            <div key={facet.identifier}>
              <h3 className="font-medium text-sm mb-3">{facet.displayName}</h3>
              <div className="space-y-2">
                {facet.options.map((option) => {
                  const isSelected =
                    filterParams[facet.identifier]?.includes(
                      getFilterParam(option.value)
                    ) ?? false;

                  const filteredOption = filteredFacets
                    ?.find((f) => f.identifier === facet.identifier)
                    ?.options.find((o) => o.identifier === option.identifier);

                  const isDisabled = !filteredOption && !isSelected;

                  return (
                    <label
                      key={option.identifier}
                      htmlFor={option.identifier}
                      className="flex items-center gap-2"
                    >
                      <Checkbox
                        id={option.identifier}
                        checked={isSelected}
                        disabled={isDisabled}
                        className="cursor-pointer"
                        onCheckedChange={() =>
                          toggleFilter(facet.identifier, option.value)
                        }
                      />
                      <span className="text-sm flex-1">
                        {option.displayValue}
                      </span>
                      <span className="text-xs">
                        ({filteredOption?.productCount ?? 0})
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
