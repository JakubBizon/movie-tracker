type Props = {
  title?: string;
  description?: string;
};

export default function MyRatingsPageHeader({
  title = "My ratings",
  description = "Every movie you have rated, compared with the global score",
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-4xl">{title}</h2>
      <span className="py-2 text-muted-foreground">{description}</span>
    </div>
  );
}
