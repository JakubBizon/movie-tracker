import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  icon: ReactNode;
  link?: string;
}

export function SectionHeader({ title, icon, link }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-1 mb-4">
      <h2 className="dark:text-white flex items-center gap-2 text-black font-semibold text-3xl">
        {icon}
        {title}
      </h2>
      {link && (
        <Button asChild variant="default" className="px-2 py-1">
          <Link href={link}>View all</Link>
        </Button>
      )}
    </div>
  );
}
