import {
  placeable,
  PlaceableProps,
} from "../../../../shared/components/placeable";
import { Vector } from "../../../../models/vector";
import React, { useContext, useState } from "react";
import { EnvironmentContext } from "../../../../context/environmentContext";
import { ActionTileType, ActionTile } from "../../../../models/actionTile";
import { Environment } from "../../../../models/environment";
import RectRenderer from "../../../../shared/components/RectRenderer";

export interface ActionTileProps extends PlaceableProps {
  actionTileType: ActionTileType;
  onClick: (actionTile: ActionTile) => void;
  color?: string;
}
/**
 * Component allowing to detect click on the editor grid
 */
export const ActionTileRenderer = placeable((props: ActionTileProps) => {
  const environmentContext = useContext(EnvironmentContext);
  const { environment } = environmentContext;
  const [stroke, setStroke] = useState(false);
  return environment.outOfBoundaries(new Vector(props.x, props.y)) ? null : (
    <RectRenderer
      x={0}
      y={0}
      padding={0.1}
      strokeWidth={stroke ? 0.05 * Environment.tileSize : 0}
      strokeColor={"rgb(255,0,0)"}
      color={props.color}
      onClick={() =>
        props.onClick(
          new ActionTile(new Vector(props.x, props.y), props.actionTileType)
        )
      }
      onMouseEnter={() => setStroke(true)}
      onMouseLeave={() => setStroke(false)}
    ></RectRenderer>
  );
});
