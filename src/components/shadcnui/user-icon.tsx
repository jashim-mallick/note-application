import { motion, useAnimate } from "motion/react";
import { forwardRef, useEffect } from "react";
import type { AnimatedIconProps } from "./types";

const UserIcon = forwardRef<SVGSVGElement, AnimatedIconProps>(
  (
    {
      size = 20,
      color = "currentColor",
      strokeWidth = 2,
      className = "",
      isHovered = false,
    },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    useEffect(() => {
      animate(
        ".user-avatar",
        isHovered ? { scale: 1.05, y: -1 } : { scale: 1, y: 0 },
        {
          duration: 0.25,
          ease: "easeOut",
        },
      );
    }, [isHovered, animate]);

    return (
      <div
        ref={scope}
        className="inline-flex">
        <motion.svg
          ref={ref}
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}>
          <path
            stroke="none"
            d="M0 0h24v24H0z"
            fill="none"
          />

          <motion.g
            className="user-avatar"
            style={{ transformOrigin: "50% 50%" }}>
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </motion.g>
        </motion.svg>
      </div>
    );
  },
);

UserIcon.displayName = "UserIcon";

export default UserIcon;
