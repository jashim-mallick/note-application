import { motion, useAnimate } from "motion/react";
import { forwardRef, useEffect } from "react";
import type { AnimatedIconProps } from "./types";
import { scaledStrokeWidth } from "./types";

const BookmarkIcon = forwardRef<SVGSVGElement, AnimatedIconProps>(
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
        ".bookmark-body",
        isHovered ? { scaleY: 0.9, y: 2 } : { scaleY: 1, y: 0 },
        {
          duration: 0.18,
          ease: isHovered ? "easeOut" : "easeInOut",
        },
      );
    }, [isHovered, animate]);

    return (
      <div
        ref={scope}
        className={`inline-flex ${className}`}>
        <svg
          ref={ref}
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          stroke={color}
          strokeWidth={scaledStrokeWidth(Number(strokeWidth), 40)}
          strokeMiterlimit="10"
          strokeLinecap="square">
          <motion.path
            className="bookmark-body"
            style={{ transformOrigin: "50% 20%" }}
            d="M24 34L41 44V8C41 5.23858 38.7614 3 36 3H12C9.23858 3 7 5.23858 7 8V44L24 34Z"
          />
        </svg>
      </div>
    );
  },
);

BookmarkIcon.displayName = "BookmarkIcon";

export default BookmarkIcon;
