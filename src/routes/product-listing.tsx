import { productsQueryOptions } from "@/api/products/products.queries";
import { ProductList } from "@/components/product-list";
import { ProductListSkeleton } from "@/components/product-list-skeleton";
import { ProductPagination } from "@/components/product-pagination";
import { defaultPageNumber, defaultSort } from "@/lib/constants";
import { isValidSort } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryStates } from "nuqs";
import { useParams } from "react-router";

const headingId = "product-listing-heading";

export default function ProductListing() {
  const { category } = useParams();

  const [{ page, sort }] = useQueryStates({
    page: parseAsInteger.withDefault(defaultPageNumber),
    sort: parseAsInteger.withDefault(defaultSort),
  });

  const { data, isPending } = useQuery(
    productsQueryOptions({
      query: category ?? "",
      pageNumber: page,
      sort: isValidSort(sort) ? sort : defaultSort,
    })
  );

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
