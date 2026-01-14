import { createMultiParser, createParser } from "nuqs";
import type {
  Facet,
  FacetFilters,
  FacetFilter,
  FilterValue,
  PriceValue,
} from "@/api/products/products.type";

export type FilterParams = Record<string, string[]>;

export const parseAsPriceRange = createParser<PriceValue>({
  parse(value) {
    const match = value.match(/^(\d+)_(\d+)$/);
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

const parseAsKeyValue = createParser({
  parse: (val) => {
    const [key, value] = val.split(":");
    if (!key || !value) return null;
    return { key, value };
  },
  serialize: ({ key, value }) => `${key}:${value}`,
});

export const parseAsFilters = createMultiParser<FilterParams>({
  parse: (values) => {
    const result: FilterParams = {};

    for (const v of values) {
      const parsed = parseAsKeyValue.parse(v);
      if (!parsed) continue;

      const { key, value } = parsed;

      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(value);
    }

    return Object.keys(result).length === 0 ? null : result;
  },
  serialize: (values) => {
    return Object.entries(values).flatMap(([key, vals]) =>
      vals.map((value) => parseAsKeyValue.serialize({ key, value }))
    );
  },
});

export const hydrateFilters = (
  filterParams: FilterParams,
  facets: Facet[]
): FacetFilters => {
  const result: FacetFilters = {};

  for (const [facetId, selectedValues] of Object.entries(filterParams)) {
    const facet = facets.find(({ identifier }) => identifier === facetId);
    if (!facet) continue;

    const facetFilters = selectedValues
      .map((selectedValue) => {
        const priceValue = parseAsPriceRange.parse(selectedValue);

        if (priceValue) {
          const option = facet.options.find(
            (o) =>
              isPriceValue(o.value) && parseAsPriceRange.eq(o.value, priceValue)
          );
          return option
            ? { identifier: option.identifier, value: priceValue }
            : null;
        }

        const option = facet.options.find((o) => o.value === selectedValue);
        return option
          ? { identifier: option.identifier, value: option.value }
          : null;
      })
      .filter((f): f is FacetFilter => f !== null);

    if (facetFilters.length > 0) {
      result[facetId] = facetFilters;
    }
  }

  return result;
};

export const serializeFilterValue = (value: FilterValue): string => {
  if (isPriceValue(value)) {
    return parseAsPriceRange.serialize(value);
  }
  return String(value);
};
