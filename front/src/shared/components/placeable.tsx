import React from "react";
import { Environment } from "../../models/environment";
export interface PlaceableProps {
  x: number;
  y: number;
  rotate?: number;
}

/**
 * Utils wrapper allowing to convert discrete 2D position
 * to the continuous ones
 * @param ChildComponent
 */
export function placeable<P extends PlaceableProps>(
  ChildComponent: React.ComponentType<P>
) {
  return function (props: P) {
    return (
      <g
        transform={`translate(${props.x * Environment.tileSize},${
          props.y * Environment.tileSize
        })
        rotate(${props.rotate || 0} ${Environment.tileSize / 2} ${
          Environment.tileSize / 2
        })`}
      >
        <ChildComponent {...props}></ChildComponent>
      </g>
    );
  };
}
