"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  activeTab?: "watchlist" | "favorites";
}

export default function CustomPagination({ currentPage, totalPages }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [leftValue, setLeftValue] = useState("");
  const [rightValue, setRightValue] = useState("");
  const router = useRouter();

  const handleJump = (value: string, setter: (v: string) => void) => {
    const page = parseInt(value);
    if (page >= 1 && page <= totalPages) {
      router.push(createPageUrl(page));
    }
    setter("");
  };

  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

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
            href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
            className={
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>

        {pages[0] > 1 && (
          <>
            <PaginationItem>
              <PaginationLink href={createPageUrl(1)}>1</PaginationLink>
            </PaginationItem>
            {pages[0] > 5 && (
              <PaginationItem>
                <input
                  className="w-10 h-8 rounded-md text-center bg-transparent border border-slate-600 text-slate-200 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  type="number"
                  min={1}
                  max={totalPages}
                  value={leftValue}
                  placeholder="..."
                  onChange={(e) => setLeftValue(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleJump(leftValue, setLeftValue)
                  }
                  onBlur={() => handleJump(leftValue, setLeftValue)}
                />
              </PaginationItem>
            )}
          </>
        )}

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={createPageUrl(page)}
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
            {pages[pages.length - 1] < totalPages - 1 && (
              <PaginationItem>
                <input
                  className="w-10 h-8 rounded-md text-center bg-transparent border border-slate-600 dark:text-slate-200 text-slate-800 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  type="number"
                  min={1}
                  max={totalPages}
                  value={rightValue}
                  placeholder="..."
                  onChange={(e) => setRightValue(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleJump(rightValue, setRightValue)
                  }
                  onBlur={() => handleJump(rightValue, setRightValue)}
                />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink href={createPageUrl(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages ? createPageUrl(currentPage + 1) : "#"
            }
            className={
              currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
