
/**
 * Simple class representing a player result
 */
export class PlayerResult {
  constructor(public elapsedTicks: number, public score: number, public playerSpeudo?: string) {

  }

  /**
   * Player comparator for sorting
   * @param p1
   * @param p2 
   */
  static compare(p1: PlayerResult, p2: PlayerResult): number {
    if (p1.score !== p2.score) {
      return p2.score - p1.score;
    } else {
      if (p1.score === 0) return p2.elapsedTicks - p1.elapsedTicks
      return p1.elapsedTicks - p2.elapsedTicks;
    }
  }
}