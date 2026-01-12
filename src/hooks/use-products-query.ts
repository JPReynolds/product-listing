import { productsQueryOptions } from "@/api/products/products.queries";
import { isValidSort } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useProductParams } from "./use-product-params";
import { defaultSort } from "@/lib/constants";
import { useFilters } from "./use-filters";

// TODO - allow options to be passed in
export const useProductsQuery = () => {
  const { category } = useParams();
  const [{ page, sort }] = useProductParams();
  const { filters } = useFilters();

  return useQuery(
    productsQueryOptions({
      query: category ?? "",
      pageNumber: page,
      sort: isValidSort(sort) ? sort : defaultSort,
      facets: filters,
    })
  );
};
