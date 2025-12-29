import { ModeToggle } from "@/components/theme-toggle";

import { SignOut } from "./auth/sign-out";
import { SidebarTrigger } from "./ui/sidebar";
import { Amatic_SC } from "next/font/google";

const Amantic = Amatic_SC({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

const Navbar = async () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <SidebarTrigger />
        <span className={`ml-4 text-2xl font-bold ${Amantic.className}`}>
          WEARMERCE
        </span>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
