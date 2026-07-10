"use client";

import { Bar, BarChart, LabelList, XAxis } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { MyRatingsMovieDetails } from "@/app/types/my-ratings-movie-details";

function getRatingDistribution(movies: MyRatingsMovieDetails[]) {
  const counts = Array.from({ length: 10 }, (_, i) => ({
    rating: i + 1,
    count: 0,
  }));

  for (const movie of movies) {
    const index = movie.rating - 1;
    if (counts[index]) counts[index].count += 1;
  }

  return counts;
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export default function RatingDistributionChart({
  movies,
}: {
  movies: MyRatingsMovieDetails[];
}) {
  const data = getRatingDistribution(movies);

  return (
    <ChartContainer config={chartConfig} className="max-h-30 w-full">
      <BarChart accessibilityLayer data={data}>
        <XAxis
          dataKey="rating"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#9ca3af", fontSize: 12 }}
        />

        <Bar dataKey="count" fill="var(--color-desktop)" radius={[6, 6, 6, 6]}>
          <LabelList
            dataKey="count"
            position="top"
            fill="#9ca3af"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
