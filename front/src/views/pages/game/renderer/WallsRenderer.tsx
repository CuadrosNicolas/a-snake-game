import { Walls } from "../../../../models/walls";
import React from "react";
import RectRenderer from "../../../../shared/components/RectRenderer";

export interface WallsRendererProps {
  walls: Walls;
}

/**
 * Component use to draws all wall tiles
 * @param props
 */
export default function WallsRenderer(props: WallsRendererProps) {
  return (
    <>
      {props.walls.walls.map((wall, index) => {
        return (
          <RectRenderer color={"black"} x={wall.x} y={wall.y}></RectRenderer>
        );
      })}
    </>
  );
}
