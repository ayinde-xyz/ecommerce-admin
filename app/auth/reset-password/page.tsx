import { ResetPasswordForm } from "@/components/auth/reset-password";
import { GalleryVerticalEnd } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ token: string }>;
}

const ResetPasswordPage = async ({ searchParams }: PageProps) => {
  const { token } = await searchParams;
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Shoemerce Inc.
        </a>
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
