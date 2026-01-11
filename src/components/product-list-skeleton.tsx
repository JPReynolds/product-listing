import { defaultPageSize } from "@/lib/constants";
import { Skeleton } from "./ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="aspect-square bg-muted/50">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-3.5 w-3.5 rounded-sm" />
            ))}
          </div>
          <Skeleton className="h-3 w-10" />
        </div>
      </div>

      <div className="mt-auto border-t bg-muted/20 p-4">
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  );
};

export const ProductListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: defaultPageSize }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};
