import Link from "next/link";
import LogOutButton from "../Buttons/LogOutButton";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";
import PrivateDrawer from "../Drawer/PrivateDrawer";

const PrivateHeader = () => {
  return (
    <header
      className="sticky top-0 z-50 border-b bg-black/30 text-white shadow backdrop-blur-md"
      aria-label="app-header">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <Link
          className="flex items-center gap-2"
          href={"/studio"}>
          <h1
            className="text-2xl font-semibold"
            aria-label="App Name">
            notifo
          </h1>
        </Link>

        <nav className="hidden items-center gap-4 sm:flex">
          <ThemeToggleButton />
          <LogOutButton />
        </nav>

        <div className="sm:hidden">
          <PrivateDrawer />
        </div>
      </div>
    </header>
  );
};

export default PrivateHeader;
