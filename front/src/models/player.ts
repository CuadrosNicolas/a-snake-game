import { Vector } from "./vector";

/**
 * Class representing the player entity
 */
export class Player {
  /**
   * List of vector corresponding to the player body
   */
  public parts: Vector[] = [];
  constructor(position: Vector[]) {
    this.parts = position
  }

  /**
   * Check if one part of the player body's collide with a position
   * @param position
   */
  collide(position: Vector): boolean {
    return !!this.parts.find(part => part.collide(position));
  }

  /**
   * Split the player into his head, body and tail
   */
  splitBody(): [Vector, Vector[], Vector] {

    const head = this.parts[0];
    const body = this.parts.slice(1, -1);
    const tail = this.parts.slice(-1)[0];

    return [head, body, tail]
  }

  /**
   * Move the player in a direction
   * @param direction
   * @param grow 
   */
  move(direction: Vector, grow: boolean) {
    const [head, body, tail] = this.splitBody();
    const newHead = head.add(direction);
    const newParts = [
      newHead,
      ...(this.parts.length > 1 ? [head] : []),
      ...(this.parts.length > 2 ? body : []),
      ...(grow ? [tail] : [])
    ]
    return new Player(newParts);
  }

  /**
   * Return the head of the player
   */
  head() {
    return this.parts[0];
  }

  /**
   * Return the player head hits his body
   */
  hurtsHimself() {
    return this.parts.slice(1).find((part) =>
      part.collide(this.head()))
  }

}