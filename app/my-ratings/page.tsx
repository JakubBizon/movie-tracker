import type { Metadata } from "next";
import MyRatingsClient from "@/components/MyRatings/MyRatingsClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getMyRatingsData } from "@/lib/MyRatings/getMyRatingsData";
import { RatingsSort } from "@/hooks/MyRatings/useMyRatings";
import LoggedOutState from "@/components/MyLists/LoggedOutState";

export const metadata: Metadata = {
  title: "My Ratings",
};

export default async function MyRatingsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort: sortParam } = await searchParams;
  const sort: RatingsSort =
    sortParam === "highest" || sortParam === "lowest" ? sortParam : "recent";

  const session = await auth.api.getSession({ headers: await headers() });
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["ratings-data", sort],
    queryFn: () => getMyRatingsData(session?.user.id ?? "", sort),
  });

  if (!session) {
    return (
      <LoggedOutState
        title="Log in to see your ratings"
        description="Your movie ratings will be displayed after logging in"
      />
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyRatingsClient initialSort={sort} />
    </HydrationBoundary>
  );
}
