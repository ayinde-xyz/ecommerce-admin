import prismadb from "@/lib/prismadb";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SettingsForm } from "./components/settings-form";
import { headers } from "next/headers";

interface SettingsPageProps {
  params: Promise<{
    storeId: string;
  }>;
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { storeId } = await params;
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/auth/login");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
