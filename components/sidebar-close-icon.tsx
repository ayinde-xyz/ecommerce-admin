"use client";
import { X } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export const SidebarCloseIcon = ({
  className,
}: React.ComponentPropsWithoutRef<typeof X>) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      className={cn(className, "absolute right-4 h-8 w-8")}
      variant={"ghost"}
      size={"icon-lg"}
      onClick={() => toggleSidebar()}>
      <X className="h-5-w-5" />
    </Button>
  );
};
