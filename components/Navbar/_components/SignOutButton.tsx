"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  onSuccess: () => void;
};

export default function SignOutButton({ onSuccess }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Successfully signed out");
            onSuccess();
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
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className="py-3 text-center border-2 border-gray-800 rounded-lg cursor-pointer"
    >
      {isLoading ? "Signing out..." : "Sign Out"}
    </button>
  );
}
