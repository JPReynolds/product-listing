import { ProductFilters } from "@/components/product-filters";
import { ProductListWrapper } from "@/components/product-list-wrapper";
import { ProductSort } from "@/components/product-sort";
import { useParams } from "react-router";

const headingId = "product-listing-heading";

export default function ProductListing() {
  const { category } = useParams();
  return (
    <div className="min-h-screen bg-background">
      <section
        aria-labelledby={headingId}
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-4"
      >
        <header className="mb-8 border-b pb-8">
          <h1 id={headingId} className="text-3xl font-bold capitalize">
            {category}
          </h1>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-64 shrink-0">
            <ProductFilters />
          </aside>

          <div className="flex flex-col gap-4 flex-1 min-w-0">
            <ProductSort />
            <ProductListWrapper />
          </div>
        </div>
      </section>
    </div>
  );
}
