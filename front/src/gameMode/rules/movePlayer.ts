import { KeyPressed } from "../../models/keyPressed";
import { Vector } from "../../models/vector";
import { Environment } from "../../models/environment";
import { PartyStatus } from "../../models/partyStatus";

const moves = {
  [KeyPressed.DOWN]: new Vector(0, 1),
  [KeyPressed.UP]: new Vector(0, -1),
  [KeyPressed.LEFT]: new Vector(-1, 0),
  [KeyPressed.RIGHT]: new Vector(1, 0),
  [KeyPressed.NONE]: new Vector(0, 0),
};

/**
 * Basic rule allowing the player to move
 * around the level.
 * Grow when eating a fruit.
 * Replace the fruit when eaten.
 * @param environment
 * @param partyStatus
 * @param keyPressed 
 */
export function movePlayer(environment: Environment, partyStatus: PartyStatus, keyPressed: KeyPressed, ticks: number) {
  const grow = environment.player.collide(partyStatus.fruit);
  const playerDirection = moves[keyPressed];
  const newPlayer = environment.player.move(playerDirection, grow);
  environment.player = newPlayer;
  if (grow) {
    partyStatus.fruit = environment.randomPosition();
    partyStatus.score += 1;
  }

  return { environment, partyStatus }
}