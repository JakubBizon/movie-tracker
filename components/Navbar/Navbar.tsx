import { Film } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import NavbarActions from "./NavbarActions";
import NavbarWrapper from "./NavbarWrapper";
import { Search } from "./_components/Search";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <NavbarWrapper>
      {" "}
      <div className="dark:bg-gray-950 bg-white dark:border-none border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto  px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center justify-center gap-4">
            <Film className="text-primary h-10 w-10" />
            <span className="text-2xl font-bold gradient-text">
              MovieTracker
            </span>
          </Link>
          <div className="flex-1 px-10">
            <Search />
          </div>
          <NavbarActions session={session} />
        </div>
      </div>
    </NavbarWrapper>
  );
}
