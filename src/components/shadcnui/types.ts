import type { SVGProps } from "react";

export interface AnimatedIconProps extends Omit<
  SVGProps<SVGSVGElement>,
  | "ref"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onDrag"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragExit"
  | "onDragLeave"
  | "onDragOver"
  | "onDragStart"
  | "onDrop"
  | "values"
> {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  className?: string;
  isHovered?: boolean;
}

export interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

export function scaledStrokeWidth(
  strokeWidth: number,
  viewBoxSize: number,
): number {
  return strokeWidth * (viewBoxSize / 24);
}
