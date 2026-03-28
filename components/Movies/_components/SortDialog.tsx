"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ArrowUpDown } from "lucide-react";
import SelectSort from "./SelectSort";
import { useState } from "react";

export default function SortDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <span>Sort</span>
          <ArrowUpDown className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sort</DialogTitle>
        </DialogHeader>
        <SelectSort onSelect={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
