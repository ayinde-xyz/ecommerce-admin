import "./globals.css";
import type { Metadata } from "next";
import { Comfortaa, Inter } from "next/font/google";
import { ModalProvider } from "@/providers/modal-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

// const inter = Inter({ subsets: ["latin"] });
const comfortaa = Comfortaa({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const store = prismadb.store.update;

  return (
    <html lang="en">
      <body className={`${comfortaa.className} w-full`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* <ToasterProvider /> */}
          <ModalProvider />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

// ↑ @types/node 20.17.10 → 22.10.2
// ↑ @types/react 18.3.16 → 19.0.1
// ↑ @types/react-dom 18.3.5 → 19.0.2
// ↑ eslint 8.57.1 → 9.17.0
// ↑ eslint-config-next 13.5.4 → 15.1.0
// ↑ prisma 5.22.0 → 6.0.1
// ↑ @clerk/nextjs 4.31.6 → 6.9.2
// ↑ @prisma/client 5.22.0 → 6.0.1
// ↑ cmdk 0.2.1 → 1.0.4
// ↑ date-fns 2.30.0 → 4.1.0
// ↑ lucide-react 0.287.0 → 0.468.0
// ↑ next 13.5.4 → 15.1.0
// ↑ next-cloudinary 4.28.0 → 6.16.0
// ↑ react 18.3.1 → 19.0.0
// ↑ react-dom 18.3.1 → 19.0.0
// ↑ stripe 14.25.0 → 17.4.0
// ↑ tailwind-merge 1.14.0 → 2.5.5
// ↑ zustand 4.5.5 → 5.0.2
