"use client";
import { signOut } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { useState } from "react";

export const SignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await signOut();
    } catch (err) {
      setError("An unexpected error occurred during sign-out");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
    redirect("/login");
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleSignOut}
        disabled={isLoading}
        className="btn btn-primary">
        {isLoading ? "Signing out..." : "Sign out"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};
