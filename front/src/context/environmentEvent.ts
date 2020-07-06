import { Environment, GameMode } from "../models/environment";
import { Vector } from "../models/vector";
import { Player } from "../models/player";

/**
 * Defines all possible actions for the envrionment context
 */
export interface EnvironmentEvent {
  action(environment: Environment): Environment;
}

export class setPlayerEvent implements EnvironmentEvent {
  constructor(public newPosition: Vector[]) { }
  public action(environment: Environment) {
    const newEnvironment = environment.clone();
    newEnvironment.player = new Player(this.newPosition);
    return newEnvironment;
  }
}

export class removePlayerEvent implements EnvironmentEvent {
  public action(environment: Environment) {
    const newEnvironment = environment.clone();
    newEnvironment.player = new Player([]);
    return newEnvironment;
  }
}

export class setWallEvent implements EnvironmentEvent {
  constructor(public newPosition: Vector) { }
  public action(environment: Environment) {
    const newEnvironment = environment.clone();
    newEnvironment.walls.put(this.newPosition);
    return newEnvironment;
  }
}

export class removeWallEvent implements EnvironmentEvent {
  constructor(public newPosition: Vector) { }
  public action(environment: Environment) {
    const newEnvironment = environment.clone();
    newEnvironment.walls.remove(this.newPosition);
    return newEnvironment;
  }
}

export class setWidthEvent implements EnvironmentEvent {
  constructor(public width: number) { }
  public action(environment: Environment) {
    const newEnvironment = environment.clone();
    newEnvironment.setWidth(this.width);
    return newEnvironment;
  }
}

export class setHeightEvent implements EnvironmentEvent {
  constructor(public height: number) { }
  public action(environment: Environment) {
    const newEnvironment = environment.clone();
    newEnvironment.setHeight(this.height);
    return newEnvironment;
  }
}

export class setRefreshRateEvent implements EnvironmentEvent {
  constructor(public refreshRate: number) { }
  public action(environment: Environment) {
    const newEnvironment = environment.clone();
    newEnvironment.refreshRate = this.refreshRate;
    return newEnvironment;
  }
}

export class setNameEvent implements EnvironmentEvent {
  constructor(public name: string) { }
  public action(environment: Environment) {
    const newEnvironment = environment.clone();
    newEnvironment.name = this.name;
    return newEnvironment;
  }
}

export class setGameModeEvent implements EnvironmentEvent {
  constructor(public gameMode: GameMode) { }
  public action(environment: Environment) {
    const newEnvironment = environment.clone();
    newEnvironment.gameMode = this.gameMode;
    return newEnvironment;
  }
}

export class setEnvironmentEvent implements EnvironmentEvent {
  constructor(public environment: Environment) { }
  public action(_: Environment) {
    return this.environment.clone();
  }
}
