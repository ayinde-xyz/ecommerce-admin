"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "./ui/button";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const routes = [
    {
      href: `/dashboard/${params.storeId}`,
      label: "Overview",
      active: pathname === `/dashboard/${params.storeId}`,
    },
    {
      href: `/dashboard/${params.storeId}/billboards`,
      label: "Billboard",
      active: pathname === `/dashboard/${params.storeId}/billboards`,
    },
    {
      href: `/dashboard/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/dashboard/${params.storeId}/categories`,
    },
    {
      href: `/dashboard/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/dashboard/${params.storeId}/sizes`,
    },
    {
      href: `/dashboard/${params.storeId}/colors`,
      label: "Colors",
      active: pathname === `/dashboard/${params.storeId}/colors`,
    },
    {
      href: `/dashboard/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/dashboard/${params.storeId}/products`,
    },
    {
      href: `/dashboard/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/dashboard/${params.storeId}/orders`,
    },
    {
      href: `/dashboard/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/dashboard/${params.storeId}/settings`,
    },
  ];

  const ITEMS_TO_DISPLAY = 2;

  return (
    // <Breadcrumb>
    //   <BreadcrumbList>
    //     <BreadcrumbItem>
    //       <Link href={routes[0].href}>{routes[0].label}</Link>
    //     </BreadcrumbItem>
    //     <BreadcrumbSeparator />
    //     {routes.length > ITEMS_TO_DISPLAY ? (
    //       <>
    //         <BreadcrumbItem>
    //           {isDesktop ? (
    //             <DropdownMenu open={open} onOpenChange={setOpen}>
    //               <DropdownMenuTrigger
    //                 className="flex items-center gap-1"
    //                 aria-label="Toggle menu">
    //                 <BreadcrumbEllipsis className="h-4 w-4" />
    //               </DropdownMenuTrigger>
    //               <DropdownMenuContent align="start">
    //                 {routes.slice(1, -1).map((route, index) => (
    //                   <DropdownMenuItem key={index}>
    //                     <Link href={route.href ? route.href : "#"}>
    //                       {route.label}
    //                     </Link>
    //                   </DropdownMenuItem>
    //                 ))}
    //               </DropdownMenuContent>
    //             </DropdownMenu>
    //           ) : (
    //             <Drawer open={open} onOpenChange={setOpen}>
    //               <DrawerTrigger aria-label="Toggle Menu">
    //                 <BreadcrumbEllipsis className="h-4 w-4" />
    //               </DrawerTrigger>
    //               <DrawerContent>
    //                 <DrawerHeader className="text-left">
    //                   <DrawerTitle>Navigate to</DrawerTitle>
    //                   <DrawerDescription>
    //                     Select a page to navigate to.
    //                   </DrawerDescription>
    //                 </DrawerHeader>
    //                 <div className="grid gap-1 px-4">
    //                   {routes.slice(1, -1).map((route, index) => (
    //                     <Link
    //                       key={index}
    //                       href={route.href ? route.href : "#"}
    //                       className="py-1 text-sm">
    //                       {route.label}
    //                     </Link>
    //                   ))}
    //                 </div>
    //                 <DrawerFooter className="pt-4">
    //                   <DrawerClose asChild>
    //                     <Button variant="outline">Close</Button>
    //                   </DrawerClose>
    //                 </DrawerFooter>
    //               </DrawerContent>
    //             </Drawer>
    //           )}
    //         </BreadcrumbItem>
    //         <BreadcrumbSeparator />
    //       </>
    //     ) : null}
    //     {routes.slice(-ITEMS_TO_DISPLAY + 1).map((route, index) => (
    //       <BreadcrumbItem key={index}>
    //         {route.href ? (
    //           <>
    //             <BreadcrumbLink
    //               asChild
    //               className="max-w-20 truncate md:max-w-none">
    //               <Link href={route.href}>{route.label}</Link>
    //             </BreadcrumbLink>
    //             <BreadcrumbSeparator />
    //           </>
    //         ) : (
    //           <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
    //             {route.label}
    //           </BreadcrumbPage>
    //         )}
    //       </BreadcrumbItem>
    //     ))}
    //   </BreadcrumbList>
    // </Breadcrumb>
    <SidebarMenu className="gap-y-3">
      {routes.map((route) => (
        <SidebarMenuItem key={route.href}>
          <SidebarMenuButton asChild>
            <Link href={route.href}>
              <span className="text-lg ">{route.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
    // <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
    //   {routes.map((route) => (
    //     <Link
    //       key={route.href}
    //       href={route.href}
    //       className={cn(
    //         "text-sm font-medium transition-colors hover:text-primary",
    //         route.active
    //           ? "text-black dark:text-white"
    //           : "text-muted-foreground"
    //       )}>
    //       {route.label}
    //     </Link>
    //   ))}
    // </nav>
  );
};

export default MainNav;
