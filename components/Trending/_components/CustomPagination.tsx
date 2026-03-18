import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function CustomPagination({
  currentPage,
  totalPages,
  baseUrl,
}: Props) {
  const getPageUrl = (page: number) => `${baseUrl}?page=${page}`;

  const getPages = () => {
    const pages = [];
    const maxVisible = 3;

    let start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPages();

  return (
    <Pagination className="my-8">
      <PaginationContent className="gap-2">
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? getPageUrl(currentPage - 1) : "#"}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {pages[0] > 1 && (
          <>
            <PaginationItem>
              <PaginationLink href={getPageUrl(1)}>1</PaginationLink>
            </PaginationItem>
            {pages[0] > 2 && <PaginationEllipsis />}
          </>
        )}

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={getPageUrl(page)}
              isActive={page === currentPage}
              className={
                page === currentPage
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : ""
              }
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationLink href={getPageUrl(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext
            href={currentPage < totalPages ? getPageUrl(currentPage + 1) : "#"}
            className={
              currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
