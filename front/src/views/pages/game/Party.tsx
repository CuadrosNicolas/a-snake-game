import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import { useTicks } from "../../../hooks/gameTickHook";
import { useKeyPressed } from "../../../hooks/keyPressedHooks";
import { KeyPressed } from "../../../models/keyPressed";
import PlayerRenderer from "./renderer/PlayerRenderer";
import Fruit from "./renderer/FruitRenderer";
import { EnvironmentContext } from "../../../context/environmentContext";
import { PartyStatus } from "../../../models/partyStatus";
import { PartyInfos } from "./PartyInfos";
import { PlayerResult } from "../../../models/playerResult";
import { EndGameDialog } from "./EndGameDialog";
import { SvgCanvas } from "../../../shared/components/SvgCanvas";
import { setEnvironmentEvent } from "../../../context/environmentEvent";
import WallsRenderer from "./renderer/WallsRenderer";
import { Vector } from "../../../models/vector";
import GridRenderer from "../../../shared/components/GridRenderer";
import { getGameMode } from "../../../gameMode/gameMode";

const useStyles = makeStyles({
  viewport: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  svg: {
    width: "50%",
    height: "50%",
  },
  boundaries: {
    fill: "rgb(125,125,125)",
  },
  tile: {
    fill: "rgb(200,200,200)",
  },
});

const moves = {
  [KeyPressed.DOWN]: new Vector(0, 1),
  [KeyPressed.UP]: new Vector(0, -1),
  [KeyPressed.LEFT]: new Vector(-1, 0),
  [KeyPressed.RIGHT]: new Vector(1, 0),
  [KeyPressed.NONE]: new Vector(0, 0),
};

/**
 * Component representing a party
 */
export default function Party() {
  const style = useStyles();
  const { environment, eventDispatcher } = useContext(EnvironmentContext);
  const [beginGameTicks, setBeginGameTicks] = useState(-1);
  const [partyStatus, setPartyStatus] = useState(
    new PartyStatus(environment.randomPosition(), 0)
  );
  const [partyResults, setPartyResults] = useState<PlayerResult | null>(null);
  const keyPressed = useKeyPressed();

  const actualTicks = useTicks((tick) => {
    if (!partyStatus.end) {
      /**
       * Begin to record elapsed ticks once the user as entier his first input
       */
      if (beginGameTicks === -1 && keyPressed !== KeyPressed.NONE) {
        setBeginGameTicks(tick);
      }

      /**
       * APply the current environment game rule
       */
      const nexState = getGameMode(environment.gameMode)(
        environment,
        partyStatus,
        keyPressed,
        tick
      );

      /**
       * Defines the party results once the party is finished
       */
      if (partyStatus.end) {
        setPartyResults(
          new PlayerResult(tick - beginGameTicks, partyStatus.score)
        );
      }

      /**
       * ALter the game state
       */
      eventDispatcher(new setEnvironmentEvent(nexState.environment));
      setPartyStatus(nexState.partyStatus);
    }
  });
  return (
    <div className={style.viewport}>
      {!partyStatus.end ? (
        <PartyInfos
          score={partyStatus.score}
          elapsedTicks={beginGameTicks > 0 ? actualTicks - beginGameTicks : 0}
        ></PartyInfos>
      ) : null}
      <SvgCanvas>
        <GridRenderer
          width={environment.width}
          height={environment.height}
        ></GridRenderer>
        <WallsRenderer walls={environment.walls}></WallsRenderer>
        <Fruit x={partyStatus.fruit.x} y={partyStatus.fruit.y}></Fruit>
        <PlayerRenderer
          direction={moves[keyPressed]}
          player={environment.player}
        ></PlayerRenderer>
      </SvgCanvas>
      {partyResults ? (
        <EndGameDialog
          levelId={environment.levelId || ""}
          partyResults={partyResults}
        ></EndGameDialog>
      ) : null}
    </div>
  );
}
