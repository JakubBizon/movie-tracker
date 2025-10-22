import { Bookmark, Film } from "lucide-react";
import Link from "next/link";
import { Search } from "./_components/Search";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import UserMenu from "./_components/UserMenu";

export default function Navbar() {
  return (
    <div className="bg-gray-950">
      {" "}
      <nav className="max-w-5xl mx-auto sticky top-0 ">
        <div className="container px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center justify-center gap-4">
            <Film className="text-primary h-10 w-10" />
            <span className="text-2xl font-bold gradient-text ">
              MovieTracker
            </span>
          </Link>

          <div className="flex-1 px-10">
            <Search />
          </div>

          <div className="flex items-center justify-center gap-4 shrink-0">
            <Link href="/my-lists">
              <Button variant="ghost" className="relative " size="icon-lg">
                <Bookmark />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs gradient-primary border-0">
                  3
                </Badge>
              </Button>
            </Link>

            <div>
              <UserMenu />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
