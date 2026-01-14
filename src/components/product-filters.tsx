import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { useProductsQuery } from "@/hooks/use-products-query";
import { useFacetsQuery } from "@/hooks/use-facets-query";
import { parseAsFilters, serializeFilterValue } from "@/lib/filters";
import { useQueryState } from "nuqs";

export const ProductFilters = () => {
  const { data: baseFacets, isPending: isPendingBaseFacets } = useFacetsQuery();
  const { data } = useProductsQuery();
  const filteredFacets = data?.facets;

  const [filterParams, setFilterParams] = useQueryState(
    "filters",
    parseAsFilters.withDefault({})
  );

  const toggleFilter = (identifier: string, value: string) => {
    const currentValues = filterParams[identifier] ?? [];
    const isSelected = currentValues.includes(value);

    const newValues = isSelected
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    setFilterParams({ ...filterParams, [identifier]: newValues });
  };

  const clearFilters = () => {
    setFilterParams(null);
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
        {baseFacets?.map((facet) => (
          <div key={facet.identifier}>
            <h3 className="font-medium text-sm mb-3">{facet.displayName}</h3>
            <div className="space-y-2">
              {facet.options.map((option) => {
                const serializedValue = serializeFilterValue(option.value);

                const isSelected =
                  filterParams[facet.identifier]?.includes(serializedValue) ??
                  false;

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
                        toggleFilter(facet.identifier, serializedValue)
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
