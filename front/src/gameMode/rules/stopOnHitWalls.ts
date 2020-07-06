import { Environment } from "../../models/environment";
import { PartyStatus } from "../../models/partyStatus";
import { KeyPressed } from "../../models/keyPressed";

/**
 * Basic rule allowing the player to move
 * around the level.
 * Grow when eating a fruit.
 * Replace the fruit when eaten.
 * End the game when hitting himself, a wall or the border of the level
 * @param environment
 * @param partyStatus 
 * @param keyPressed 
 */
export function stopOnHitWalls(environment: Environment, partyStatus: PartyStatus, keyPressed: KeyPressed, ticks: number) {
  if (
    environment.outOfBoundaries(environment.player.head()) ||
    environment.player.hurtsHimself() ||
    environment.walls.collide(environment.player.head())
  ) {
    partyStatus.end = true;
  }
  return { environment, partyStatus }
}