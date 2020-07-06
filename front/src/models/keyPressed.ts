/**
 * Enum corresponding to the keyboard arrow keys
 */
export enum KeyPressed {
  UP = 1,
  DOWN,
  LEFT,
  RIGHT,
  NONE
};


/**
 * Map a key code event to a KeyPressed enum
 * @param key
 */
export function mapKeyCode(key: number): KeyPressed | null {
  switch (key) {
    case 38:
      return KeyPressed.UP;
    case 37:
      return KeyPressed.LEFT;
    case 39:
      return KeyPressed.RIGHT;
    case 40:
      return KeyPressed.DOWN;
  }
  return null
}
