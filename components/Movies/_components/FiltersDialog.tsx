"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import GenresAndDatesFilter from "./GenresAndDatesFilter";
import { Genre } from "@/app/types/movie";

type Props = {
  genres: Genre[];
};
export default function FiltersDialog({ genres }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <span>Filters</span>
          <SlidersHorizontal className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] overflow-y-auto p-0">
        <div className="hidden">
          <DialogTitle>Filters</DialogTitle>
        </div>

        <GenresAndDatesFilter genres={genres} onSubmit={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
