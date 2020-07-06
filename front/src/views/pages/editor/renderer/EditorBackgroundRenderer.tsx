import React, { useContext } from "react";
import { EnvironmentContext } from "../../../../context/environmentContext";
import { Vector } from "../../../../models/vector";
import { ActionTile, ActionTileType } from "../../../../models/actionTile";
import { ActionTileRenderer } from "./ActionTileRenderer";

/**
 * Grid of action tiles allowing to place tiles
 * @param props
 */
export function EditorBackgroundRenderer(props: {
  onClick: (actionTile: ActionTile) => void;
}) {
  const environmentContext = useContext(EnvironmentContext);
  const { environment } = environmentContext;
  const vectors: Vector[] = [];
  for (let i = 0; i < environment.width; i++) {
    for (let j = 0; j < environment.height; j++) {
      const position = new Vector(i, j);
      vectors.push(position);
    }
  }
  return (
    <>
      {vectors.map((vector, index) => (
        <ActionTileRenderer
          key={index}
          x={vector.x}
          y={vector.y}
          onClick={props.onClick}
          actionTileType={ActionTileType.EMPTY}
        ></ActionTileRenderer>
      ))}
    </>
  );
}
