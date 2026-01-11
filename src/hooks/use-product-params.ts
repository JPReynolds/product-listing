import { defaultPageNumber, defaultSort } from "@/lib/constants";
import { parseAsInteger, useQueryStates } from "nuqs";

export const useProductParams = (): ReturnType<typeof useQueryStates> => {
  return useQueryStates({
    page: parseAsInteger.withDefault(defaultPageNumber),
    sort: parseAsInteger.withDefault(defaultSort),
  });
};
