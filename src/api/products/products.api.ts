import { type ProductResponse, type ProductsRequest } from "./products.type";

const API_URL =
  "https://spanishinquisition.victorianplumbing.co.uk/interviews/listings";
const API_KEY = "yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI";

export const fetchProducts = async (
  request: ProductsRequest
): Promise<ProductResponse> => {
  const body: ProductsRequest = {
    query: request.query,
    pageNumber: request.pageNumber ?? 0,
    size: request.size ?? 30,
    additionalPages: request.additionalPages ?? 0,
    sort: request.sort ?? 1,
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

  return response.json();
};
