import React, { useContext } from "react";
import { EnvironmentContext } from "../../../context/environmentContext";
import {
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Typography,
  Slider,
  makeStyles,
  createStyles,
  Button,
} from "@material-ui/core";
import { GameMode, GameDifficulty } from "../../../models/environment";
import { levelService } from "../../../services/levelsService";
import { useHistory } from "react-router-dom";
import {
  setWidthEvent,
  setHeightEvent,
  setRefreshRateEvent,
  setNameEvent,
  setGameModeEvent,
} from "../../../context/environmentEvent";
import { MessagingContext } from "../../../context/messagingContext";
import {
  ErrorMessageEvent,
  ValidationMessageEvent,
} from "../../../context/messagingEvent";

const useStyles = makeStyles(() =>
  createStyles({
    form: {
      width: "95%",
      maxWidth: "95%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    formItem: {
      margin: "1em",
      width: "100%",
    },
    formButton: {
      display: "flex",
      justifyContent: "space-around",
      flexDirection: "column",
    },
    actionButton: {
      margin: "1em",
    },
    toolBar: {
      height: "calc(100% - 2em)",
      width: "20%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      overflowY: "scroll",
      overflowX: "hidden",
      margin: "1em",
    },
  })
);

const LEVEL_NAME_LABEL = "Nom du niveau";
const GAME_MODE_LABEL = "Mode de jeu";
const GAME_MODE_INFINITY_LABEL = "Infini";
const GAME_MODE_LIMITED_LABEL = "Limité";
const GAME_MODE_LIVING_APPLE_LABEL = "Pomme vivante";
const WIDTH_LABEL = "Largeur";
const HEIGHT_LABEL = "Hauteur";
const REFRESH_RATE_LABEL = "Vitesse";
const REFRESH_RATE_EASY_LABEL = "Facile";
const REFRESH_RATE_MIDLE_LABEL = "Moyen";
const REFRESH_RATE_HARD_LABEL = "Difficile";
const SAVE_LABEL = "Sauvegarder";
const CREATE_FROM_LABEL = "Créer un nouveau niveau";

const WELL_CREATED_LABEL = "Le niveau a bien été enregistré";
const WELL_UPDATED_LABEL = "Le niveau a bien été modifié";

const maxWidth = 20;
const minHeight = 5;
const maxHeight = 20;
const minWidth = 5;

export interface EditorFormProps {
  editMode: boolean;
  levelId?: string;
}

/**
 * Editor's left panel use to modify the environment
 * properties
 * @param props
 */
export function EditorForm(props: EditorFormProps) {
  const classes = useStyles();
  const history = useHistory();
  const { environment, eventDispatcher } = useContext(EnvironmentContext);
  const messagingDispatcher = useContext(MessagingContext);
  function setWidth(width: number) {
    eventDispatcher(new setWidthEvent(width));
  }

  function setHeight(height: number) {
    eventDispatcher(new setHeightEvent(height));
  }

  function setRefreshRate(refreshRate: number) {
    eventDispatcher(new setRefreshRateEvent(refreshRate));
  }

  function setName(name: string) {
    eventDispatcher(new setNameEvent(name));
  }

  function setGameMode(gameMode: GameMode) {
    eventDispatcher(new setGameModeEvent(gameMode));
  }

  function saveLevel() {
    const level = environment.toLevel();
    level.id = props.levelId || "";
    levelService
      .updateLevel(level)
      .then(() => {
        messagingDispatcher(new ValidationMessageEvent(WELL_UPDATED_LABEL));
        history.push("/");
      })
      .catch((error) => {
        messagingDispatcher(new ErrorMessageEvent(error.message));
        history.push("/");
      });
  }

  function saveNewLevel() {
    levelService
      .postLevel(environment.toLevel())
      .then(() => {
        messagingDispatcher(new ValidationMessageEvent(WELL_CREATED_LABEL));
        history.push("/");
      })
      .catch((error) => {
        messagingDispatcher(new ErrorMessageEvent(error.message));
        history.push("/");
      });
  }

  function validLevel() {
    return environment.player.parts.length && environment.name.length;
  }

  return (
    <div className={classes.toolBar}>
      <div className={classes.form}>
        <FormControl className={classes.formItem}>
          <InputLabel htmlFor="my-input">{LEVEL_NAME_LABEL}</InputLabel>
          <Input
            value={environment.name}
            onChange={(event) => setName(String(event.target.value))}
          />
        </FormControl>
        <FormControl className={classes.formItem}>
          <InputLabel>{GAME_MODE_LABEL}</InputLabel>
          <Select
            value={environment.gameMode}
            onChange={(event) => setGameMode(event.target.value as GameMode)}
          >
            <MenuItem value={GameMode.INFINITY}>
              {GAME_MODE_INFINITY_LABEL}
            </MenuItem>
            <MenuItem value={GameMode.LIMITED}>
              {GAME_MODE_LIMITED_LABEL}
            </MenuItem>
            <MenuItem value={GameMode.LIVING_APPLE}>
              {GAME_MODE_LIVING_APPLE_LABEL}
            </MenuItem>
          </Select>
        </FormControl>
        <div className={classes.formItem}>
          <Typography gutterBottom>{HEIGHT_LABEL}</Typography>
          <Slider
            defaultValue={environment.height}
            step={1}
            marks
            min={minHeight}
            max={maxHeight}
            onChange={(_, value) => setHeight(Number(value))}
            valueLabelDisplay="auto"
          />
        </div>
        <div className={classes.formItem}>
          <Typography gutterBottom>{WIDTH_LABEL}</Typography>
          <Slider
            defaultValue={environment.width}
            step={1}
            marks
            min={minWidth}
            max={maxWidth}
            onChange={(_, value) => setWidth(Number(value))}
            valueLabelDisplay="auto"
          />
        </div>
        <FormControl className={classes.formItem}>
          <InputLabel>{REFRESH_RATE_LABEL}</InputLabel>
          <Select
            value={environment.refreshRate}
            onChange={(event) => setRefreshRate(Number(event.target.value))}
          >
            <MenuItem value={GameDifficulty.EASY}>
              {REFRESH_RATE_EASY_LABEL}
            </MenuItem>
            <MenuItem value={GameDifficulty.MEDIUM}>
              {REFRESH_RATE_MIDLE_LABEL}
            </MenuItem>
            <MenuItem value={GameDifficulty.HARD}>
              {REFRESH_RATE_HARD_LABEL}
            </MenuItem>
          </Select>
        </FormControl>
        <div className={classes.formButton}>
          {props.editMode ? (
            <Button
              className={classes.actionButton}
              disabled={!validLevel()}
              onClick={() => saveLevel()}
              color="primary"
              variant="contained"
            >
              {SAVE_LABEL}
            </Button>
          ) : null}
          <Button
            className={classes.actionButton}
            disabled={!validLevel()}
            onClick={() => saveNewLevel()}
            color="primary"
            variant="contained"
          >
            {CREATE_FROM_LABEL}
          </Button>
        </div>
      </div>
    </div>
  );
}
