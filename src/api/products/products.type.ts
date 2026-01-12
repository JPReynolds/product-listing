export type PriceValue = { gte: number; lte: number };

export type FilterValue = string | boolean | number | PriceValue;

export type FacetFilter = {
  identifier: string;
  value: FilterValue;
};

export type FacetFilters = Record<string, FacetFilter[]>;

export type ProductsRequest = {
  query: string;
  pageNumber: number;
  size?: number;
  additionalPages?: number;
  sort: SortOption;
  facets?: FacetFilters;
};

export type SortOption = 1 | 2 | 3 | 4;

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
  discountPercentage: number;
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
