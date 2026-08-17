"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ImportButton from "./ImportButton";
import ExportButton from "./ExportButton";

export default function DataSettings() {
  return (
    <Card>
      <CardHeader>
        <span className="text-lg font-semibold">Data</span>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 xs:px-6 px-4">
        <ExportButton />
        <ImportButton />
      </CardContent>
    </Card>
  );
}
