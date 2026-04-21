import { Genre } from "@/app/types/movie";

type Props = {
  genres: Genre[];
  toggleGenre: (genreId: number) => void;
  selectedGenres: number[];
};

export default function GenresList({
  genres,
  toggleGenre,
  selectedGenres,
}: Props) {
  return (
    <>
      {genres.map((genre: Genre) => {
        const isActive = selectedGenres.includes(genre.id);
        return (
          <button
            type="button"
            key={genre.id}
            onClick={() => toggleGenre(genre.id)}
            className={`px-3 py-1 text-sm rounded-full border transition-colors cursor-pointer ${
              isActive
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {genre.name}
          </button>
        );
      })}
    </>
  );
}
