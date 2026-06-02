"use client";

import { Button } from "@/components/ui/button";

import { ArrowUpDown, Check } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import useSort from "../hooks/useSort";
import { cn } from "@/lib/utils";
import { useCloseOnDesktop } from "@/hooks/useCloseOnDesktop";

const SORT_OPTIONS = [
  { label: "Popularity Descending", value: "p_desc" },
  { label: "Popularity Ascending", value: "p_asc" },
  { label: "Rating Descending", value: "r_desc" },
  { label: "Rating Ascending", value: "r_asc" },
  { label: "Release Date Descending", value: "date_desc" },
  { label: "Release Date Ascending", value: "date_asc" },
];

export default function SortDropdown() {
  const [open, setOpen] = useState(false);
  const { currentSort, handleValueChange } = useSort();
  useCloseOnDesktop(setOpen);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <span>Sort</span>
          <ArrowUpDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {SORT_OPTIONS.map(({ label, value }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => handleValueChange(value)}
            className={cn(currentSort === value && "bg-primary/60")}
          >
            {label}
            {currentSort === value && <Check className="text-white" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
