export const QueryKeys = {
  Products: "products",
} as const;

export type QueryKey = keyof typeof QueryKeys;
