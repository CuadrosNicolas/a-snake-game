import { GameMode } from "../models/environment";
import { composeRules } from "./rules/composeRules";
import { movePlayer } from "./rules/movePlayer";
import { Rule } from "./rules/rule";
import { stopOnHitWalls } from "./rules/stopOnHitWalls";
import { limitScore } from "./rules/limitScore";
import { livingApple } from "./rules/livingApple";


/**
 * Map a game mode model to a rule function
 * @param gameMode
 */
export function getGameMode(gameMode: GameMode): Rule {
  switch (gameMode) {
    case GameMode.INFINITY:
      return composeRules(movePlayer, stopOnHitWalls)
    case GameMode.LIMITED:
      return composeRules(movePlayer, stopOnHitWalls, limitScore)
    case GameMode.LIVING_APPLE:
      return composeRules(movePlayer, stopOnHitWalls, livingApple)
  }
}