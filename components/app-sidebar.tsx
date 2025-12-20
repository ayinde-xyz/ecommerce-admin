import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import MainNav from "./main-nav";
import prismadb from "@/lib/prismadb";
import StoreSwitcher from "./store-switcher";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function AppSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user.id;
  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <StoreSwitcher items={stores} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupLabel>
          <span className="text-lg font-medium">Navigation</span>
        </SidebarGroupLabel>

        <SidebarGroup>
          <SidebarGroupContent>
            <MainNav />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
