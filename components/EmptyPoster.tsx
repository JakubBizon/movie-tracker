import { Film } from "lucide-react";

export const emptyPosterGradient =
  "bg-linear-to-br from-slate-700 via-slate-800 to-slate-900";

export const emptyHeroGradient =
  "bg-linear-to-r from-slate-700 via-slate-800 to-slate-900";

export const EMPTY_POSTER_COLOR = "#0f172a";

type Props = {
  title: string;
};

export default function EmptyPoster({ title }: Props) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center ${emptyPosterGradient}`}
    >
      <Film className="h-10 w-10 text-white/30" />
      <span className="line-clamp-4 text-sm font-semibold text-white/70">
        {title}
      </span>
    </div>
  );
}
