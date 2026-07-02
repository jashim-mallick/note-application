import PrivateHeader from "@/components/Header/PrivateHeader";

type StudioLayoutProps = {
  children: React.ReactNode;
};

const StudioLayout = ({ children }: StudioLayoutProps) => {
  return (
    <div className="relative min-h-screen">
      <PrivateHeader />

      <main className="mx-auto max-w-7xl px-1 py-3 sm:px-3 md:px-6">
        {children}
      </main>
    </div>
  );
};

export default StudioLayout;
