"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRefreshOnFocus() {
  const router = useRouter();

  useEffect(() => {
    const onFocus = () => {
      router.refresh();
    };

    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [router]);
}
