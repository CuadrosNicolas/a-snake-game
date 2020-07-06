import { Vector } from "./vector";

/**
 * Class representing the walls of a party
 */
export class Walls {
  /**
   * Grid use to optimize collision check
   */
  private wallsGrid: boolean[][] = [];
  constructor(public walls: Vector[], public width: number, public height: number) {
    this.wallsGrid = Array.from(Array(width)).map(()=>[
      ...(Array.from(Array(height)).map(()=>false))
    ]);
    this.walls = this.walls.filter((wall)=>wall.x<width && wall.y < height)
    this.walls.forEach(wall=>this.wallsGrid[wall.x][wall.y]=true);
  }

  /**
   * Check if the position correspond to a wall
   * @param vector
   */
  public collide(vector: Vector) {
    if (vector.x < 0 || vector.y<0 ||
      vector.x >= this.width || vector.y >= this.height) {
        return false;
      }
    return this.wallsGrid[vector.x][vector.y];
  }

  /**
   * Remove a wall from the list
   * @param vector
   */
  public remove(vector: Vector) {
    this.walls = this.walls.filter((wall)=>wall.x !== vector.x || wall.y !== vector.y)
    this.wallsGrid[vector.x][vector.y] = false;
  }

  /**
   * Add a wall to the list
   * @param vector
   */
  public put(vector: Vector) {
    this.walls.push(vector);
    this.wallsGrid[vector.x][vector.y] = true;
  }
}