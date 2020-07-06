import { Vector } from "./vector";

/**
 * Class representing a status of a party
 */
export class PartyStatus {
  constructor(public fruit: Vector, public score: number, public end: boolean = false) { }

}