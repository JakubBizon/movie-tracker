import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function MenuThemeToggle() {
  const { theme, setTheme } = useTheme();

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  if (isFirstRender) return null;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2">
        Appearance
      </p>
      <div className="flex bg-muted p-1 rounded-lg">
        {[
          { name: "light", icon: Sun },
          { name: "dark", icon: Moon },
          { name: "system", icon: Monitor },
        ].map((t) => (
          <button
            key={t.name}
            onClick={() => setTheme(t.name)}
            className={`flex-1 flex items-center justify-center py-2 rounded-md transition-all ${
              theme === t.name
                ? "bg-background shadow-sm text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <t.icon className="h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  );
}
