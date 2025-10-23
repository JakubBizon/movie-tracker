import { SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export function Search() {
  return (
    <div className="px-10">
      <InputGroup className="dark:glass bg-white border-primary dark:border-border/50 dark:text-muted-foreground text-black focus-visible:ring-primary w-full">
        <InputGroupInput placeholder="Search movies, shows, people..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
