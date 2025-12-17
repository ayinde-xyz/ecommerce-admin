"use client";
import { signOut, useSession } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const SignOut = () => {
  const session = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      const parts = name.trim().split(/\s+/).filter(Boolean);
      if (parts.length === 0) return "U";
      if (parts.length === 1) {
        const w = parts[0];
        return (w[0] + (w[1] || "")).toUpperCase();
      }
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }

    if (email) {
      const local = email.split("@")[0] || "";
      return (local[0] + (local[1] || "")).toUpperCase() || "U";
    }

    return "U";
  };

  const handleSignOut = async () => {
    startTransition(() => {
      toast.promise(
        signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/auth/login"); // redirect to login page
            },
          },
        }),
        {
          loading: "Signing out...",
          success: "Signed out successfully!",
          error: "Error signing out",
        }
      );
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant={"ghost"}
          disabled={isPending}
          className="btn btn-primary">
          <Avatar>
            <AvatarImage src={session?.data?.user?.image || ""} />
            <AvatarFallback>
              {getInitials(
                session?.data?.user?.name,
                session?.data?.user?.email
              )}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-red-600">
            Delete account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled={isPending} onClick={handleSignOut}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuGroup></DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
