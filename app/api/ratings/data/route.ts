import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getMyRatingsData } from "@/lib/MyRatings/getMyRatingsData";
import { RatingsSort } from "@/hooks/MyRatings/useMyRatings";

export async function GET(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  const { searchParams } = new URL(request.url);
  const sortParam = searchParams.get("sort");
  const sort: RatingsSort =
    sortParam === "highest" || sortParam === "lowest" || sortParam === "recent"
      ? sortParam
      : "recent";
  const data = await getMyRatingsData(session?.user.id ?? "", sort);
  return NextResponse.json(data);
}
