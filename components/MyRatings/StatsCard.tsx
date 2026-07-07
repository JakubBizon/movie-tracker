import { ReactElement } from "react";
import { Card, CardContent } from "../ui/card";

type Props = {
  icon: ReactElement;
  value: number | string;
  label: string;
};

export default function StatsCard({ icon, value, label }: Props) {
  return (
    <Card>
      <CardContent className="flex gap-4 items-center">
        <div className="px-3 py-3 rounded-full bg-primary">{icon}</div>
        <div className="flex flex-col">
          <span className="text-3xl font-bold tabular-nums">{value}</span>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
