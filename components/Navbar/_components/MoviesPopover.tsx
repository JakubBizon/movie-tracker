"use client";

import { useState, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

export default function MoviesPopover() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/movie", label: "Popular" },
    { href: "/movie/top-rated", label: "Top rated" },
    { href: "/movie/upcoming", label: "Upcoming" },
  ];
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current!);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="md:text-xl text-base cursor-pointer gradient-text">
          Movies
        </span>
      </PopoverTrigger>
      <PopoverContent
        onClick={() => setOpen(false)}
        sideOffset={8}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex flex-col gap-2 w-40 px-4 py-2"
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="hover:underline"
          >
            {link.label}
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
}
