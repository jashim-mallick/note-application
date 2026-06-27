import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WhiteDwarf | Dashboard",
  description: "A beautiful wallpaper Application",
};

const page = async () => {
  return (
    <section className="px-6 py-6">
      <div className="mx-auto w-full max-w-6xl columns-1 sm:columns-2 md:columns-3 lg:columns-4">
        studio
      </div>
    </section>
  );
};

export default page;
