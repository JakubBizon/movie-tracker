"use client";

import { useEffect, useState } from "react";

const useIsDesktop = (minWidth: number = 768) => {
  const [isDesktopLayout, setIsDesktopLayout] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${minWidth}px)`);

    const updateLayout = () => {
      setIsDesktopLayout(mediaQuery.matches);
    };

    updateLayout();
    mediaQuery.addEventListener("change", updateLayout);

    return () => {
      mediaQuery.removeEventListener("change", updateLayout);
    };
  }, [minWidth]);

  return { isDesktopLayout };
};

export default useIsDesktop;
