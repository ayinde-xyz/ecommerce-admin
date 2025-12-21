import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import MainNav from "./main-nav";
import prismadb from "@/lib/prismadb";
import StoreSwitcher from "./store-switcher";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { SidebarCloseIcon } from "./sidebar-close-icon";
import { SignOut } from "./auth/sign-out";

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
    <Sidebar variant="inset">
      <SidebarHeader className=" ml-7">
        <SidebarMenu>
            <SidebarMenuItem className="relative h-8">
          <SidebarCloseIcon className="" />
          </SidebarMenuItem>

          <StoreSwitcher items={stores} />
        </SidebarMenu>

        
      </SidebarHeader>
      <SidebarContent className="mt-5 ml-7">
        <SidebarGroupLabel>
          <span className="text-lg font-medium">Navigation</span>
        </SidebarGroupLabel>

        <SidebarGroup>
          <SidebarGroupContent>
            <MainNav />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-col justify-center items-center pb-10">
        <SignOut />
      </SidebarFooter>
    </Sidebar>
  );
}
