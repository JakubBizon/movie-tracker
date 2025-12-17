"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { User } from "lucide-react";
import Link from "next/link";

export default function UserMenuSheet() {
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
      <SheetContent side="right" className="w-64 p-4">
        <div className="flex flex-col h-full">
          <div className="font-bold text-lg mb-4">User account</div>
          <nav className="flex flex-col gap-2 mb-auto">
            <Link href="/profile">Sign in</Link>
            <Link href="/settings">Log in</Link>
          </nav>
          <button className="py-2 bg-red-500 text-white rounded mt-4">
            Sign Out
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
