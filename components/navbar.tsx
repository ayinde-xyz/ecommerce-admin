import { ModeToggle } from "@/components/theme-toggle";

import { SignOut } from "./auth/sign-out";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = async () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <SidebarTrigger />
        {/* <StoreSwitcher items={stores} /> */}
        {/* <MainNav className="mx-6" /> */}
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
