import { livingApple } from "./livingApple";
import { Environment, GameDifficulty, GameMode } from "../../models/environment";
import { Walls } from "../../models/walls";
import { Player } from "../../models/player";
import { PartyStatus } from "../../models/partyStatus";
import { Vector } from "../../models/vector";
import { KeyPressed } from "../../models/keyPressed";
import { limitScore } from "./limitScore";


describe('Testing limit score rule', () => {
  let player: Player;
  let walls: Walls;
  let environment: Environment;
  beforeEach(() => {
    player = new Player([new Vector(0, 0)])
    walls = new Walls([], 10, 10)
    environment = new Environment(10, 10, walls, player, GameDifficulty.EASY, GameMode.LIVING_APPLE, "TEST", "");
  })
  test('Limit score should end the game when the score is react', () => {
    const previousPosition = new Vector(5, 5);
    const partyStatus = new PartyStatus(previousPosition, 10, false);

    let nextState = limitScore(environment, partyStatus, KeyPressed.DOWN, 1);
    expect(nextState.partyStatus.end).toBe(true);
  })

});