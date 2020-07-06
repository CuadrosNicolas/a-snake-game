import { BehaviorSubject } from 'rxjs';
import { KeyPressed, mapKeyCode } from '../models/keyPressed';
import { useEffect, useState } from 'react';


export const keyPressedSubject = new BehaviorSubject<KeyPressed>(KeyPressed.NONE);

/**
 * return the last key pressed by the use
 */
export function useKeyPressed() {
  const [keyPressed, setKeyPressed] = useState(KeyPressed.NONE)
  useEffect(()=>{
    keyPressedSubject.subscribe((keyPressed)=>{
      setKeyPressed(keyPressed);
    })
  },[])
  return keyPressed;
}

/**
 * Set the last key pressed by the user
 * @param key
 */
export function pushKeyPressed(key : number) {
  const actualKey = keyPressedSubject.value;
  keyPressedSubject.next(mapKeyCode(key) || actualKey);
}

/**
 * Set the key pressed to none
 */
export function resetKeyPressed() {
  keyPressedSubject.next(KeyPressed.NONE);
}