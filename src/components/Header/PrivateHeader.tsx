import { Menu } from "lucide-react";
import Link from "next/link";
import LogOutButton from "../Buttons/LogOutButton";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";
import { Button } from "../shadcnui/button";

interface PrivateHeaderProps {
  onMenuClick: () => void;
}

const PrivateHeader = ({ onMenuClick }: PrivateHeaderProps) => {
  return (
    <header
      className="sticky top-0 z-50 border-b bg-black/30 text-white shadow backdrop-blur-md"
      aria-label="app-header">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          {/* Hamburger menu for mobile */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="text-white hover:bg-white/20 md:hidden"
            aria-label="Toggle sidebar">
            <Menu className="size-5" />
          </Button>

          <Link
            className="flex items-center gap-2"
            href={"/studio"}>
            <h1
              className="text-2xl font-semibold"
              aria-label="App Name">
              notifo
            </h1>
          </Link>
        </div>

        <nav className="hidden items-center gap-4 sm:flex">
          <ThemeToggleButton />
          <LogOutButton />
        </nav>
      </div>
    </header>
  );
};

export default PrivateHeader;
