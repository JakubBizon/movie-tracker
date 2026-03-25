import { Film } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import NavbarActions from "./NavbarActions";
import NavbarWrapper from "./NavbarWrapper";
import { Search } from "./_components/Search";
import MoviesPopover from "./_components/MoviesPopover";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <NavbarWrapper>
      <div className="dark:bg-gray-950 bg-white dark:border-none border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto  sm:px-6 px-4">
          <div className="hidden md:flex items-center justify-between py-4 gap-4">
            <div className="flex items-center gap-8 shrink-0">
              <Link href="/" className="flex items-center justify-center gap-4">
                <Film className="text-primary h-10 w-10" />
                <span className="text-2xl lg:block hidden font-bold gradient-text">
                  MovieTracker
                </span>
              </Link>
              <MoviesPopover />
            </div>

            <div className="flex-1 max-w-2xl mx-4">
              <Search />
            </div>
            <NavbarActions session={session} />
          </div>

          <div className="flex md:hidden flex-col gap-3 py-3 overflow-hidden">
            <div className="flex items-center justify-between gap-3">
              <Link href="/" className="flex items-center gap-2 shrink-0">
                <Film className="text-primary h-8 w-8" />
                <span className="text-xl font-bold sm:block hidden gradient-text">
                  MovieTracker
                </span>
                <MoviesPopover />
              </Link>
              <div className="flex items-center gap-1.5 shrink-0">
                <NavbarActions session={session} />
              </div>
            </div>
            <div className="w-full">
              <Search />
            </div>
          </div>
        </div>
      </div>
    </NavbarWrapper>
  );
}
