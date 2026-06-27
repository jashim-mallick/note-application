"use client";

import Link from "next/link";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";

const PublicHeader = () => {
  return (
    <header
      className="sticky top-0 z-50 border-b bg-black/30 text-white shadow backdrop-blur-md"
      aria-label="app-header">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <Link
          className="flex items-center gap-2"
          href={"/"}>
          <h1
            className="text-primary text-2xl font-semibold dark:text-white"
            aria-label="App Name">
            Notifo
          </h1>
        </Link>

        <nav className="hidden items-center gap-4 text-xl sm:flex">
          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
};

export default PublicHeader;
