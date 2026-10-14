"use client";

import { HomeIcon, LayoutDashboardIcon, Menu, PenLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LogOutButton from "../Buttons/LogOutButton";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../shadcnui/sheet";

const PrivateDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
          aria-label="Open menu">
          <Menu
            className="size-6"
            strokeWidth={2}
          />
        </button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="grid place-items-center px-2 pt-6">
        <SheetTitle className="hidden">User Menu</SheetTitle>

        <div className="flex flex-col gap-6 px-4">
          {/* Profile Section — TODO: Add profile page */}
          <div className="flex flex-col items-center gap-3 pt-4">
            <SheetClose asChild>
              <Link href="/">
                <div className="relative h-[96px] w-[96px] rounded-full ring-2">
                  <Image
                    src="/profile.png"
                    alt="avatar"
                    width={90}
                    height={90}
                    className="h-full w-full rounded-full object-cover"
                  />
                  <span className="absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full bg-white text-black shadow">
                    <PenLine size={14} />
                  </span>
                </div>
              </Link>
            </SheetClose>
            <span className="text-lg font-semibold">name</span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-center">
              <ThemeToggleButton />
            </div>

            <div className="bg-border h-px" />

            <SheetClose asChild>
              <Link
                href="/"
                className="hover:bg-muted flex items-center gap-3 rounded-md px-2 py-2">
                <HomeIcon size={18} />
                <span>Home</span>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                href="/studio"
                className="hover:bg-muted flex items-center gap-3 rounded-md px-2 py-2">
                <LayoutDashboardIcon size={18} />
                <span>Dashboard</span>
              </Link>
            </SheetClose>

            {/* TODO: Add create page route */}
            <SheetClose asChild>
              <Link
                href="/"
                className="hover:bg-muted flex items-center gap-3 rounded-md px-2 py-2">
                <LayoutDashboardIcon size={18} />
                <span>Create</span>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <LogOutButton />
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PrivateDrawer;
