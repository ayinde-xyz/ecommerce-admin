import { ResetPasswordForm } from "@/components/auth/reset-password";

interface PageProps {
  searchParams: Promise<{ token: string }>;
}

const ResetPasswordPage = async ({ searchParams }: PageProps) => {
  const { token } = await searchParams;
  return <ResetPasswordForm token={token} />;
};

export default ResetPasswordPage;
