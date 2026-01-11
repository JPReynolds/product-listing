import { productsQueryOptions } from "@/api/products/products.queries";
import {
  defaultPageNumber,
  defaultPageSize,
  defaultSort,
} from "@/lib/constants";
import { isValidSort } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryStates } from "nuqs";
import { useParams } from "react-router";

export default function ProductListing() {
  const { category } = useParams();

  const [{ page, size, sort }] = useQueryStates({
    page: parseAsInteger.withDefault(defaultPageNumber),
    size: parseAsInteger.withDefault(defaultPageSize),
    sort: parseAsInteger.withDefault(defaultSort),
  });

  const { data } = useQuery(
    productsQueryOptions({
      query: category ?? "",
      pageNumber: page,
      size: size,
      sort: isValidSort(sort) ? sort : defaultSort,
    })
  );

  return <div>{data?.products.length} products</div>;
}
