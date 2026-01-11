import {
  defaultPageNumber,
  defaultPageSize,
  defaultSort,
} from "@/lib/constants";
import {
  type Product,
  type ProductResponse,
  type ProductsRequest,
} from "./products.type";

const API_URL =
  "https://spanishinquisition.victorianplumbing.co.uk/interviews/listings";
const API_KEY = "yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI";

export const fetchProducts = async (
  request: ProductsRequest
): Promise<ProductResponse> => {
  const body: ProductsRequest = {
    query: request.query,
    pageNumber: request.pageNumber ?? defaultPageNumber,
    size: request.size ?? defaultPageSize,
    additionalPages: request.additionalPages ?? 0,
    sort: request.sort ?? defaultSort,
    ...(request.facets && { facets: request.facets }),
  };

  const response = await fetch(`${API_URL}?apiKey=${API_KEY}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  const data: ProductResponse = await response.json();

  const products: Product[] = [...data.products].sort(
    (a, b) => b.score - a.score
  );

  return {
    ...data,
    products,
  };
};
