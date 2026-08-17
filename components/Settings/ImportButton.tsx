import { UploadIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { watchlistCountQueryKey } from "@/hooks/watchlist/useWatchlistCount";

export default function ImportButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isImporting, setIsImporting] = useState(false);
  const queryClient = useQueryClient();

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const text = await file.text();
      const json = JSON.parse(text);

      const res = await fetch("/api/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
      });

      const result = await res.json();
      if (!res.ok) {
        setIsImporting(false);
        toast.error(result.error ?? "Failed to import data");
        return;
      }
      setIsImporting(false);
      toast.success(`Imported JSON succesfully`);
      queryClient.invalidateQueries({
        queryKey: watchlistCountQueryKey,
      });
    } catch {
      setIsImporting(false);
      toast.error(`Invalid JSON file`);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <>
      <div className="flex justify-between items-center gap-3">
        <div>
          <p>Import data </p>
          <p className="text-muted-foreground">
            Restore your lists and ratings from a previously exported file
          </p>
        </div>
        <div className="">
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="flex gap-2 items-center "
          >
            <UploadIcon className="h-4 w-4" />{" "}
            {isImporting ? "Importing" : "Import"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={handleImport}
          />
        </div>
      </div>
    </>
  );
}
