import { VerifyEmailForm } from "@/components/auth/verify-email";
import { GalleryVerticalEnd } from "lucide-react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const error = (await searchParams).error;

  if (!error) redirect("/dashboard");

  if (error === "invalid_token" || error === "expired_token") {
    toast.error(
      "Your verification link is invalid or has expired. Please request a new verification email."
    );
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Shoemerce Inc.
        </a>
        <p>
          <span className="capitalize">
            {error.replace(/_/g, " ").replace(/-/g, " ")}
          </span>{" "}
        </p>
        <VerifyEmailForm />
      </div>
    </div>
  );
}
