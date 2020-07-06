import { useContext } from "react";
import { EnvironmentContext } from "../../context/environmentContext";
import React from "react";
import { Environment } from "../../models/environment";

export interface SvgCanvasProps {
  children: any;
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Svg wrapper use to contain the game grid
 * @param props
 */
export function SvgCanvas(props: SvgCanvasProps) {
  const { environment } = useContext(EnvironmentContext);
  return (
    <svg
      className={props.className}
      viewBox={`
        -${Environment.tileSize}
        -${Environment.tileSize}
        ${
          Environment.tileSize * (props.width || environment.width) +
          2 * Environment.tileSize
        }
        ${
          Environment.tileSize * (props.height || environment.height) +
          2 * Environment.tileSize
        }`}
      height="100%"
      width="100%"
    >
      {props.children}
    </svg>
  );
}
