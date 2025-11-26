"use server";
import { signIn } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export const login = async () => {
  try {
    const response = await signIn.social({
      provider: "google",
    });
    console.log("LOGIN RESPONSE", response);
    if (response.error) {
      return { error: "Sign-in failed. Please try again." };
    }
  } catch (error) {
    console.error("Sign-in error:", error);
    return { error: "An error occurred during sign-in" };
  }
  redirect("/");
};
