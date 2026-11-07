import { LogIn, Menu, UserRoundPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";
import { Button } from "../shadcnui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../shadcnui/sheet";

const PublicDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="inline-flex items-center justify-center rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
          aria-label="Open menu">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="px-4 pt-6">
        <SheetTitle className="hidden">Menu</SheetTitle>

        <div className="flex flex-col gap-6 px-4">
          {/* Guest avatar — no edit, no profile link */}
          <div className="flex flex-col items-center gap-3 pt-4">
            <div className="h-[96px] w-[96px] rounded-full ring-2">
              <Image
                src="/profile.png"
                alt="guest avatar"
                width={90}
                height={90}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <span className="text-muted-foreground text-sm">Guest</span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-center">
              <ThemeToggleButton />
            </div>

            <div className="bg-border h-px" />

            <SheetClose asChild>
              <Link
                href="/auth/register"
                className="hover:bg-muted flex items-center gap-3 rounded-md px-2 py-2">
                <UserRoundPlus size={18} />
                <span>Register</span>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                href="/auth/login"
                className="hover:bg-muted flex items-center gap-3 rounded-md px-2 py-2">
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PublicDrawer;
