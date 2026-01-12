import { Checkbox } from "@/components/ui/checkbox";
import { useFilters } from "@/hooks/use-filters";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { useProductsQuery } from "@/hooks/use-products-query";
import { useFacetsQuery } from "@/hooks/use-facets-query";

export const ProductFilters = () => {
  const { data: baseFacets, isPending: isPendingBaseFacets } = useFacetsQuery();

  const { data } = useProductsQuery();

  const filteredFacets = data?.facets;

  const { isFilterSelected, toggleFilter, clearFilters, hasActiveFilters } =
    useFilters();

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
        {hasActiveFilters && (
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
                  const isSelected = isFilterSelected(
                    facet.identifier,
                    option.value
                  );

                  const filteredOption = filteredFacets
                    ?.find((f) => f.identifier === facet.identifier)
                    ?.options.find((o) => o.identifier === option.identifier);

                  const isDisabled = !filteredOption && !isSelected;

                  return (
                    <label
                      key={option.identifier}
                      htmlFor={option.identifier}
                      className={`flex items-center gap-2 cursor-pointer ${
                        isDisabled ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <Checkbox
                        id={option.identifier}
                        checked={isSelected}
                        disabled={isDisabled}
                        onCheckedChange={() =>
                          toggleFilter(facet.identifier, option.value)
                        }
                      />
                      <span className="text-sm group-hover:text-foreground text-muted-foreground flex-1">
                        {option.displayValue}
                      </span>
                      <span className="text-xs text-muted-foreground">
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
