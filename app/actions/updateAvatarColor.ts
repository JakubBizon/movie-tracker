"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { AVATAR_COLORS, AvatarColorName } from "../types/avatarColors";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { user } from "../db/schema";
import { revalidatePath } from "next/cache";

const ALLOWED_COLORS = new Set(AVATAR_COLORS.map((c) => c.name));

function isValidColor(color: string): color is AvatarColorName {
  return ALLOWED_COLORS.has(color as AvatarColorName);
}

export async function updateAvatarColor(color: string) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (color === session.user.avatarColor) {
    return { ok: true };
  }

  if (!isValidColor(color)) {
    throw new Error("Invalid color");
  }

  await db
    .update(user)
    .set({ avatarColor: color })
    .where(eq(user.id, session.user.id));

  revalidatePath("/settings");
}
