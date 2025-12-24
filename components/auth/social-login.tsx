import { signIn } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { toast } from "sonner";
import { APIError } from "better-auth";
import { FaGoogle } from "react-icons/fa";
import { FaAppleAlt } from "react-icons/fa";

type Props = {
  isPending: boolean;
};

export const SocialLogin = ({ isPending }: Props) => {
  const handleLogin = async (provider: "apple" | "google") => {
    try {
      toast.loading("Signing in...");
      const result = await signIn.social({
        provider,
        callbackURL: "/dashboard/[storeId]",
      });

      if (result.error) {
        toast.dismiss();
        toast.error(result.error.message || "Something went wrong");
      }

      toast.dismiss();
      toast.success("Signed in successfully!");
    } catch (err) {
      if (err instanceof APIError) {
        toast.error(err.message);
      }

      toast.error("Something went wrong");
    }
  };
  return (
    <Field>
      <Button
        variant="outline"
        type="button"
        disabled={isPending}
        onClick={() => handleLogin("apple")}>
        <FaAppleAlt />
        Login with Apple
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={isPending}
        onClick={() => handleLogin("google")}>
        <FaGoogle /> {"   "}
        Login with Google
      </Button>
    </Field>
  );
};
