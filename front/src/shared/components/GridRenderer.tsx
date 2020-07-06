import React from "react";
import { LineRenderer } from "./LineRenderer";
import { Environment } from "../../models/environment";

export interface GridRendererProps {
  width: number;
  height: number;
}
/**
 * Svg grid with a widht and height
 * Uses React.useMemo to optimize rendering
 * @param props
 */
export default function GridRenderer(props: GridRendererProps) {
  return React.useMemo(() => {
    return (
      <>
        {Array.from(Array(props.width + 1).keys()).map((_, index) => {
          return (
            <LineRenderer
              key={index}
              xBegin={index * Environment.tileSize}
              xEnd={index * Environment.tileSize}
              yBegin={0}
              yEnd={Environment.tileSize * props.height}
              color="rgb(0,125,12)"
              strokeWidth={Environment.tileSize * 0.01}
            ></LineRenderer>
          );
        })}
        {Array.from(Array(props.height + 1).keys()).map((_, index) => {
          return (
            <LineRenderer
              key={index}
              yBegin={index * Environment.tileSize}
              yEnd={index * Environment.tileSize}
              xBegin={0}
              xEnd={Environment.tileSize * props.width}
              color="rgb(0,125,12)"
              strokeWidth={Environment.tileSize * 0.01}
            ></LineRenderer>
          );
        })}
      </>
    );
  }, [props.width, props.height]);
}
