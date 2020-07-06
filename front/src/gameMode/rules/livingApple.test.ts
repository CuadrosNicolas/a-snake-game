import { livingApple } from "./livingApple";
import { Environment, GameDifficulty, GameMode } from "../../models/environment";
import { Walls } from "../../models/walls";
import { Player } from "../../models/player";
import { PartyStatus } from "../../models/partyStatus";
import { Vector } from "../../models/vector";
import { KeyPressed } from "../../models/keyPressed";


describe('Testing living apple rule', () => {
  let player: Player;
  let walls: Walls;
  let environment: Environment;
  beforeEach(() => {
    player = new Player([new Vector(0, 0)])
    walls = new Walls([], 10, 10)
    environment = new Environment(10, 10, walls, player, GameDifficulty.EASY, GameMode.LIVING_APPLE, "TEST", "");
  })
  test('Living apple should not move at each ticks', () => {
    const previousPosition = new Vector(5, 5);
    const partyStatus = new PartyStatus(previousPosition, 0, false);

    let nextState = livingApple(environment, partyStatus, KeyPressed.DOWN, 1);
    expect(nextState.partyStatus.fruit.collide(partyStatus.fruit)).toBe(true);
  })

  test('Living apple should move at each %3 ticks', () => {
    const previousPosition = new Vector(5, 5);
    const partyStatus = new PartyStatus(previousPosition, 0, false);

    let nextState = livingApple(environment, partyStatus, KeyPressed.DOWN, 3);
    expect(nextState.partyStatus.fruit.collide(previousPosition)).toBe(false);
  })

  test('Living apple should not move when circled %3 ticks', () => {

    walls = new Walls([new Vector(4, 5), new Vector(6, 5), new Vector(5, 6), new Vector(5, 4)], 10, 10)
    environment.walls = walls;
    environment.computeEmptyPlaces();
    const previousPosition = new Vector(5, 5);
    const partyStatus = new PartyStatus(previousPosition, 0, false);

    let nextState = livingApple(environment, partyStatus, KeyPressed.DOWN, 3);
    expect(nextState.partyStatus.fruit.collide(previousPosition)).toBe(true);
  })
});