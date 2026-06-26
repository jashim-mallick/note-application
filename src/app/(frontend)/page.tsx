import ToastButton from "@/components/Buttons/ToastButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifo",
  description:
    "A notes application built with Next.js, TypeScript, Tailwind CSS, and more.",
};

const page = () => {
  return (
    <section className="grid h-dvh place-items-center">
      <div className="space-y-4 text-center">
        <h1 className="text-5xl font-semibold">Notifo</h1>
        <h2 className="text-3xl">
          A notes application built with Next.js, TypeScript, Tailwind CSS, and
          more.
        </h2>

        <ToastButton />
      </div>
    </section>
  );
};

export default page;
