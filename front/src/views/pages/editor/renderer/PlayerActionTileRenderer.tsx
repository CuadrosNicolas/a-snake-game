import { Player } from "../../../../models/player";
import { ActionTileRenderer } from "./ActionTileRenderer";
import React from "react";
import { ActionTileType, ActionTile } from "../../../../models/actionTile";

export interface PlayerActionTileProps {
  player: Player;
  onClick: (actionTile: ActionTile) => void;
}

/**
 * Action tile representing a player
 * @param props
 */
export function PlayerActionTileRenderer(props: PlayerActionTileProps) {
  return (
    <>
      {props.player.head() ? (
        <ActionTileRenderer
          onClick={props.onClick}
          actionTileType={ActionTileType.PLAYER}
          x={props.player.head().x}
          y={props.player.head().y}
          color={"green"}
        ></ActionTileRenderer>
      ) : null}
    </>
  );
}
