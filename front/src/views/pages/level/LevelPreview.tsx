import { Level } from "../../../models/level";
import { Typography, makeStyles, Button } from "@material-ui/core";
import React from "react";
import { GameMode, GameDifficulty } from "../../../models/environment";
import { LevelPreviewRenderer } from "./renderer/LevelPreviewRenderer";
import { useHistory } from "react-router-dom";
import { LevelPlayerResults } from "./LevelPlayerResults";

const useStyles = makeStyles({
  levelPreviewContent: {
    width: "calc(100% - 4em)",
    height: "calc(100% - 4em)",
    margin: "2em",
  },
  topPanel: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    maxHeight: "25%",
  },
  informationPanel: {
    width: "50%",
  },
  actionPanel: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
    width: "50%",
    display: "flex",
    flexDirection: "row",
  },
  bottomPanel: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "75%",
    maxHeight: "75%",
  },
  button: {
    margin: "0.5em",
  },
});

const GAME_MODE_LABEL = "Mode de jeu";

const gameModeLabels = {
  [GameMode.INFINITY]: "Infini",
  [GameMode.LIMITED]: "Limité",
  [GameMode.LIVING_APPLE]: "Pomme vivante",
};

const DIFFICULTY_LABLES: { [id: number]: string } = {
  [GameDifficulty.EASY]: "Facile",
  [GameDifficulty.MEDIUM]: "Moyen",
  [GameDifficulty.HARD]: "Difficle",
};
const GAME_DIFFICULTY_LABEL = "Difficulté";

const DIMENSION_LABEL = "Dimension";

export interface LevelPreviewProps {
  level: Level;
  deleteHandler: (id: string) => void;
}

/**
 * Level preview panel
 * @param props
 */
export function LevelPreview(props: LevelPreviewProps) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.levelPreviewContent}>
      <div className={classes.topPanel}>
        <div className={classes.informationPanel}>
          <Typography variant="h4">{props.level.name}</Typography>
          <Typography variant="body1">{`${GAME_MODE_LABEL} : ${
            gameModeLabels[props.level.gameMode]
          }`}</Typography>
          <Typography variant="body1">{`${DIMENSION_LABEL} : ${props.level.width}X${props.level.height}`}</Typography>
          <Typography variant="body1">{`${GAME_DIFFICULTY_LABEL} : ${
            DIFFICULTY_LABLES[props.level.refreshRate]
          }`}</Typography>
        </div>
        <div className={classes.actionPanel}>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={() => history.push(`/party/${props.level.id}`)}
          >
            Jouer
          </Button>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={() => history.push(`/editor/${props.level.id}`)}
          >
            Editer
          </Button>
          <Button
            className={classes.button}
            color="secondary"
            variant="contained"
            onClick={() => props.deleteHandler(props.level.id)}
          >
            Supprimer
          </Button>
        </div>
      </div>
      <div className={classes.bottomPanel}>
        <LevelPlayerResults
          playerResults={props.level.playerResults}
        ></LevelPlayerResults>
        <LevelPreviewRenderer level={props.level}></LevelPreviewRenderer>
      </div>
    </div>
  );
}
