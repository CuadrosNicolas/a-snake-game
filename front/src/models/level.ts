import { Vector } from "./vector";
import { GameMode, GameDifficulty } from "./environment";
import { PlayerResult } from "./playerResult";

/**
 * Model representing a level
 */
export  class Level {
  constructor(public width: number,
    public height: number,
    public player: Vector,
    public walls: Vector[],
    public refreshRate: GameDifficulty = GameDifficulty.EASY,
    public gameMode: GameMode,
    public name: string,
    public playerResults: PlayerResult[],
    public id: string = "") {
  }
}
