import { Badge, Film, User } from "lucide-react";
import Link from "next/link";
import { Search } from "./_components/Search";

export default function Navbar() {
  return (
    <div className="bg-gray-950">
      {" "}
      <nav className="max-w-5xl mx-auto ">
        <div className="container px-4 py-4 flex justify-between">
          <Link href="/" className="flex items-center justify-center gap-4">
            <Film className="text-primary h-10 w-10" />
            <span className="text-2xl font-bold gradient-text ">
              MovieTracker
            </span>
          </Link>

          <div className="flex-1 px-10">
            <Search />
          </div>

          <div className="flex items-center justify-center gap-4 ">
            <Badge />
            <div className="rounded-full bg-primary px-2 py-2">
              <User />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
