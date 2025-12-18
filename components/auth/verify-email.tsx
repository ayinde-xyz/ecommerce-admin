"use client";
import { sendVerificationEmail, signIn } from "@/lib/auth-client";
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
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { verificationFormSchema } from "@/schemas";
import { signInEmailAction } from "@/actions/auth/login";
import { redirect } from "next/navigation";
import { ErrorCode } from "@/lib/auth";
import { useRouter } from "next/navigation";

export function VerifyEmailForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof verificationFormSchema>>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verificationFormSchema>) => {
    const { email } = data;
    startTransition(async () => {
      await sendVerificationEmail({
        email,
        callbackURL: "/auth/verify",
        fetchOptions: {
          onRequest: () => {
            toast.loading("Sending verification email...");
          },
          onError: (error) => {
            toast.dismiss();
            toast.error(
              `Error sending verification email: ${error.error.message}`
            );
          },
          onSuccess: () => {
            toast.dismiss();
            toast.success("Verification email sent. Please check your inbox.");
            router.push("/auth/verify/success");
          },
        },
      });
      toast.success("Verification email sent. Please check your inbox.");
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Verify your Email</CardTitle>
          <CardDescription>
            Please request a new Verification Email to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Field>
                <Button type="submit" disabled={isPending}>
                  Resend Verification Email
                </Button>
                <FieldDescription className="text-center">
                  Don't have an account? <a href="/auth/signup">Sign up</a>
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
