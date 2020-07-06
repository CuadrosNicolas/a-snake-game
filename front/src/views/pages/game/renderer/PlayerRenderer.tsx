import React from "react";
import { Player } from "../../../../models/player";
import {
  Vector,
} from "../../../../models/vector";
import RectRenderer from "../../../../shared/components/RectRenderer";


export interface PlayerProps {
  player: Player;
  direction: Vector;
}

/**
 * Component use to render a player
 * @param props
 */
export default function PlayerRenderer(props: PlayerProps) {
  return (
    <>
      {props.player.parts.map((part: Vector) => {
        return (
          <RectRenderer x={part.x} y={part.y} color={"green"}></RectRenderer>
        );
      })}
    </>
  );
}
