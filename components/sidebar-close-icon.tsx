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
      className={cn(className, "absolute right-4")}
      variant={"ghost"}
      size={"icon-lg"}
      onClick={() => toggleSidebar()}>
      <X className="size-8" />
    </Button>
  );
};
