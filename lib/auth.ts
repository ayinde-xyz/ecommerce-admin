import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prismadb from "./prismadb";
import { nextCookies } from "better-auth/next-js";
import { sendEmailAction } from "@/actions/auth/sendPasswordReset";

const baseURL: string | undefined =
  process.env.VERCEL === "1"
    ? process.env.VERCEL_ENV === "production"
      ? process.env.BETTER_AUTH_URL
      : process.env.VERCEL_ENV === "preview"
        ? `https://${process.env.VERCEL_URL}`
        : undefined
    : undefined;

const cookieDomain: string | undefined =
  process.env.VERCEL === "1"
    ? process.env.VERCEL_ENV === "production"
      ? ".vercel.app"
      : process.env.VERCEL_ENV === "preview"
        ? `.${process.env.VERCEL_URL}`
        : undefined
    : undefined;

export const auth = betterAuth({
  baseURL,
  database: prismaAdapter(prismadb, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 60 * 60,
    sendResetPassword: async ({ user, url }) => {
      await sendEmailAction({
        to: user.email,
        subject: "Reset your password",
        meta: {
          description: "Click the link below to reset your password.",
          link: url,
        },
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const link = new URL(url);
      link.searchParams.set("callbackURL", "/auth/verify");
      console.log("Link url", url);
      await sendEmailAction({
        to: user.email,
        subject: "Verify your email address",
        meta: {
          description: "Click the link below to verify your email address.",
          link: String(link),
        },
      });

      // Implement your email sending logic here
    },
  },
  user: {
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        await sendEmailAction({
          to: user.email,
          subject: "Confirm account deletion",
          meta: {
            description: "Click the link below to confirm account deletion.",
            link: url,
          },
        });
      },
    },
  },

  session: {
    expiresIn: 30 * 24 * 60 * 60,
    updateAge: 60 * 60,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  account: {
    accountLinking: {
      enabled: false,
    },
  },

  plugins: [nextCookies()],

  advanced: {
    database: {
      generateId: false,
    },
    crossSubDomainCookies: {
      enabled: process.env.NODE_ENV === "production",
      domain: cookieDomain,
    },
    cookies: {
      session_token: {
        name: "session_token",
        attributes: {
          sameSite: "None",
          domain: "ecommerce-admin-silk-ten.vercel.app",
          path: "/",
          secure: true,
          httpOnly: false,
        },
      },
    },
  },
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
