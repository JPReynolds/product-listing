import type { SortOption } from "@/api/products/products.type";

export const QueryKeys = {
  Products: "products",
} as const;

export type QueryKey = keyof typeof QueryKeys;

export const defaultPageNumber = 1;
export const defaultPageSize = 30;
export const defaultSort: SortOption = 1;

export const RESERVED_PARAMS = ["page", "sort"];
