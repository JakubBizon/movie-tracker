import { Bookmark } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "./_components/ThemeToggle";
import UserMenu from "./_components/UserMenu";
import { SessionData } from "@/app/types/auth";

type NavbarActionsProps = {
  session: SessionData;
};

export default function NavbarActions({ session }: NavbarActionsProps) {
  return (
    <div className="flex items-center justify-center gap-4 shrink-0">
      <ThemeToggle />
      <Link href="/my-lists">
        <Button variant="ghost" className="relative" size="icon-lg">
          <Bookmark className="dark:text-white text-black" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs gradient-primary border-0">
            3
          </Badge>
        </Button>
      </Link>
      <UserMenu session={session} />
    </div>
  );
}
