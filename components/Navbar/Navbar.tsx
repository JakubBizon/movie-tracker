import { Film } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import NavbarActions from "./NavbarActions";
import NavbarWrapper from "./NavbarWrapper";
import { Search } from "./_components/Search";
import MoviesPopover from "./_components/MoviesPopover";
import NavbarMobile from "./_components/NavbarMobile";
import SearchToggle from "./_components/SearchToggle";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <NavbarWrapper>
        <div className="dark:bg-slate-900 bg-white dark:border-none border-b border-gray-200">
          <div className="max-w-[1440px] mx-auto">
            <div className="hidden lg:flex items-center justify-between py-4 gap-4 sm:px-8 px-4">
              <div className="flex items-center gap-8 shrink-0">
                <Link
                  href="/"
                  className="flex items-center justify-center gap-4"
                >
                  <Film className="text-primary h-10 w-10" />
                  <span className="text-2xl md:block hidden font-bold gradient-text">
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
            <NavbarMobile session={session} />
          </div>
        </div>
        <SearchToggle />
      </NavbarWrapper>
    </>
  );
}
