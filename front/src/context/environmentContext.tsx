import React, { useState, createContext, useEffect, useReducer } from "react";
import { Environment } from "../models/environment";
import { EnvironmentEvent } from "./environmentEvent";

function envrionmentReducer(
  environment: Environment,
  action: EnvironmentEvent
) {
  return action.action(environment);
}

export const EnvironmentContext = createContext<{
  environment: Environment;
  eventDispatcher: React.Dispatch<any>;
  tickCounter: number;
}>({
  environment: new Environment(),
  eventDispatcher: () => null,
  tickCounter: 0,
});

/**
 * Context allowing to provide a global envrionment
 * @param props
 */
export const EnvironmentContextProvider = (props: {
  environment?: Environment;
  children: any;
}) => {
  const [environment, eventDispatcher] = useReducer(
    envrionmentReducer,
    props.environment || new Environment()
  );
  const [tickCounter, setTickCounter] = useState(0);

  useEffect(() => {
    //Little hack to avoid executing the timeout callback
    let stateRef = { stop: false };

    setTimeout(() => {
      if (!stateRef.stop) setTickCounter(tickCounter + 1);
    }, environment.refreshRate);

    return () => {
      stateRef.stop = true;
    };
  }, [tickCounter, environment.refreshRate]);
  return (
    <EnvironmentContext.Provider
      value={{ environment, eventDispatcher, tickCounter }}
    >
      {props.children}
    </EnvironmentContext.Provider>
  );
};
