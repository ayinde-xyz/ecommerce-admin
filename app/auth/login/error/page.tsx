interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const error = (await searchParams).error;
  return (
    <>
      <h2 className="text-center font-semibold text-2xl">Login Error</h2>

      <p className="text-center text-sm text-muted-foreground">
        {error === "account_not_linked"
          ? "This account is already linked to another sign-in method."
          : "Oops! Something went wrong. Please try again."}
      </p>

      <p>
        <a href="/auth/login" className="underline hover:text-primary">
          Return to Login
        </a>
      </p>
    </>
  );
}
