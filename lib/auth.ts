import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/app/db/index";
import { nextCookies } from "better-auth/next-js";
import * as schema from "@/app/db/schema";
import {
  APIError,
  createAuthMiddleware,
  getSessionFromCtx,
} from "better-auth/api";
import { isDemoUser } from "@/lib/demo-user";

const demoBlockedPaths = new Set([
  "/revoke-session",
  "/revoke-sessions",
  "/revoke-other-sessions",
  "/change-password",
  "/delete-user",
  "/update-user",
]);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      avatarColor: {
        type: "string",
        required: true,
        defaultValue: "blue",
        input: false,
      },
    },
  },

  plugins: [nextCookies()],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (!demoBlockedPaths.has(ctx.path)) return;

      const session = await getSessionFromCtx(ctx);
      if (!isDemoUser(session?.user.email)) return;

      throw new APIError("FORBIDDEN", {
        message: "Not available on the demo account",
      });
    }),
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/list-sessions") return;

      const session = ctx.context.session;
      if (!isDemoUser(session?.user.email)) return;

      const sessions = ctx.context.returned;
      if (!Array.isArray(sessions)) return;

      const currentToken = session?.session.token;
      const ownSession = sessions
        .filter((item) => item.token === currentToken)
        .map((item) => ({ ...item, ipAddress: null }));

      return ownSession;
    }),
  },
});
