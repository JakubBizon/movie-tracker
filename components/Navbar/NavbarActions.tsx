"use client";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "./_components/ThemeToggle";
import UserMenu from "./_components/UserMenu";
import { SessionData } from "@/app/types/auth";
import useWatchlistCount from "@/hooks/watchlist/useWatchlistCount";
import useRatingsCount from "./hooks/useRatingsCount";

type NavbarActionsProps = {
  session: SessionData;
};

export default function NavbarActions({ session }: NavbarActionsProps) {
  const { myListCount, isLoadingMyLists } = useWatchlistCount(!!session);
  const { ratingsCount, isLoadingRatings } = useRatingsCount(!!session);

  const showWatchlistCount = !!session && !isLoadingMyLists && myListCount > 0;
  const showRatingsCount = !!session && !isLoadingRatings && ratingsCount > 0;

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 shrink-0">
      <div className="lg:flex hidden">
        <ThemeToggle />
        <Link href="/my-lists" aria-label="Go to my lists">
          <Button variant="ghost" className="relative" size="icon">
            <Bookmark className="dark:text-white text-black" />
            {showWatchlistCount && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs gradient-primary border-0">
                {myListCount}
              </Badge>
            )}
          </Button>
        </Link>
      </div>
      <UserMenu
        session={session}
        watchlistCount={myListCount}
        showWatchlistCount={showWatchlistCount}
        ratingsCount={ratingsCount}
        showRatingsCount={showRatingsCount}
      />
    </div>
  );
}
