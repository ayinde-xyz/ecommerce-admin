"use client";

import { resetPassword, signIn } from "@/lib/auth-client";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SocialLogin } from "./social-login";
import Link from "next/link";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { resetPasswordSchema } from "@/schemas";
import { useRouter } from "next/navigation";

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({
  className,

  token,
  ...props
}: React.ComponentProps<"div"> & ResetPasswordFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof resetPasswordSchema>) => {
    console.log("i ma didi");
    const { password } = data;
    startTransition(async () => {
      await resetPassword({
        token,
        newPassword: password,
        fetchOptions: {
          onRequest: () => {
            toast.loading("Resetting password...");
          },
          onError: (error) => {
            toast.dismiss();
            toast.error(`Error resetting password: ${error.error.message}`);
          },
          onSuccess: () => {
            toast.dismiss();
            toast.success("Password reset successfully! You can now log in.");
            router.push("/auth/login");
          },
        },
      });
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset your Password</CardTitle>
          <CardDescription>
            Please enter your new password to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                    </div>
                    <Input {...field} id="password" type="password" required />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel>Confirm Password</FieldLabel>
                    </div>
                    <Input {...field} id="password" type="password" required />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Field>
                <Button disabled={isPending} type="submit">
                  Reset Password
                </Button>
                <FieldDescription className="text-center">
                  Don't have an account?{" "}
                  <Link href="/auth/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
