"use client";
import { cn } from "@/lib/utils";
import { Session } from "better-auth";
import { MonitorIcon, XIcon } from "lucide-react";
import { UAParser } from "ua-parser-js";

type Props = {
  session: Session;
  isCurrent?: boolean;
  onRevoke?: (token: string) => void;
  index: number;
};

function formatDate(raw: string | Date | undefined | null): string {
  if (!raw) return "Brak danych";
  const date = new Date(raw);
  if (isNaN(date.getTime())) return "Brak danych";

  return date.toLocaleString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SessionCard({
  session,
  isCurrent,
  onRevoke,
  index,
}: Props) {
  const formattedDate = formatDate(session.updatedAt);
  const formattedExpireDate = formatDate(session.expiresAt);

  const parser = new UAParser(session?.userAgent || "");
  const result = parser.getResult();
  const { browser, os } = result;

  const data = [
    { title: "Date", value: formattedDate },
    { title: "Expire date", value: formattedExpireDate },
    { title: "IP Adress", value: session.ipAddress },
    { title: "Device info", value: `${browser.name} • ${os}` },
  ];

  return (
    <div
      className={cn(
        "rounded-md px-4 py-3 xs:text-md text-sm border",
        "bg-zinc-100 border-zinc-200 text-zinc-700",
        "dark:bg-zinc-800/60 dark:border-transparent dark:text-zinc-300",
        index % 2 !== 0 && "bg-zinc-50 dark:bg-zinc-800/30",
        isCurrent &&
          "ring-1 ring-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 dark:ring-emerald-400/50",
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
          <MonitorIcon className="w-4 h-4" />
          <span className="text-xs">Session {index + 1}</span>
        </div>
        {isCurrent ? (
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            Current
          </span>
        ) : (
          <button
            className="cursor-pointer text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
            onClick={() => onRevoke?.(session.token)}
          >
            <XIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-zinc-500 dark:text-zinc-400 text-sm">
              {item.title}
            </span>
            <span className="text-zinc-800 dark:text-zinc-200">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
