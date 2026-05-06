"use client";

import { authClient } from "@/lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  onSuccess: () => void;
};

export default function SignOutButton({ onSuccess }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const handleSignOut = async () => {
    if (isLoading) return;

    setIsLoading(true);
    queryClient.removeQueries({
      queryKey: ["user-selections"],
    });
    queryClient.removeQueries({
      queryKey: ["rating"],
    });
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Successfully signed out");
            onSuccess();
            router.refresh();
          },
          onError: (ctx) => {
            console.error("Sign out failed", ctx.error);
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
      className="py-3 text-center border w-full border-gray-800 rounded-lg cursor-pointer"
    >
      {isLoading ? "Signing out..." : "Sign Out"}
    </button>
  );
}
