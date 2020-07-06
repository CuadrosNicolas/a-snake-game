
import {
  Vector,
  GameDifficulty,
  PartyResult
} from '../../repositories/levelRepository';

export enum GameMode {
  INFINITY,
  LIMITED,
  LIVING_APPLE

}

export class LevelDto {
  constructor(public width: Number,
    public height: Number,
    public player: Vector,
    public walls: Vector[],
    public refreshRate: GameDifficulty,
    public gameMode: GameMode,
    public name: String,
    public playerResults: PartyResult[],
    public id: String) {

  }
}
