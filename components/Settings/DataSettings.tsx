import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DownloadIcon, UploadIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function DataSettings() {
  return (
    <Card>
      <CardHeader>
        <span className="text-lg font-semibold">Data</span>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 xs:px-6 px-4">
        <div className="flex justify-between items-center gap-3">
          <div className="">
            <p>Export data</p>
            <p className="text-muted-foreground">
              Download your profile, lists and ratings as a JSON file
            </p>
          </div>
          <div>
            <Button variant="outline" className="flex gap-2 items-center ">
              <DownloadIcon className="h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center gap-3">
          <div className="">
            <p>Import data </p>
            <p className="text-muted-foreground">
              Restore your data from a previously exported file
            </p>
          </div>
          <div>
            <Button variant="outline" className="flex gap-2 items-center ">
              <UploadIcon className="h-4 w-4" /> Import
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
