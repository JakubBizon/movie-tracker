"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  if (isFirstRender)
    return (
      <div className="lg:flex hidden">
        <Button
          variant="ghost"
          size="icon"
          className="dark:text-white text-black"
        >
          <Sun size={20} />
        </Button>
      </div>
    );

  const isLight = theme === "light";

  return (
    <>
      <div className="lg:flex hidden">
        <Button
          aria-label={`Change theme to ${isLight ? "dark" : "light"}`}
          variant="ghost"
          size="icon"
          onClick={() => setTheme(isLight ? "dark" : "light")}
          className="dark:text-white text-black"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </Button>
      </div>
    </>
  );
}
