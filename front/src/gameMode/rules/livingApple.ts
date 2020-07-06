import { Vector } from "../../models/vector";
import { Environment } from "../../models/environment";
import { PartyStatus } from "../../models/partyStatus";
import { KeyPressed } from "../../models/keyPressed";


const directions = [
  new Vector(0, 1),
  new Vector(0, -1),
  new Vector(-1, 0),
  new Vector(1, 0),
]

function randomDirection() {
  return directions[Math.round(Math.random() * (directions.length - 1))];
}

/**
 * Move the fruit at each tick%3
 * which end the game when reached.
 * @param environment
 * @param partyStatus 
 * @param keyPressed 
 */
export function livingApple(environment: Environment, partyStatus: PartyStatus, keyPressed: KeyPressed, ticks: number) {
  if (ticks % 3 === 0) {
    const nextRandomPosition = partyStatus.fruit.add(randomDirection());
    if (!environment.outOfBoundaries(nextRandomPosition) &&
      !environment.player.collide(nextRandomPosition) &&
      !environment.walls.collide(nextRandomPosition)) {
      partyStatus.fruit = nextRandomPosition;
    }
  }
  return { environment, partyStatus };
}