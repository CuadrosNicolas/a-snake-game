import { Vector } from "./vector";

export enum ActionTileType {
  WALL,
  PLAYER,
  EMPTY
}

/**
 * Tile model for the editor
 */
export class ActionTile {
  constructor(public source: Vector,public actionTileType:ActionTileType) {

  }
}