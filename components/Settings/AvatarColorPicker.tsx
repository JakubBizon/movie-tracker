"use client";

import { updateAvatarColor } from "@/app/actions/updateAvatarColor";
import { AVATAR_COLORS } from "@/app/types/avatarColors";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useState, useTransition } from "react";

import { toast } from "sonner";

export function AvatarColorPicker({
  defaultColor = "blue",
}: {
  defaultColor?: string;
}) {
  const [selected, setSelected] = useState(defaultColor);
  const [isPending, startTransition] = useTransition();

  const handleSelect = (name: string) => {
    const previous = selected;
    setSelected(name);

    startTransition(async () => {
      try {
        await updateAvatarColor(name);
      } catch (e) {
        setSelected(previous);
        toast.error("Cannot update avatar color. Please try again.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-3 py-2">
      <p>Avatar Color</p>
      <div className="flex gap-3">
        {AVATAR_COLORS.map((color) => (
          <button
            key={color.name}
            type="button"
            disabled={isPending || selected === color.name}
            onClick={() => handleSelect(color.name)}
            aria-label={`Set avatar color to ${color.name}`}
            aria-pressed={selected === color.name}
            className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 disabled:opacity-50",
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
    </div>
  );
}
