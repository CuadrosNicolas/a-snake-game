import { Vector } from './vector'
import { Player } from './player';
import { Walls } from './walls';
import { Level } from './level';

/**
 * Type of game
 */
export enum GameMode {
  INFINITY,
  LIMITED,
  LIVING_APPLE
}

/**
 * Difficulty of the game,
 * correspond to the refresh rate of the game
 */
export enum GameDifficulty {
  EASY = 150,
  MEDIUM = 100,
  HARD = 75,
}

export class Environment {
  static tileSize = 1;
  static fromLevel(level: Level) {
    return new Environment(
      level.width,
      level.height,
      new Walls(level.walls, level.width, level.height),
      new Player([level.player]),
      level.refreshRate,
      level.gameMode,
      level.name,
      level.id
    )
  }
  private emptyPlaces: Vector[] = [];
  constructor(public width: number = 10,
    public height: number = 10,
    public walls: Walls = new Walls([], width, height),
    public player: Player = new Player([new Vector(0, 0)]),
    public refreshRate: GameDifficulty = GameDifficulty.EASY,
    public gameMode: GameMode = GameMode.INFINITY,
    public name: string = "UNKNOWN",
    public levelId?: string) {
    this.computeEmptyPlaces();
  }
  /**
   * Check wether or not a position is out of the environment
   * @param position
   */
  public outOfBoundaries(position: Vector) {
    return (
      position.x < 0 ||
      position.x > (this.width - 1) ||
      position.y < 0 ||
      position.y > (this.height - 1)
    );
  }

  /**
   * Return a random position which not on a wall
   */
  public randomPosition() {
    const maxLength = this.emptyPlaces.length - 1;
    return this.emptyPlaces[Math.round(Math.random() * maxLength)];
  }

  /**
   * Return a shallow copy of the object
   */
  clone() {
    return Object.assign(new Environment(), this);
  }

  /**
   * Set the height of the environment
   * @param height
   */
  public setHeight(height: number) {
    this.height = height;
    this.walls = new Walls(this.walls.walls, height, this.height);
    this.computeEmptyPlaces();
  }

  /**
  * Set the width of the environment
  * @param height
  */
  public setWidth(width: number) {
    this.width = width;
    this.walls = new Walls(this.walls.walls, width, this.height);
    this.computeEmptyPlaces();
  }

  /**
   * Build a level model from the environment
   */
  public toLevel() {
    return new Level(this.width,
      this.height,
      this.player.head(),
      this.walls.walls,
      this.refreshRate,
      this.gameMode,
      this.name,
      [],
      this.levelId)
  }

  /**
     * Retrieves all empty places.
   */
  computeEmptyPlaces() {
    this.emptyPlaces = [];
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        const position = new Vector(i, j);
        if (!this.walls.collide(position)) {
          this.emptyPlaces.push(position);
        }
      }
    }
  }

}