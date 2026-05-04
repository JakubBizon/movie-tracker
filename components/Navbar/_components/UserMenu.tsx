"use client";

import { SessionData } from "@/app/types/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User, List, XIcon, Settings } from "lucide-react";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { useState } from "react";
import MenuThemeToggle from "./MenuThemeToggle";

type UserMenuProps = {
  session: SessionData;
};

export default function UserMenu({ session }: UserMenuProps) {
  const isLoggedIn = !!session;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border border-border">
            <AvatarFallback className="bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-75 sm:w-87.5 flex flex-col p-0">
        <SheetHeader className="p-5 text-left border-b">
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <SheetTitle className="text-base font-semibold">
                  {isLoggedIn ? session.user.name : "Guest Account"}
                </SheetTitle>
                <p className="text-xs text-muted-foreground truncate max-w-45">
                  {isLoggedIn ? session.user.email : "Sign in to sync data"}
                </p>
              </div>
            </div>
            <SheetClose className="opacity-70 hover:opacity-100 border p-1 rounded-sm cursor-pointer">
              <XIcon className="w-5 h-5" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="flex flex-col flex-1 p-4 gap-6">
          <nav className="flex flex-col gap-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 mb-2">
              Menu
            </p>
            <SheetClose asChild>
              <Link
                href="/my-lists"
                className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-accent transition-colors text-sm font-medium"
              >
                <List className="h-4 w-4" />
                My Lists
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                href="/settings"
                className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-accent transition-colors text-sm font-medium"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </SheetClose>
          </nav>

          <MenuThemeToggle />

          <div className="mt-auto border-t pt-4 w-full">
            {!isLoggedIn ? (
              <div className="grid grid-cols-2 gap-2">
                <SheetClose asChild>
                  <Button variant="outline" asChild>
                    <Link href="/login">Log in</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild>
                    <Link href="/signup">Sign up</Link>
                  </Button>
                </SheetClose>
              </div>
            ) : (
              <SignOutButton onSuccess={() => setIsOpen(false)} />
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
