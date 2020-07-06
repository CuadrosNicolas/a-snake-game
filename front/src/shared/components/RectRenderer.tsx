import { PlaceableProps, placeable } from "./placeable";
import React from "react";
import { Environment } from "../../models/environment";

export interface RectRendererProps extends PlaceableProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  color?: string;
  strokeColor?: string;
  strokeWidth?: number;
  padding?: number; // padding between 0 and 1
}

const emptyCallback = () => {};
/**
 * Rectangle renderer which can behave like a button
 * @param props
 */
function RectRenderer(props: RectRendererProps) {
  const padding = props.padding || 0;
  return (
    <rect
      x={(padding / 2) * Environment.tileSize}
      y={(padding / 2) * Environment.tileSize}
      height={Environment.tileSize - Environment.tileSize * padding}
      width={Environment.tileSize - Environment.tileSize * padding}
      onMouseEnter={props.onMouseEnter || emptyCallback}
      onMouseLeave={props.onMouseLeave || emptyCallback}
      onClick={props.onClick || emptyCallback}
      style={{
        fill: props.color || "white",
        strokeWidth: props.strokeWidth || 0,
        stroke: props.strokeColor || "rgb(255,0,0)",
      }}
    ></rect>
  );
}

export default placeable(RectRenderer);
