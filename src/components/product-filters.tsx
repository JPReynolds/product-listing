import { productsQueryOptions } from "@/api/products/products.queries";
import { Checkbox } from "@/components/ui/checkbox";
import { useProductParams } from "@/hooks/use-product-params";
import { defaultPageNumber, defaultSort } from "@/lib/constants";
import { isValidSort } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Skeleton } from "./ui/skeleton";

export const ProductFilters = () => {
  const { category } = useParams();

  const [{ page, sort }] = useProductParams();

  const { data: baseData, isPending: isPendingBase } = useQuery(
    productsQueryOptions({
      query: category ?? "",
      pageNumber: defaultPageNumber,
      sort: defaultSort,
      size: 1,
    })
  );

  const { data, isPending } = useQuery(
    productsQueryOptions({
      query: category ?? "",
      pageNumber: page,
      sort: isValidSort(sort) ? sort : defaultSort,
    })
  );

  const baseFacets = baseData?.facets;
  const filteredFacets = data?.facets;

  if (isPendingBase || isPending) {
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
      <h2 className="font-semibold text-lg mb-4">Filters</h2>

      <div className="space-y-6">
        {baseFacets?.map((facet) => (
          <div key={facet.identifier}>
            <h3 className="font-medium text-sm mb-3">{facet.displayName}</h3>
            <div className="space-y-2">
              {facet.options.map((option) => {
                const isDisabled = !filteredFacets?.some(
                  (f) =>
                    f.identifier === facet.identifier &&
                    f.options.some((o) => o.identifier === option.identifier)
                );
                return (
                  <label
                    key={option.identifier}
                    htmlFor={option.identifier}
                    className="flex items-center gap-2"
                  >
                    <Checkbox id={option.identifier} disabled={isDisabled} />
                    <span className="text-sm group-hover:text-foreground text-muted-foreground flex-1">
                      {option.displayValue}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({isDisabled ? 0 : option.productCount})
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
