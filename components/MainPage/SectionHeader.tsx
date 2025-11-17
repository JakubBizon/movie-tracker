import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  icon: ReactNode;
}

export function SectionHeader({ title, icon }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-1 mb-4">
      <h2 className="dark:text-white flex items-center gap-2 text-black font-semibold text-3xl">
        {icon}
        {title}
      </h2>

      <Button variant="default" className="px-2 py-1">
        View all
      </Button>
    </div>
  );
}
