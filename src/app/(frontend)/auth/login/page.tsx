import LoginPageClient from "@/components/client/LoginPageClient";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "LogIn | Notifo",
  description: "LogIn page of Notifo",
};

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[89dvh] items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      }>
      <LoginPageClient />
    </Suspense>
  );
};

export default page;
