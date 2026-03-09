import Image from "next/image";
type Props = {
  backdropPath: string;
  title: string;
  color: string;
};
export default function MovieBackground({ backdropPath, title, color }: Props) {
  return (
    <div className="absolute inset-0 max-h-[600px] w-full overflow-hidden">
      <Image
        src={`https://image.tmdb.org/t/p/original${backdropPath}`}
        alt={title}
        fill
        className="object-cover object-top w-full h-full"
        priority
        quality={90}
      />

      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to right, ${color} 0%, ${color}f0 25%, ${color}80 50%, transparent 75%)`,
        }}
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to top, ${color} 0%, ${color}cc 20%, transparent 60%)`,
        }}
      />

      <div className="absolute inset-0 z-10 bg-gradient-radial from-transparent via-transparent to-black/50" />
    </div>
  );
}
