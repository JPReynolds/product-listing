import type { Pagination } from "@/api/products/products.type";
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { useSearchParams } from "react-router";
import { useProductParams } from "@/hooks/use-product-params";

export const ProductPagination = ({
  pagination,
}: {
  pagination: Pagination;
}) => {
  const [searchParams] = useSearchParams();

  const [{ page }] = useProductParams();

  const { total, size } = pagination;

  const totalPages = Math.ceil(total / size);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getPageHref = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(pageNumber));
    return `?${params.toString()}`;
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={getPageHref(page - 1)}
            aria-disabled={page === 1}
            onClick={page === 1 ? (e) => e.preventDefault() : handleClick}
          />
        </PaginationItem>

        {pageNumbers.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href={getPageHref(pageNumber)}
              isActive={pageNumber === page}
              onClick={handleClick}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={getPageHref(page + 1)}
            aria-disabled={page === totalPages}
            onClick={
              page === totalPages ? (e) => e.preventDefault() : handleClick
            }
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
};
