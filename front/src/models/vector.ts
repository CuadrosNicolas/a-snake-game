/**
 * Simple class representing a 2D position
 */
export class Vector {
  constructor(public x: number, public y: number) {

  }

  add(position: Vector) {
    return new Vector(this.x + position.x, this.y + position.y);
  }

  sub(position: Vector) {
    return new Vector(this.x - position.x, this.y - position.y);
  }

  collide(position: Vector) {
    return this.x === position.x && this.y === position.y;
  }

  static defaultVector() {
    return new Vector(0, 0)
  }

}

