"use client";

import MoviesPopover from "./MoviesPopover";
import { Film, SearchIcon, XIcon } from "lucide-react";
import Link from "next/link";
import NavbarActions from "../NavbarActions";
import { SessionData } from "@/app/types/auth";
import { useEffect } from "react";
import { useNavbarStore } from "@/store/Navbar";

type Props = {
  session: SessionData;
};

export default function NavbarMobile({ session }: Props) {
  const { isSearchVisible, setSearchVisible } = useNavbarStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSearchVisible(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSearchVisible]);
  return (
    <div className="flex lg:hidden flex-col gap-3 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-row items-center gap-4">
          <MoviesPopover />
          <div className="relative w-4 h-4">
            <SearchIcon
              className={`w-4 h-4 absolute transition-all duration-200 ${isSearchVisible ? "opacity-0 scale-50 pointer-events-none" : "opacity-100 scale-100"}`}
              onClick={() => setSearchVisible(true)}
            />
            <XIcon
              className={`w-4 h-4 absolute transition-all duration-200 ${isSearchVisible ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"}`}
              onClick={() => setSearchVisible(false)}
            />
          </div>
        </div>
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Film className="text-primary h-8 w-8" />
          <span className="xs:text-xl text-lg font-bold  gradient-text">
            MovieTracker
          </span>
        </Link>

        <div className="flex items-center gap-1.5 shrink-0">
          <NavbarActions session={session} />
        </div>
      </div>
    </div>
  );
}
