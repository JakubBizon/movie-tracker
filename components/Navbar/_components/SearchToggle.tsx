"use client";

import { useNavbarStore } from "@/store/Navbar";
import { Search } from "./Search";

export default function SearchToggle() {
  const { isSearchVisible } = useNavbarStore();
  return (
    <div
      className={`w-full py-4 lg:hidden ${isSearchVisible ? "block" : "hidden"}`}
    >
      <Search />
    </div>
  );
}
