"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "../db";
import { user } from "../db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { userNameSchema } from "@/lib/zod";

export async function updateUserName(rawUserName: string) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const parsed = userNameSchema.safeParse({ userName: rawUserName });

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  const userName = parsed.data.userName.trim();

  if (userName === session.user.name) {
    return { ok: true };
  }

  if (userName.length < 1) {
    throw new Error("Username must be at least 1 characters long");
  }

  await db
    .update(user)
    .set({ name: userName })
    .where(eq(user.id, session.user.id));

  revalidatePath("/settings");
}
