import { useEffect, useContext } from "react";
import { EnvironmentContext } from "../context/environmentContext";

/**
 * Hooks allowing to call a callback at each ticks
 * @param callback
 */
export function useTicks(callback: (tickCounter: number) => void, dependencies: React.DependencyList = []) {
  const { tickCounter } = useContext(EnvironmentContext);
  const tickEffect = () => callback(tickCounter)
  useEffect(tickEffect, [tickCounter, ...dependencies]);
  return tickCounter;
}