"use client";

import { useNavbarStore } from "@/store/Navbar";
import { Search } from "./Search";

export default function SearchToggle() {
  const { isSearchVisible } = useNavbarStore();
  return (
    <div
      className={`w-full py-4 dark:bg-slate-900 bg-white px-2 lg:hidden ${isSearchVisible ? "block" : "hidden"}`}
    >
      <Search />
    </div>
  );
}
