import type { UseQueryOptions } from "@tanstack/react-query";
import { fetchProducts } from "./products.api";
import type { ProductResponse, ProductsRequest } from "./products.type";
import { QueryKeys } from "@/lib/constants";

type ProductsQueryOptions = UseQueryOptions<
  ProductResponse,
  Error,
  ProductResponse,
  [typeof QueryKeys.Products, ProductsRequest]
>;

export const productsQueryOptions = (
  params: ProductsRequest
): ProductsQueryOptions => {
  return {
    queryKey: [QueryKeys.Products, params],
    queryFn: () => fetchProducts(params),
  };
};
