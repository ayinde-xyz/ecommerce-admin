"use client";
import { deleteUser, signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export const SignOut = () => {
  const session = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDeleteAccount = async () => {
    await deleteUser({
      callbackURL: "/auth/delete/success",
      fetchOptions: {
        onRequest: () => {
          setIsDeleting(true);
          toast.loading("Deleting account...");
        },
        onError: (error) => {
          setIsDeleting(false);
          toast.dismiss();
          toast.error(`Error deleting account: ${error.error.message}`);
        },
        onSuccess: () => {
          setIsDeleting(false);
          toast.dismiss();
          toast.success("Check your email to confirm account deletion.");
        },
      },
    });
  };

  const handleSignOut = async () => {
    startTransition(async () => {
      await signOut({
        fetchOptions: {
          onRequest: () => {
            toast.loading("Signing out...");
          },
          onError: (error) => {
            toast.dismiss();
            toast.error(`Error signing out: ${error.error.message}`);
          },
          onSuccess: () => {
            toast.dismiss();
            toast.success("Signed out successfully!");
            router.replace("/auth/login");
          },
        },
      });
    });
  };

  return (
    <>
      {/* <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogTrigger asChild>
          <DropdownMenuItem className="text-red-600">
            Delete account
          </DropdownMenuItem>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex gap-2">
            <AlertDialogCancel asChild>
              <Button disabled={isDeleting} variant="outline">
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button disabled={isDeleting} variant="destructive">
                Continue
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
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
        <DropdownMenuContent align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                setIsAlertOpen(false);
                handleDeleteAccount();
              }}
              className="text-red-600">
              Delete account
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem disabled={isPending} onClick={handleSignOut}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
