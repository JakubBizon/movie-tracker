import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const getDefaultSort = () => {
    if (pathname === "/movies/top-rated") return "r_desc";
    else return "p_desc";
  };
  const currentSort = searchParams.get("sort") || getDefaultSort();

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select defaultValue={currentSort} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-w-[280px]">
        <SelectGroup>
          <SelectItem value="p_desc">Popularity Descending</SelectItem>
          <SelectItem value="p_asc">Popularity Ascending</SelectItem>
          <SelectItem value="r_desc">Rating Descending</SelectItem>
          <SelectItem value="r_asc">Rating Ascending</SelectItem>
          <SelectItem value="date_desc">Release Date Descending</SelectItem>
          <SelectItem value="date_asc">Release Date Ascending</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
