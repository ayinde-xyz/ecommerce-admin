import { betterAuth } from "better-auth";
import { admin, twoFactor, phoneNumber, username } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prismadb from "./prismadb";
import { nextCookies } from "better-auth/next-js";
import { hashPassword } from "better-auth/crypto";

export const auth = betterAuth({
  database: prismaAdapter(prismadb, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  socialProviders: {
    google: {
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    },
  },

  plugins: [nextCookies()],
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
