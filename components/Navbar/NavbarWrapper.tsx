"use client";

import { useNavbarStore } from "@/store/Navbar";
import { useEffect, useState } from "react";

export default function NavbarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const { isSearchVisible } = useNavbarStore();

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY < 10) {
        setShowNavbar(true);
        setLastScrollY(window.scrollY);
        return;
      } else if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShowNavbar(false);
      } else if (window.scrollY < lastScrollY) {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);
  const isVisible = showNavbar || isSearchVisible;

  return (
    <div
      className={`sticky top-0 z-50 w-full transition-all duration-300  ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {children}
    </div>
  );
}
