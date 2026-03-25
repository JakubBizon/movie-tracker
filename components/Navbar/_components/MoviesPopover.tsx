"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

export default function MoviesPopover() {
  const [open, setOpen] = useState(false);

  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <span className="md:text-xl text-base cursor-pointer gradient-text">
            Movies
          </span>
        </PopoverTrigger>
        <PopoverContent
          className="flex flex-col gap-2 w-40 px-4 py-2"
          onMouseEnter={() => setOpen(true)}
          onClick={() => setOpen(false)}
        >
          <Link href="/movies" className="hover:underline">
            Popular
          </Link>
          <Link href="/movies/top-rated" className="hover:underline">
            Top rated
          </Link>
          <Link href="/movies/upcoming" className="hover:underline">
            Upcoming
          </Link>
        </PopoverContent>
      </Popover>
    </div>
  );
}
