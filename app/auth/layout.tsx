import { GalleryVerticalEnd } from "lucide-react";
import { Amatic_SC } from "next/font/google";

const Amantic = Amatic_SC({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <span className={`text-2xl font-bold ${Amantic.className}`}>
            WEARMERCE
          </span>
        </a>
        {children}
      </div>
    </div>
  );
}
