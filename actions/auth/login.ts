"use server";

import { auth, ErrorCode } from "@/lib/auth";
import { loginFormSchema } from "@/schemas";
import { APIError } from "better-auth";
import { redirect } from "next/navigation";
import * as z from "zod";

export async function signInEmailAction(data: z.infer<typeof loginFormSchema>) {
  const { email, password } = data;

  try {
    const res = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      asResponse: true,
    });

    if (res.ok) {
      return { success: "Sign in successful" };
    }
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";
      console.dir(err, { depth: 5 });
      switch (errCode) {
        case "EMAIL_NOT_VERIFIED":
          redirect("/auth/verify?error=email_not_verified");
        default:
          return { error: err.message };
      }
    }

    return { error: "Internal Server Error" };
  }
}
