import { createParser } from "nuqs";
import type {
  Facet,
  FacetFilters,
  FacetFilter,
  FilterValue,
  PriceValue,
} from "@/api/products/products.type";

export type FilterParams = Record<string, string[]>;

export const parseAsCommaSeparated = createParser<string[]>({
  parse(value) {
    if (!value) return null;
    const items = value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    return items.length > 0 ? items : null;
  },
  serialize(value) {
    return value.join(",");
  },
});

export const parseAsPriceRange = createParser<PriceValue>({
  parse(value) {
    const match = value.match(/^(\d+)[_-](\d+)$/);
    if (!match) return null;
    return { gte: Number(match[1]), lte: Number(match[2]) };
  },
  serialize(value) {
    return `${value.gte}_${value.lte}`;
  },
  eq(a, b) {
    return a.gte === b.gte && a.lte === b.lte;
  },
});

export const isPriceValue = (value: unknown): value is PriceValue => {
  return (
    typeof value === "object" &&
    value !== null &&
    "gte" in value &&
    "lte" in value &&
    typeof (value as PriceValue).gte === "number" &&
    typeof (value as PriceValue).lte === "number"
  );
};

const findMatchingOption = (
  facet: Facet,
  selectedValue: string
): FacetFilter | null => {
  const priceValue = parseAsPriceRange.parse(selectedValue);

  if (priceValue) {
    const option = facet.options.find(
      (o) => isPriceValue(o.value) && parseAsPriceRange.eq(o.value, priceValue)
    );
    return option ? { identifier: option.identifier, value: priceValue } : null;
  }

  const option = facet.options.find(({ value }) => value === selectedValue);
  return option ? { identifier: option.identifier, value: option.value } : null;
};

export const generateFilters = (
  filterParams: FilterParams,
  baseFacets: Facet[]
): FacetFilters => {
  const facets: FacetFilters = {};

  for (const [facetIdentifier, selectedValues] of Object.entries(
    filterParams
  )) {
    if (selectedValues.length === 0) continue;

    const facet = baseFacets.find(
      ({ identifier }) => identifier === facetIdentifier
    );
    if (!facet) continue;

    const facetFilters = selectedValues
      .map((value) => findMatchingOption(facet, value))
      .filter((f): f is FacetFilter => f !== null);

    if (facetFilters.length > 0) {
      facets[facetIdentifier] = facetFilters;
    }
  }

  return facets;
};

export const getFilterParam = (value: FilterValue): string => {
  if (isPriceValue(value)) {
    return parseAsPriceRange.serialize(value);
  }
  return String(value);
};
