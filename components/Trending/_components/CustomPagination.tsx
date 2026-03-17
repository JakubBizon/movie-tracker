import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function CustomPaginaton({
  currentPage,
  totalPages,
  baseUrl,
}: Props) {
  const getPageUrl = (page: number) => `${baseUrl}?page=${page}`;

  return (
    <Pagination>
      <PaginationContent className="flex flex-row items-center justify-center gap-4">
        <PaginationItem className="w-32 flex justify-end">
          {" "}
          {/* Stała szerokość */}
          {currentPage > 1 ? (
            <PaginationPrevious
              href={getPageUrl(currentPage - 1)}
              className="hover:bg-transparent px-0"
            />
          ) : (
            <div className="opacity-0 pointer-events-none">
              <PaginationPrevious href="#" />
            </div>
          )}
        </PaginationItem>

        <PaginationItem>
          <div className="flex items-center justify-center h-10 w-10 border rounded-md bg-secondary">
            {currentPage}
          </div>
        </PaginationItem>

        <PaginationItem className="w-32 flex justify-start">
          {currentPage < totalPages ? (
            <PaginationNext
              href={getPageUrl(currentPage + 1)}
              className="hover:bg-transparent px-0"
            />
          ) : (
            <div className="opacity-0 pointer-events-none">
              <PaginationNext href="#" />
            </div>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
