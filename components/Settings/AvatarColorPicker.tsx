"use client";

import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

const AVATAR_COLORS = [
  { name: "blue", value: "bg-blue-500" },
  { name: "purple", value: "bg-purple-500" },
  { name: "green", value: "bg-emerald-500" },
  { name: "orange", value: "bg-orange-500" },
  { name: "pink", value: "bg-pink-500" },
  { name: "red", value: "bg-red-500" },
] as const;

export function AvatarColorPicker({
  defaultColor = "green",
  onChange,
}: {
  defaultColor?: string;
  onChange?: (color: string) => void;
}) {
  const [selected, setSelected] = useState(defaultColor);

  const handleSelect = (name: string) => {
    setSelected(name);
    onChange?.(name);
  };

  return (
    <div className="flex items-center gap-3 py-4">
      {AVATAR_COLORS.map((color) => (
        <button
          key={color.name}
          type="button"
          onClick={() => handleSelect(color.name)}
          aria-label={`Set avatar color to ${color.name}`}
          aria-pressed={selected === color.name}
          className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center transition-transform hover:scale-110",
            color.value,
            selected === color.name &&
              "ring-2 ring-offset-2 ring-offset-background ring-primary",
          )}
        >
          {selected === color.name && (
            <CheckIcon className="h-4 w-4 text-white" strokeWidth={3} />
          )}
        </button>
      ))}
    </div>
  );
}
