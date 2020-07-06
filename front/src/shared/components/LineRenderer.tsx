import React from "react";

export interface LineRendererProps {
  xBegin: number;
  yBegin: number;
  xEnd: number;
  yEnd: number;
  color: string;
  strokeWidth: number;
}

/**
 * Simple svg line
 * @param props
 */
export function LineRenderer(props: LineRendererProps) {
  const { xBegin, yBegin, xEnd, yEnd, color, strokeWidth } = props;
  return (
    <line
      x1={xBegin}
      y1={yBegin}
      x2={xEnd}
      y2={yEnd}
      style={{
        stroke: color,
        strokeWidth: strokeWidth,
      }}
    />
  );
}
