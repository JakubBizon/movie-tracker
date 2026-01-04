"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignOutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
            router.refresh();
          },
          onError: (ctx) => {
            console.log("Sign out failed", ctx.error);
            setIsLoading(false);
          },
        },
      });
    } catch (error) {
      console.error("Sign out error:", error);
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSignOut}
      disabled={isLoading}
      className="py-3 text-center border-2 border-gray-800 rounded-lg"
    >
      {isLoading ? "Signing out..." : "Sign Out"}
    </Button>
  );
}
