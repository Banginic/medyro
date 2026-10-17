"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  page: number;
  totalPages: number;
};

export default function AppPagination({ page, totalPages }: Props) {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const navigateToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(newPage));

    router.replace(`${pathname}?${params.toString()}`);
  };


  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
           size={'sm'}
            href="#"
            onClick={(e) => {
              e.preventDefault();

              if (page > 1) {
                navigateToPage(page - 1);
              }
            }}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
               size={'sm'}
                href="#"
                isActive={pageNumber === page}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPage(pageNumber);
                }}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
          size={'sm'}
            href="#"
            onClick={(e) => {
              e.preventDefault();

              if (page < totalPages) {
                navigateToPage(page + 1);
              }
            }}
            className={
              page === totalPages
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}