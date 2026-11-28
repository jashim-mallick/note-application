"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

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

type NavItemProps = {
  active: boolean;
  label: string;
  isCollapsed: boolean;
  renderIcon: (isHovered: boolean) => React.ReactNode;
};

const NavItem = ({ active, label, isCollapsed, renderIcon }: NavItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const iconSlot = "flex size-5 shrink-0 items-center justify-center";

  const navItemClass = cn(
    "flex h-8 w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition",
    active ?
      "bg-muted text-blue-600"
    : "text-muted-foreground hover:bg-muted hover:text-primary",
  );

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={navItemClass}>
      <div className={iconSlot}>{renderIcon(isHovered)}</div>

      {!isCollapsed && (
        <motion.li variants={variants}>
          <p className="ml-2 text-sm font-medium">{label}</p>
        </motion.li>
      )}
    </div>
  );
};

export default NavItem;
