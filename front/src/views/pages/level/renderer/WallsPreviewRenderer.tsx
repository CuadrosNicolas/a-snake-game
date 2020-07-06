import React from "react";
import { Vector } from "../../../../models/vector";
import RectRenderer from "../../../../shared/components/RectRenderer";

export interface WallsActionTileRendererProps {
  walls: Vector[];
}

/**
 * game walls previews
 * @param props
 */
export default function WallsPreviewRenderer(
  props: WallsActionTileRendererProps
) {
  return (
    <>
      {props.walls.map((wall) => {
        return (
          <RectRenderer x={wall.x} y={wall.y} color={"black"}></RectRenderer>
        );
      })}
    </>
  );
}
