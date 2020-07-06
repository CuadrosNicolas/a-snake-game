import { Rule } from "./rule";
import { Environment } from "../../models/environment";
import { PartyStatus } from "../../models/partyStatus";
import { KeyPressed } from "../../models/keyPressed";

/**
 * Compose multiple rules to form one
 * @param rules
 */
export function composeRules(...rules: Rule[]): Rule {
  return (environment: Environment, partyStatus: PartyStatus, keyPressed: KeyPressed, ticks: number) => {
    return rules.reduce((previousState, rule) => {
      return rule(previousState.environment, previousState.partyStatus, keyPressed, ticks);
    }, { environment, partyStatus })
  }
}