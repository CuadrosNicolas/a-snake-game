import { Environment, GameDifficulty, GameMode } from "../../models/environment";
import { Walls } from "../../models/walls";
import { Player } from "../../models/player";
import { PartyStatus } from "../../models/partyStatus";
import { Vector } from "../../models/vector";
import { KeyPressed } from "../../models/keyPressed";
import { stopOnHitWalls } from "./stopOnHitWalls";


describe('Testing living apple rule', () => {
  let player: Player;
  let walls: Walls;
  let environment: Environment;
  beforeEach(() => {
    player = new Player([new Vector(0, 0)])
    walls = new Walls([new Vector(0, 0)], 10, 10)
    environment = new Environment(10, 10, walls, player, GameDifficulty.EASY, GameMode.LIVING_APPLE, "TEST", "");
  })
  test('Game should end when the player hit a wall', () => {
    const previousPosition = new Vector(0, 0);
    const partyStatus = new PartyStatus(previousPosition, 0, false);

    let nextState = stopOnHitWalls(environment, partyStatus, KeyPressed.LEFT, 1);
    expect(nextState.partyStatus.end).toBe(true);
  })

  test('Game should end when the player is out of boundaries', () => {
    environment.player = new Player([new Vector(0, 0)]);
    const previousPosition = new Vector(0, 0);
    const partyStatus = new PartyStatus(previousPosition, 0, false);
    let nextState = stopOnHitWalls(environment, partyStatus, KeyPressed.LEFT, 1);
    expect(nextState.partyStatus.end).toBe(true);
  })

});