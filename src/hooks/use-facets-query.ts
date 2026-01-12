import { productsQueryOptions } from "@/api/products/products.queries";
import { defaultPageNumber, defaultSort } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export const useFacetsQuery = () => {
  const { category } = useParams();

  return useQuery({
    ...productsQueryOptions({
      query: category ?? "",
      pageNumber: defaultPageNumber,
      sort: defaultSort,
      size: 1,
    }),
    select: (data) => data.facets,
  });
};
