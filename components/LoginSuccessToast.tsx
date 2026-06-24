"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function LoginSuccessToast() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.success("Successfully logged in!");
      router.replace("/");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
