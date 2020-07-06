import { Environment } from "../../models/environment";
import { PartyStatus } from "../../models/partyStatus";
import { KeyPressed } from "../../models/keyPressed";



/**
 * Defines the rule prototype
 * environment and partyStatus returned
 * by the function will be use at each game tick to update
 * the game state
 */
export type Rule = (environment: Environment, partyStatus: PartyStatus, keyPressed: KeyPressed, ticks: number) => { environment: Environment, partyStatus: PartyStatus };