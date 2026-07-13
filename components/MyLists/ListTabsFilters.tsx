"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SORT_OPTIONS = [
  { value: "added_desc", label: "Date added (newest)" },
  { value: "added_asc", label: "Date added (oldest)" },
  { value: "rating_desc", label: "Rating (descending)" },
  { value: "rating_asc", label: "Rating (ascending)" },
  { value: "release_desc", label: "Release date (newest)" },
  { value: "release_asc", label: "Release date (oldest)" },
  { value: "title_asc", label: "Title (A-Z)" },
  { value: "title_desc", label: "Title (Z-A)" },
] as const;

export default function ListTabsFilters({
  activeSort,
}: {
  activeSort: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <span>Filters: </span>
      <Select
        defaultValue={activeSort}
        onValueChange={(value) => handleChange(value)}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-w-70">
          <SelectGroup>
            {SORT_OPTIONS.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
