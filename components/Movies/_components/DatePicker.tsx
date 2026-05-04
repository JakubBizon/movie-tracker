"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

type DatePickerProps = {
  date?: Date;
  onChange: (date?: Date) => void;
  disabled?: (date: Date) => boolean;
};

export function DatePicker({ date, onChange, disabled }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="md:w-37.5 flex-1 xs:max-w-100 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          {date ? format(date, "PP") : <span>Pick a date</span>}
          <ChevronDownIcon className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            onChange(newDate);
            setIsOpen(false);
          }}
          autoFocus
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
}
