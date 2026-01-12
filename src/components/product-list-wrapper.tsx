import { useProductsQuery } from "@/hooks/use-products-query";
import { ProductList } from "./product-list";
import { ProductListSkeleton } from "./product-list-skeleton";
import { ProductPagination } from "./product-pagination";
import { usePrefetchProducts } from "@/hooks/use-prefetch-products";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircleIcon } from "lucide-react";

export const ProductListWrapper = () => {
  const { data, isPending, isError } = useProductsQuery();

  usePrefetchProducts({ pagination: data?.pagination });

  if (isPending) return <ProductListSkeleton />;
  if (isError)
    return (
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Unable to load products.</AlertTitle>
        <AlertDescription>
          <p>Please try again or contact support.</p>
        </AlertDescription>
      </Alert>
    );

  return (
    <div className="flex flex-col gap-4">
      <ProductList products={data.products} />
      <ProductPagination pagination={data.pagination} />
    </div>
  );
};
