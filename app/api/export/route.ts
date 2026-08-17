import { auth } from "@/lib/auth";
import { getUserData } from "@/lib/Settings/import-export";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await getUserData(session.user.id);

  const payload = {
    schemaVersion: 1,
    exportedAt: new Date().toISOString(),
    data,
  };

  return new NextResponse(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="export-${Date.now()}.json"`,
    },
  });
}
