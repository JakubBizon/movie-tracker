import { auth } from "@/lib/auth";
import { importUserData } from "@/lib/Settings/import-export";
import { importSchema } from "@/lib/zod";
import { NextResponse } from "next/server";
import { flattenError } from "zod";

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = importSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid file format", details: flattenError(parsed.error) },
      { status: 400 },
    );
  }

  const result = await importUserData(session.user.id, parsed.data.data);
  return NextResponse.json({ imported: result });
}
