export type PriceValue = { gte: number; lte: number };

export type FacetFilter = {
  identifier: string;
  value: string | boolean | PriceValue;
};

export type ProductsRequest = {
  query: string;
  pageNumber: number;
  size: number;
  additionalPages: number;
  sort: SortOption;
  facets?: Record<string, FacetFilter[]>;
};

// TODO - is this the best approach?
export const ProductSortOption = {
  Recommended: 1,
  PriceLowToHigh: 2,
  PriceHighToLow: 3,
  LargestDiscount: 4,
} as const;

export type SortOption =
  (typeof ProductSortOption)[keyof typeof ProductSortOption];

export type Pagination = {
  from: number;
  size: number;
  total: number;
  sortType: SortOption;
};

export type FacetOption = {
  identifier: string;
  value: string | boolean | number | PriceValue;
  displayValue: string;
  productCount: number;
  priority: number;
};

export type Facet = {
  identifier: string;
  displayName: string;
  priority: number;
  options: FacetOption[];
  facetType: number;
};

export type ProductImage = {
  externalId: string;
  url: string;
  attributes: {
    imageAltText: string;
  };
};

export type StockStatus = {
  status: string;
};

export type ProductAttributes = {
  isBestSeller: boolean;
};

export type Price = {
  currencyCode: string;
  wasPriceIncTax: number;
  wasPriceExcTax: number;
  priceIncTax: number;
  priceExcTax: number;
  isOnPromotion: boolean;
};

export type Product = {
  id: string;
  productName: string;
  slug: string;
  averageRating: number;
  reviewsCount: number;
  image: ProductImage;
  stockStatus: StockStatus;
  price: Price;
  attributes: ProductAttributes;
  score: number;
};

export type ProductResponse = {
  products: Product[];
  pagination: Pagination;
  facets: Facet[];
};
