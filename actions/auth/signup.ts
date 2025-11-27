"use server";

import { auth, ErrorCode } from "@/lib/auth";
import { signupFormSchema } from "@/schemas";
import { APIError } from "better-auth";
import z from "zod";

export async function signupEmailAction(
  data: z.infer<typeof signupFormSchema>
) {
  const { name, email, password } = data;
  try {
    const res = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      asResponse: true,
    });

    if (res.ok) {
      return { success: "Sign Up successful" };
    }
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";

      switch (errCode) {
        case "USER_ALREADY_EXISTS":
          return { error: "Oops! Something went wrong. Please try again." };
        default:
          return { error: err.message };
      }
    }

    return { error: "Internal Server Error" };
  }
}
