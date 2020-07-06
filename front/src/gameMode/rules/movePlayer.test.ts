import { Environment, GameDifficulty, GameMode } from "../../models/environment";
import { Walls } from "../../models/walls";
import { Player } from "../../models/player";
import { PartyStatus } from "../../models/partyStatus";
import { Vector } from "../../models/vector";
import { KeyPressed } from "../../models/keyPressed";
import { movePlayer } from "./movePlayer";


describe('Testing living apple rule', () => {
  let player: Player;
  let walls: Walls;
  let environment: Environment;
  beforeEach(() => {
    player = new Player([new Vector(5, 5)])
    walls = new Walls([], 10, 10)
    environment = new Environment(10, 10, walls, player, GameDifficulty.EASY, GameMode.LIVING_APPLE, "TEST", "");
  })
  test('Player should move to TOP when up arrow is pressed', () => {
    const nextPosition = new Vector(5, 4);
    const partyStatus = new PartyStatus(new Vector(0, 0), 0, false);

    let nextState = movePlayer(environment, partyStatus, KeyPressed.UP, 1);
    expect(nextState.environment.player.head().collide(nextPosition)).toBe(true);
  })

  test('Player should move to BOTTOM when down arrow is pressed', () => {
    const nextPosition = new Vector(5, 6);
    const partyStatus = new PartyStatus(new Vector(0, 0), 0, false);

    let nextState = movePlayer(environment, partyStatus, KeyPressed.DOWN, 1);
    expect(nextState.environment.player.head().collide(nextPosition)).toBe(true);
  })

  test('Player should move to LEFT when left arrow is pressed', () => {
    const nextPosition = new Vector(4, 5);
    const partyStatus = new PartyStatus(new Vector(0, 0), 0, false);

    let nextState = movePlayer(environment, partyStatus, KeyPressed.LEFT, 1);
    expect(nextState.environment.player.head().collide(nextPosition)).toBe(true);
  })

  test('Player should move to right when right arrow is pressed', () => {
    const nextPosition = new Vector(6, 5);
    const partyStatus = new PartyStatus(new Vector(0, 0), 0, false);

    let nextState = movePlayer(environment, partyStatus, KeyPressed.RIGHT, 1);
    expect(nextState.environment.player.head().collide(nextPosition)).toBe(true);
  })
});