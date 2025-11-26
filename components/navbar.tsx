import MainNav from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import prismadb from "@/lib/prismadb";
import { ModeToggle } from "@/components/theme-toggle";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SignOut } from "./auth/sign-out";

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log("SESSION", session);

  const userId = session?.user.id;

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <SignOut />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
