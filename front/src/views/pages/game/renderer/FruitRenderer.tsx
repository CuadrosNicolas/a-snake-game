import React from "react";
import { PlaceableProps } from "../../../../shared/components/placeable";
import RectRenderer from "../../../../shared/components/RectRenderer";

/**
 * Line representing a fruit
 */
export default function Fruit(props: PlaceableProps) {
  return <RectRenderer color={"pink"} x={props.x} y={props.y}></RectRenderer>;
}
