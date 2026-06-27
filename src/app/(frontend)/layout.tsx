import PublicHeader from "@/components/Header/PublicHeader";

type FrontendLayoutProps = {
  children: React.ReactNode;
};

const FrontendLayout = ({ children }: FrontendLayoutProps) => {
  return (
    <div className="relative min-h-screen">
      <PublicHeader />

      <main className="mx-auto max-w-7xl px-1 py-3 sm:px-3 md:px-6">
        {children}
      </main>
    </div>
  );
};

export default FrontendLayout;
