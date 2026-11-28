import { motion } from "motion/react";
import { useCallback } from "react";
import type { AnimatedIconProps } from "./types";

export interface TrashIconProps extends AnimatedIconProps {
  shakeOnClick?: boolean;
  dangerHover?: boolean;
  keepOpenOnDelete?: boolean;
  isHover?: boolean;
}

const TrashIcon = ({
  shakeOnClick = false,
  dangerHover = false,
  keepOpenOnDelete = false,
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  isHover = false,
}: TrashIconProps) => {
  const clickAnimation = useCallback(() => {}, []);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={isHover && dangerHover ? "#ef4444" : color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ display: "block", flexShrink: 0 }}
      animate={{
        x: 0,
      }}
      whileTap={shakeOnClick ? { x: [0, -2, 2, -1, 0] } : undefined}
      transition={{ duration: 0.2 }}
      onTap={clickAnimation}>
      <path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
      />

      <motion.path
        d="M4 7l16 0"
        className="trash-lid-lower"
        style={{ transformOrigin: "50% 100%" }}
        animate={{
          rotate: isHover || keepOpenOnDelete ? -25 : 0,
          y: isHover || keepOpenOnDelete ? -4 : 0,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />

      <path d="M10 11l0 6" />
      <path d="M14 11l0 6" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />

      <motion.path
        d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"
        className="trash-lid-upper"
        style={{ transformOrigin: "50% 100%" }}
        animate={{
          rotate: isHover || keepOpenOnDelete ? -35 : 0,
          y: isHover || keepOpenOnDelete ? -6 : 0,
          x: isHover || keepOpenOnDelete ? -2 : 0,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </motion.svg>
  );
};

export default TrashIcon;
