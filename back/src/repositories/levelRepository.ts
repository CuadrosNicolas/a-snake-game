
import { Schema, Document, model, Mongoose } from 'mongoose';

const Vectors = new Schema({
  x: Number,
  y: Number,
});

export interface Vector {
  x: Number,
  y: Number
}

const PartyResults = new Schema({
  elapsedTicks: Number,
  score: Number,
  playerSpeudo: String,
});


export interface PartyResult {
  elapsedTicks: number;
  score: number;
  playerSpeudo: string;
}


export enum GameMode {
  INFINITY,
  LIMITED,
  LIVING_APPLE

}

export enum GameDifficulty {
  EASY = 150,
  MEDIUM = 100,
  HARD = 75,
}

/**
 *
 */
export interface ILevel extends Document {
  width: Number;
  height: Number;
  walls: Vector[];
  player: Vector;
  refreshRate: GameDifficulty;
  gameMode: GameMode;
  fruitLimit: Number;
  name: String;
  playerResults: PartyResult[];
}

export const LevelSchema = new Schema({
  width: {
    type: Number, required: true,
  },
  height: {
    type: Number, required: true,
  },
  walls: {
    type: [Vectors], required: true,
  },
  player: {
    type: Vectors, required: true,
  },
  refreshRate: {
    type: Number, required: true,
  },
  gameMode: {
    type: GameMode, enum: [GameMode.LIMITED, GameMode.INFINITY, GameMode.LIVING_APPLE], required: true,
  },
  name: {
    type: String, required: true,
  },
  playerResults: {
    type: [PartyResults], default: [],
  },
});
export const Levels = model<ILevel>('Levels', LevelSchema);
