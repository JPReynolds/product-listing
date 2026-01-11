import type { SortOption } from "@/api/products/products.type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidSort = (sort: number): sort is SortOption =>
  sort >= 1 && sort <= 4;
