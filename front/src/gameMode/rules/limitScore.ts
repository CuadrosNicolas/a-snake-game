import { Environment } from "../../models/environment";
import { PartyStatus } from "../../models/partyStatus";
import { KeyPressed } from "../../models/keyPressed";


const fruitsLimit = 10;
/**
 * add a fruit limit
 * which end the game when reached.
 * @param environment
 * @param partyStatus 
 * @param keyPressed
 */
export function limitScore(environment: Environment, partyStatus: PartyStatus, keyPressed: KeyPressed, ticks: number) {
  if (partyStatus.score >= fruitsLimit) {
    partyStatus.end = true;
  }
  return { environment, partyStatus };
}