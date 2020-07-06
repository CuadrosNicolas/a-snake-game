
import { Schema, Document, model, Mongoose } from 'mongoose';

const Vectors = new Schema({
  x: Number,
  y: Number,
});

export interface Vector {
  x: Number,
  y: Number
}

export enum GameMode {
  INFINITY,
  LIMITED
}

/**
 *
 */
export interface ILvel extends Document {
  width: Number;
  height: Number;
  walls: Vector[];
  player: Vector;
  refreshRate: Number;
  gameMode: GameMode;
  name: String;
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
    type: GameMode, enum: [GameMode.LIMITED, GameMode.INFINITY], required: true,
  },
  name: {
    type: String, required: true,
  },
});
export const Facture = model<ILvel>('Levels', LevelSchema);
