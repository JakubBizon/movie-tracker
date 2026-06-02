import { useEffect } from "react";
import useIsDesktop from "./useIsDesktop";

export const useCloseOnDesktop = (setOpen: (open: boolean) => void) => {
  const { isDesktopLayout } = useIsDesktop(1024);

  useEffect(() => {
    if (isDesktopLayout) {
      setOpen(false);
    }
  }, [isDesktopLayout, setOpen]);
};
