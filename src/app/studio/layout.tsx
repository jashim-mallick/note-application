import { AppShell } from "@/components/AppLayout/AppShell";
import { auth } from "@/lib/betterAuth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type StudioLayoutProps = {
  children: React.ReactNode;
};

const StudioLayout = async ({ children }: StudioLayoutProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  return <AppShell>{children}</AppShell>;
};

export default StudioLayout;
