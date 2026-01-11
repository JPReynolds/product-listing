import { useProductParams } from "@/hooks/use-product-params";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { SortOption } from "@/api/products/products.type";
import { defaultPageNumber } from "@/lib/constants";

const sortOptions: Record<SortOption, string> = {
  1: "Recommended",
  2: "Price: Low to High",
  3: "Price: High to Low",
  4: "Largest Discount",
};

export function ProductSort() {
  const [{ sort }, setQueryStates] = useProductParams();

  const handleSortChange = (value: string) => {
    setQueryStates({ sort: parseInt(value), page: defaultPageNumber });
  };

  return (
    <div className="flex items-center gap-2 ml-auto">
      <label htmlFor="sort" className="text-sm font-medium">
        Sort by:
      </label>
      <Select value={String(sort)} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by</SelectLabel>
            {Object.entries(sortOptions).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
