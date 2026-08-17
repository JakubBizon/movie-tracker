import { DownloadIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function ExportButton() {
  async function handleExport() {
    const res = await fetch("/api/export");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex justify-between items-center gap-3">
      <div>
        <p>Export data</p>
        <p className="text-muted-foreground">
          Download your profile, lists and ratings as a JSON file
        </p>
      </div>
      <div>
        <Button
          onClick={handleExport}
          variant="outline"
          className="flex gap-2 items-center "
        >
          <DownloadIcon className="h-4 w-4" /> Export
        </Button>
      </div>
    </div>
  );
}
