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
  eq(a, b) {
    return a.length === b.length && a.every((v, i) => v === b[i]);
  },
});

export const parseAsPriceRange = createParser<PriceValue>({
  parse(value) {
    const match = value.match(/^(\d+)_(\d+)$/) ?? value.match(/^(\d+)-(\d+)$/);
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

export const isPriceRangeString = (value: string): boolean => {
  return parseAsPriceRange.parse(value) !== null;
};

export const generateFilters = (
  filters: FilterParams,
  baseFacets: Facet[]
): FacetFilters => {
  const facets: FacetFilters = {};

  for (const [facetIdentifier, selectedValues] of Object.entries(filters)) {
    if (selectedValues.length === 0) continue;

    const facet = baseFacets.find(
      ({ identifier }) => identifier === facetIdentifier
    );
    if (!facet) continue;

    const facetFilters: FacetFilter[] = [];

    for (const selectedValue of selectedValues) {
      const priceValue = parseAsPriceRange.parse(selectedValue);

      if (priceValue) {
        const option = facet.options.find((o) => {
          if (isPriceValue(o.value)) {
            return parseAsPriceRange.eq(o.value, priceValue);
          }
          return false;
        });

        if (option) {
          facetFilters.push({
            identifier: option.identifier,
            value: priceValue,
          });
        }
      } else {
        const option = facet.options.find(
          ({ value }) => value === selectedValue
        );

        if (option) {
          facetFilters.push({
            identifier: option.identifier,
            value: option.value,
          });
        }
      }
    }

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
