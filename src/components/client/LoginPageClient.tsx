"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import UserLogIn from "../Forms/UserLogIn";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../shadcnui/card";
import { TextAnimate } from "../shadcnui/text-animate";

const LoginPageClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("loggedOut") === "true") {
      toast.success("Logged out successfully 👋");

      const params = new URLSearchParams(searchParams.toString());
      params.delete("loggedOut");
      router.replace(`/auth/login?${params.toString()}`);
    }
  }, [searchParams, router]);

  return (
    <section className="flex min-h-[89dvh] items-center justify-center">
      <Card className="w-full max-w-md rounded-2xl border border-white/20 shadow-lg backdrop-blur-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-center text-2xl font-bold sm:text-3xl">
            LogIn
          </CardTitle>

          <CardDescription className="text-center text-sm leading-5 sm:text-base">
            Welcome back to{" "}
            <span>
              <TextAnimate
                animation="blurInUp"
                by="character"
                duration={2}
                className="text-primary font-medium">
                Notifo
              </TextAnimate>
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent className="px-4 sm:px-6">
          <UserLogIn />
        </CardContent>

        <CardFooter className="flex flex-wrap justify-center gap-1 px-4 pb-6 text-sm sm:text-base">
          New to Notifo?
          <Link
            href="/auth/register"
            className="text-primary ml-1 font-medium">
            Register
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
};

export default LoginPageClient;
