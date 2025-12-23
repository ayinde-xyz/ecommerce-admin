export default async function Page() {
  return (
    <>
      <h2 className="text-center font-semibold text-2xl">
        You have successfully registered, Kindly check your email for
        verification.
      </h2>

      <p className="text-center text-sm text-muted-foreground">
        If you do not see the email, please check your spam or junk folder.
      </p>

      <p>
        <a href="/auth/login" className="underline hover:text-primary">
          Return to Login
        </a>
      </p>
    </>
  );
}
