import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifo | Dashboard",
  description: "Dashboard of Notifo notes application",
};

const page = () => {
  return (
    <section className="px-6 py-6">
      <div className="mx-auto w-full max-w-6xl columns-1 sm:columns-2 md:columns-3 lg:columns-4">
        studio
      </div>
    </section>
  );
};

export default page;
