import { GalleryVerticalEnd } from "lucide-react";

export default async function Page() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Shoemerce Inc.
        </a>

        <h2 className="text-center font-semibold text-2xl">
          You have successfully sent a password reset link to your email. Please
          check your inbox.
        </h2>
      </div>
    </div>
  );
}
