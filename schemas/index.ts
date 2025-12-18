import * as z from "zod";
export const loginFormSchema = z.object({
  email: z.email({ error: "Invalid email address." }),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const signupFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.email({ error: "Invalid email address." }),
  password: z.string().min(8, "Password must be at least 8 characters."),
});
export const forgotPasswordSchema = z.object({
  email: z.email({ error: "Invalid email address." }),
});
export const verificationFormSchema = z.object({
  email: z.email({ error: "Invalid email address." }),
});
export const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters."),
});
