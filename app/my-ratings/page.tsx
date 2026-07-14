import type { Metadata } from "next";
import MyRatingsClient from "@/components/MyRatings/MyRatingsClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getMyRatingsData } from "@/lib/MyRatings/getMyRatingsData";

export const metadata: Metadata = {
  title: "My Ratings",
};

export default async function MyRatingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["ratings-data"],
    queryFn: () => getMyRatingsData(session?.user.id ?? ""),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyRatingsClient />
    </HydrationBoundary>
  );
}
