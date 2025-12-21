"use client";

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
import { User, XIcon } from "lucide-react";
import Link from "next/link";

export default function UserMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-96">
        <SheetHeader className="flex-row items-center justify-between border-b py-4 px-4">
          <SheetTitle>User Account</SheetTitle>
          <SheetClose className="opacity-70 hover:opacity-100 border p-1 rounded-sm cursor-pointer">
            <XIcon className="w-5 h-5" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>

        <div className="flex flex-col h-full px-4">
          <nav className="flex flex-col gap-2 mb-auto">
            <SheetClose asChild>
              <Link
                className="py-3 text-center border-2 border-gray-800 rounded-lg"
                href="/signup"
              >
                Sign up
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                className="py-3 text-center border-2 border-gray-800 rounded-lg"
                href="/login"
              >
                Log in
              </Link>
            </SheetClose>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
