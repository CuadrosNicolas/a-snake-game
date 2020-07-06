import React, { useContext, useState } from "react";
import { EnvironmentContext } from "../../../context/environmentContext";
import WallsActionTileRenderer from "./renderer/WallsActionTile";
import { ActionTileType, ActionTile } from "../../../models/actionTile";
import {
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { EditorBackgroundRenderer } from "./renderer/EditorBackgroundRenderer";
import { PlayerActionTileRenderer } from "./renderer/PlayerActionTileRenderer";
import { SpeedPreviewRenderer } from "./renderer/SpeedPreviewRenderer";
import { SvgCanvas } from "../../../shared/components/SvgCanvas";
import {
  setWallEvent,
  setPlayerEvent,
  removePlayerEvent,
  removeWallEvent,
} from "../../../context/environmentEvent";
import GridRenderer from "../../../shared/components/GridRenderer";

enum EditingMode {
  REMOVE,
  WALLS,
  PLAYER,
}

const useStyles = makeStyles({
  svg: {
    height: "90%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    margin: "5em",
    width: "100%",
  },
});

const EDITIING_MODE_LABEL = "Action";
const PLACE_PLAYER_LABEL = "Placer le joueur";
const PLACE_WALLS_LABEL = "Placer des murs";
const REMOVE_ITEMS_LABEL = "Supprimer des éléments";

export function EditorCanvas() {
  const style = useStyles();
  const environmentContext = useContext(EnvironmentContext);
  const { environment, eventDispatcher } = environmentContext;
  const [editingMode, setEditingMOde] = useState<EditingMode>(
    EditingMode.PLAYER
  );
  const handleEditingModeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setEditingMOde(event.target.value as EditingMode);
  };
  const onActionHandler = (actionTile: ActionTile) => {
    switch (editingMode) {
      case EditingMode.WALLS:
        if (actionTile.actionTileType === ActionTileType.EMPTY) {
          eventDispatcher(new setWallEvent(actionTile.source));
        }
        break;
      case EditingMode.PLAYER:
        if (actionTile.actionTileType === ActionTileType.EMPTY) {
          eventDispatcher(new setPlayerEvent([actionTile.source]));
        }

        break;
      case EditingMode.REMOVE:
        if (actionTile.actionTileType === ActionTileType.PLAYER) {
          eventDispatcher(new removePlayerEvent());
        } else if (actionTile.actionTileType === ActionTileType.WALL) {
          eventDispatcher(new removeWallEvent(actionTile.source));
        }
    }
  };
  return (
    <div className={style.content}>
      <FormControl>
        <InputLabel>{EDITIING_MODE_LABEL}</InputLabel>
        <Select value={editingMode} onChange={handleEditingModeChange}>
          <MenuItem value={EditingMode.PLAYER}>{PLACE_PLAYER_LABEL}</MenuItem>
          <MenuItem value={EditingMode.WALLS}>{PLACE_WALLS_LABEL}</MenuItem>
          <MenuItem value={EditingMode.REMOVE}>{REMOVE_ITEMS_LABEL}</MenuItem>
        </Select>
      </FormControl>
      <SvgCanvas>
        <GridRenderer
          width={environment.width}
          height={environment.height}
        ></GridRenderer>
        <EditorBackgroundRenderer
          onClick={onActionHandler}
        ></EditorBackgroundRenderer>
        <PlayerActionTileRenderer
          player={environment.player}
          onClick={onActionHandler}
        ></PlayerActionTileRenderer>
        <WallsActionTileRenderer
          onClick={onActionHandler}
          walls={environment.walls}
        ></WallsActionTileRenderer>
      </SvgCanvas>
      <SpeedPreviewRenderer></SpeedPreviewRenderer>
    </div>
  );
}
