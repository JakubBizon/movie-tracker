import { Movie } from "@/app/types/movie";
import Image from "next/image";
type Props = {
  data: Movie;
};
export default function MoviePoster({ data }: Props) {
  return (
    <div className="shrink-0">
      <div className="relative w-32 sm:w-40  md:w-64 lg:w-80 aspect-2/3 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 ">
        <Image
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={data.title}
          fill
          className="object-cover"
          priority
          quality={90}
          loading="eager"
          sizes="(max-width: 1024px) 20vw, 33vw, (max-width:768px) 150px"
        />
      </div>
    </div>
  );
}
