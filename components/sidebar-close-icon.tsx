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
    <Button variant={"ghost"} onClick={() => toggleSidebar()}>
      <X className={cn(className, "")} />
    </Button>
  );
};
