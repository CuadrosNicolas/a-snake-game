import { PlaceableProps } from "../../../../shared/components/placeable";
import React from "react";
import RectRenderer from "../../../../shared/components/RectRenderer";

/**
 * Simple player tile
 */
function PlayerPreviewRenderer(props: PlaceableProps) {
  return <RectRenderer x={props.x} y={props.y} color={"green"}></RectRenderer>;
}

export default PlayerPreviewRenderer;
