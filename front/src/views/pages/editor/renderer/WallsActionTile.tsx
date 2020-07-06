import { Walls } from "../../../../models/walls";
import React from "react";
import { ActionTileRenderer } from "./ActionTileRenderer";
import { ActionTileType, ActionTile } from "../../../../models/actionTile";

export interface WallsActionTileRendererProps {
  walls: Walls;
  onClick: (actionTile: ActionTile) => void;
}

/**
 * Action tile representing all the walls of a level
 * @param props
 */
export default function WallsActionTileRenderer(
  props: WallsActionTileRendererProps
) {
  return (
    <>
      {props.walls.walls.map((wall, index) => {
        return (
          <ActionTileRenderer
            key={index}
            x={wall.x}
            y={wall.y}
            color={"black"}
            onClick={props.onClick}
            actionTileType={ActionTileType.WALL}
          ></ActionTileRenderer>
        );
      })}
    </>
  );
}
