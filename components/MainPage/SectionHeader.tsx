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
    <div className="flex items-center justify-between px-4 py-1 mb-2">
      <h2 className="dark:text-white flex items-center gap-2 text-black font-semibold md:text-3xl text-xl">
        {icon}
        {title}
      </h2>
      {link && (
        <Button
          asChild
          variant="default"
          className="md:px-4 py-1 px-2 md:text-sm"
        >
          <Link href={link}>View all</Link>
        </Button>
      )}
    </div>
  );
}
