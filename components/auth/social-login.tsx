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
    toast.loading("Redirecting to provider...");
    const result = await signIn.social({
      provider,
      callbackURL: "/dashboard/[storeId]",
      errorCallbackURL: "/auth/login/error",
    });

    console.log("Google sign in result", result.error, result.data);

    // if (result.error) {
    //   toast.dismiss();
    //   toast.error(result.error.message || "Something went wrong");
    // } else {
    //   toast.dismiss();
    //   toast.success("Login successful");
    // }
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
