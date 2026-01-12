import { defaultSort } from "@/lib/constants";
import { isValidSort } from "@/lib/utils";
import { productsQueryOptions } from "@/api/products/products.queries";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { Pagination } from "@/api/products/products.type";
import { useParams } from "react-router";
import { useProductParams } from "./use-product-params";
import { useFilters } from "./use-filters";

export const usePrefetchProducts = ({
  pagination,
}: {
  pagination?: Pagination;
}) => {
  const queryClient = useQueryClient();

  const { category } = useParams();
  const { filters } = useFilters();

  const [{ page, sort }] = useProductParams();

  useEffect(() => {
    if (!pagination) return;

    const nextPage = page + 1;

    const totalPages = Math.ceil(pagination.total / pagination.size);
    if (nextPage <= totalPages) {
      queryClient.prefetchQuery(
        productsQueryOptions({
          query: category ?? "",
          pageNumber: nextPage,
          sort: isValidSort(sort) ? sort : defaultSort,
          facets: filters,
        })
      );
    }
  }, [page, sort, pagination, queryClient, category, filters]);
};
