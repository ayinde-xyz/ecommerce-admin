import { VerifyEmailForm } from "@/components/auth/verify-email";
import { GalleryVerticalEnd } from "lucide-react";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const error = (await searchParams).error;

  if (!error) redirect("/dashboard/[storeID]");

  return (
    <>
      <p className="text-center text-lg text-red-600 capitalize">
        {error === "invalid_token" || error === "expired_token"
          ? "Invalid or expired verification token."
          : error.replace(/_/g, " ").replace(/-/g, " ")}
      </p>
      <VerifyEmailForm />
    </>
  );
}
