"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { AVATAR_COLORS } from "../types/avatarColors";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { user } from "../db/schema";
import { revalidatePath } from "next/cache";

const ALLOWED_COLORS =
  typeof AVATAR_COLORS !== "undefined" ? AVATAR_COLORS.map((c) => c.name) : [];
type AvatarColor = (typeof ALLOWED_COLORS)[number];

export async function updateAvatarColor(color: string) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (!ALLOWED_COLORS.includes(color as AvatarColor)) {
    throw new Error("Invalid color");
  }

  await db
    .update(user)
    .set({ avatarColor: color })
    .where(eq(user.id, session.user.id));

  revalidatePath("/settings");
}
