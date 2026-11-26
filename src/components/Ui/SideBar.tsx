"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ChevronsUpDown,
  LayoutDashboard,
  LogOut,
  UserCircle,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarFallback } from "../shadcnui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcnui/dropdown-menu";
import { ScrollArea } from "../shadcnui/scroll-area";
import TrashIcon from "../shadcnui/trash-icon";

const sidebarVariants = {
  open: { width: "15rem" },
  closed: { width: "3.05rem" },
};

const contentVariants = {
  open: { display: "block", opacity: 1 },
  closed: { display: "block", opacity: 1 },
};

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: { x: { stiffness: 1000, velocity: -100 } },
  },
  closed: {
    x: -20,
    opacity: 0,
    transition: { x: { stiffness: 100 } },
  },
};

const transitionProps = {
  type: "tween" as const,
  ease: "easeOut" as const,
  duration: 0.2,
  staggerChildren: 0.1,
};

const staggerVariants = {
  open: {
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
};

export const SessionNavBar = ({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}) => {
  const [accountOpen, setAccountOpen] = useState(false);
  const pathname = usePathname();

  const navItemClass = (active: boolean) =>
    cn(
      "flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition",
      active ?
        "bg-muted text-blue-600"
      : "text-muted-foreground hover:bg-muted hover:text-primary",
    );

  return (
    <motion.div
      className={cn(
        "sidebar border-sidebar-border fixed left-0 z-40 h-screen shrink-0 border-r transition-transform sm:relative sm:block",
        isCollapsed ? "-translate-x-full sm:translate-x-0" : "translate-x-0",
      )}
      initial={isCollapsed ? "closed" : "open"}
      animate={isCollapsed ? "closed" : "open"}
      variants={sidebarVariants}
      transition={transitionProps}
      onMouseEnter={() => {
        if (window.innerWidth >= 640) setIsCollapsed(false);
      }}
      onMouseLeave={() => {
        if (window.innerWidth >= 640) {
          setIsCollapsed(true);
          setAccountOpen(false);
        }
      }}>
      <motion.div
        className="text-muted-foreground bg-sidebar relative z-40 flex h-full shrink-0 flex-col transition-all"
        variants={contentVariants}>
        <motion.ul
          variants={staggerVariants}
          className="flex h-full flex-col">
          <div className="flex grow flex-col items-center">
            <div className="flex h-14.25 w-full shrink-0 items-center border-b p-2">
              <div className="flex w-full items-center justify-center gap-2 px-2">
                <Avatar className="primary size-6 rounded">
                  <AvatarFallback className="secoundary text-xs text-white">
                    N
                  </AvatarFallback>
                </Avatar>
                <motion.li
                  variants={variants}
                  className="flex items-center gap-2">
                  {!isCollapsed && (
                    <div className="flex flex-col leading-none">
                      <p className="text-foreground text-sm font-semibold">
                        Notifo
                      </p>
                    </div>
                  )}
                </motion.li>
              </div>
            </div>

            <div className="w-full px-4 pt-4 pb-1">
              <motion.li variants={variants}>
                {!isCollapsed && (
                  <p className="text-muted-foreground/60 text-xs font-medium tracking-wider uppercase">
                    Pinned
                  </p>
                )}
              </motion.li>
            </div>

            <div className="flex h-full w-full flex-col">
              <div className="flex grow flex-col gap-4">
                <ScrollArea className="h-16 grow p-2">
                  <div className={cn("flex w-full flex-col gap-1")}>
                    <div
                      className={navItemClass(pathname?.includes("dashboard"))}>
                      <LayoutDashboard className="h-4 w-4" />
                      <motion.li variants={variants}>
                        {!isCollapsed && (
                          <p className="ml-2 text-sm font-medium">Dashboard</p>
                        )}
                      </motion.li>
                    </div>

                    <div className={navItemClass(pathname?.includes("Trash"))}>
                      <TrashIcon size={40} />
                      <motion.li variants={variants}>
                        {!isCollapsed && (
                          <p className="ml-2 text-sm font-medium">Trash</p>
                        )}
                      </motion.li>
                    </div>

                    <div
                      className={navItemClass(pathname?.includes("profile"))}>
                      <UserCircle className="h-4 w-4" />
                      <motion.li variants={variants}>
                        {!isCollapsed && (
                          <p className="ml-2 text-sm font-medium">Profile</p>
                        )}
                      </motion.li>
                    </div>
                  </div>
                </ScrollArea>
              </div>

              <div className="flex flex-col p-2">
                <div>
                  <DropdownMenu
                    open={accountOpen}
                    onOpenChange={setAccountOpen}>
                    <DropdownMenuTrigger className="hover:bg-muted hover:text-primary flex h-8 w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition">
                      <Avatar className="size-4">
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      <motion.span
                        variants={variants}
                        className="flex w-full items-center gap-2">
                        {!isCollapsed && (
                          <>
                            <p className="text-sm font-medium">Account</p>
                            <ChevronsUpDown className="text-muted-foreground/50 ml-auto h-4 w-4" />
                          </>
                        )}
                      </motion.span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={5}>
                      <div className="flex flex-row items-center gap-2 p-2">
                        <Avatar className="size-6">
                          <AvatarFallback>Jz</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-left">
                          <span className="text-sm font-medium">Jaz</span>
                          <span className="text-muted-foreground line-clamp-1 text-xs">
                            jaz@example.com
                          </span>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center gap-2">
                        <UserCircle className="h-4 w-4" /> Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <LogOut className="h-4 w-4" /> Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </motion.ul>
      </motion.div>
    </motion.div>
  );
};
