import { Movie } from "@/app/types/movie";
import Image from "next/image";
type Props = {
  data: Movie;
};
export default function MoviePoster({ data }: Props) {
  return (
    <div className="shrink-0">
      <div className="relative w-48 md:w-64 lg:w-80 xl:w-96 aspect-2/3 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 hover:ring-white/30">
        <Image
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={data.title}
          fill
          className="object-cover"
          priority
          quality={90}
          loading="eager"
          sizes="(max-width: 1024px) 20vw, 33vw,"
        />
      </div>
    </div>
  );
}
