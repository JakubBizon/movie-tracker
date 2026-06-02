import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export const useSort = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const getDefaultSort = () => {
    if (pathname === "/movie/top-rated") return "r_desc";
    else return "p_desc";
  };
  const currentSort = searchParams.get("sort") || getDefaultSort();

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };
  return {
    currentSort,
    handleValueChange,
  };
};

export default useSort;
