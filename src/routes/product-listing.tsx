import { productsQueryOptions } from "@/api/products/products.queries";
import { ProductList } from "@/components/product-list";
import { ProductListSkeleton } from "@/components/product-list-skeleton";
import { ProductPagination } from "@/components/product-pagination";
import { defaultSort } from "@/lib/constants";
import { isValidSort } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { usePrefetchProducts } from "@/hooks/use-prefetch-products";
import { useProductParams } from "@/hooks/use-product-params";

const headingId = "product-listing-heading";

export default function ProductListing() {
  const { category } = useParams();

  const [{ page, sort }] = useProductParams();

  const { data, isPending } = useQuery(
    productsQueryOptions({
      query: category ?? "",
      pageNumber: page,
      sort: isValidSort(sort) ? sort : defaultSort,
    })
  );

  usePrefetchProducts({ pagination: data?.pagination });

  return (
    <div className="min-h-screen bg-background">
      <section
        aria-labelledby={headingId}
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <header className="mb-8 border-b pb-6">
          <h1 id={headingId} className="text-3xl font-bold capitalize">
            {category}
          </h1>
        </header>

        {isPending ? (
          <ProductListSkeleton />
        ) : (
          data && (
            <>
              <ProductList products={data.products} />
              <ProductPagination pagination={data.pagination} />
            </>
          )
        )}
      </section>
    </div>
  );
}
