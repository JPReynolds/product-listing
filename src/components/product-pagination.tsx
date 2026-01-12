import type { Pagination } from "@/api/products/products.type";
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { useProductParams } from "@/hooks/use-product-params";

type PageNumber = number | string;

export const ProductPagination = ({
  pagination,
}: {
  pagination: Pagination;
}) => {
  const [queryStates] = useProductParams();

  const { page } = queryStates;

  const { total, size } = pagination;

  const totalPages = Math.ceil(total / size);

  const getPageHref = (pageNumber: number) => {
    const params = new URLSearchParams(queryStates);
    params.set("page", String(pageNumber));
    return `?${params.toString()}`;
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = (): PageNumber[] => {
    const pageNumbers: PageNumber[] = [];
    const maxPagesToShow = 3;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      let startPage = Math.max(2, page - 1);
      let endPage = Math.min(totalPages - 1, page + 1);

      if (page <= 3) {
        endPage = Math.min(totalPages - 1, 4);
      }

      if (page >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
      }

      if (startPage > 2) {
        pageNumbers.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

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
            {typeof pageNumber === "number" ? (
              <PaginationLink
                href={getPageHref(pageNumber)}
                isActive={pageNumber === page}
                onClick={handleClick}
              >
                {pageNumber}
              </PaginationLink>
            ) : (
              <PaginationEllipsis />
            )}
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
