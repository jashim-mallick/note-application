import { motion } from "motion/react";
import { AnimatedIconProps } from "./types";

const DashboardGridIcon = ({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  isHovered = false,
}: AnimatedIconProps) => {
  const squares = [
    { x: 3, y: 3, initialX: -1.5, initialY: -1.5 },
    { x: 13, y: 3, initialX: 1.5, initialY: -1.5 },
    { x: 3, y: 13, initialX: -1.5, initialY: 1.5 },
    { x: 13, y: 13, initialX: 1.5, initialY: 1.5 },
  ];

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ display: "block", flexShrink: 0 }}>
      {squares.map((square, index) => (
        <motion.rect
          key={index}
          x={square.x}
          y={square.y}
          width="8"
          height="8"
          rx="1"
          initial={{
            x: square.initialX,
            y: square.initialY,
            opacity: 0.85,
          }}
          animate={{
            x: isHovered ? 0 : square.initialX,
            y: isHovered ? 0 : square.initialY,
            opacity: isHovered ? 1 : 0.85,
          }}
          transition={{
            duration: isHovered ? 0.3 : 0.25,
            ease: "easeOut",
            delay: isHovered ? index * 0.05 : 0,
          }}
        />
      ))}
    </motion.svg>
  );
};

export default DashboardGridIcon;
