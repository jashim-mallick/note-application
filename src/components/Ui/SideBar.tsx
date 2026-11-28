"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronsUpDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import LogOutButton from "../Buttons/LogOutButton";
import NavItem from "./NavItem";

import { Avatar, AvatarFallback } from "../shadcnui/avatar";
import BookmarkIcon from "../shadcnui/bookmark-icon";
import DashboardGridIcon from "../shadcnui/DashboardGridIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcnui/dropdown-menu";
import { ScrollArea } from "../shadcnui/scroll-area";
import TrashIcon from "../shadcnui/trash-icon";
import UserIcon from "../shadcnui/user-icon";

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
        if (window.innerWidth >= 640) {
          setIsCollapsed(false);
        }
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
                    Items
                  </p>
                )}
              </motion.li>
            </div>

            <div className="flex h-full w-full flex-col">
              <div className="flex grow flex-col gap-4">
                <ScrollArea className="h-20 grow p-2">
                  <div className="flex w-full flex-col gap-1">
                    <NavItem
                      //TODO: workable link will be added later
                      active={pathname?.includes("dashboard") ?? false}
                      label="Dashboard"
                      isCollapsed={isCollapsed}
                      renderIcon={(isHovered) => (
                        <DashboardGridIcon
                          size={20}
                          isHovered={isHovered}
                        />
                      )}
                    />

                    <NavItem
                      //TODO: workable link will be added later
                      active={pathname?.includes("Pinned") ?? false}
                      label="Pinned"
                      isCollapsed={isCollapsed}
                      renderIcon={(isHovered) => (
                        <BookmarkIcon
                          size={20}
                          isHovered={isHovered}
                        />
                      )}
                    />

                    <NavItem
                      //TODO: workable link will be added later
                      active={pathname?.includes("Trash") ?? false}
                      label="Trash"
                      isCollapsed={isCollapsed}
                      renderIcon={(isHover) => (
                        <TrashIcon
                          size={20}
                          isHover={isHover}
                          shakeOnClick
                        />
                      )}
                    />

                    <NavItem
                      //TODO: workable link will be added later
                      active={pathname?.includes("profile") ?? false}
                      label="Profile"
                      isCollapsed={isCollapsed}
                      renderIcon={(isHovered) => (
                        <UserIcon
                          size={20}
                          isHovered={isHovered}
                        />
                      )}
                    />
                  </div>
                </ScrollArea>
              </div>

              <div className="flex flex-col p-2">
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

                  <DropdownMenuContent
                    sideOffset={8}
                    align="start"
                    className="border-sidebar-border bg-sidebar text-sidebar-foreground w-64 rounded-xl border p-2 shadow-xl">
                    <div className="flex items-center gap-3 p-2">
                      <Avatar className="size-9">
                        <AvatarFallback>Jz</AvatarFallback>
                      </Avatar>

                      <div className="flex min-w-0 flex-col">
                        <span className="text-sm font-semibold">Jaz</span>
                        <span className="text-muted-foreground truncate text-xs">
                          jaz@example.com
                        </span>
                      </div>
                    </div>

                    <DropdownMenuSeparator className="bg-sidebar-border" />

                    <DropdownMenuItem className="focus:bg-muted focus:text-sidebar-foreground cursor-pointer gap-2 rounded-md px-3 py-2 text-sm">
                      <UserIcon size={18} />
                      Profile
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-sidebar-border" />

                    <DropdownMenuItem className="cursor-pointer rounded-md p-0 focus:bg-transparent">
                      <LogOutButton />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </motion.ul>
      </motion.div>
    </motion.div>
  );
};
