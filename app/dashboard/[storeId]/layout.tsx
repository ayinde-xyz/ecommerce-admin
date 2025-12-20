import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default async function Dashboard({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ storeId: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth/login");
  }

  const { storeId } = await params;
  const userId = session?.user.id;
  // console.log("Session", session);

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "20rem",
        "--sidebar-width-mobile": "100%",
      } as React.CSSProperties}>
      <AppSidebar />
      <main className="w-full">
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
