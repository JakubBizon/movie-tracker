import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getMyRatingsData } from "@/lib/MyRatings/getMyRatingsData";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  const data = await getMyRatingsData(session?.user.id ?? "");
  return NextResponse.json(data);
}
