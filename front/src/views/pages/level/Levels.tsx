import { useState, useEffect, useContext } from "react";
import { Level } from "../../../models/level";
import { levelService } from "../../../services/levelsService";
import { makeStyles, CardContent, Card, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { LevelPreview } from "./LevelPreview";
import { MessagingContext } from "../../../context/messagingContext";
import {
  ErrorMessageEvent,
  ValidationMessageEvent,
} from "../../../context/messagingEvent";

const useStyles = makeStyles({
  page: {
    width: "100%",
    height: "100%",
  },
  levelCard: {
    margin: "1em",
    cursor: "pointer",
  },
  levelCardGrid: {
    overflowY: "scroll",
    height: "100%",
    maxHeight: "100%",
  },
  levelMenu: {
    display: "flex",
    height: "100%",
    width: "100%",
  },
  levelList: {
    width: "20%",
    height: "calc(100% - 2em)",
    margin: "1em",
  },
  levelPreview: {
    width: "80%",
    height: "100%",
  },
});

export interface LevelCardProps {
  level: Level;
  selected: boolean;
  index: number;
  onSelected: (index: number) => void;
}

/**
 * Simple tile displaying a level name
 * Launch a party if clicked
 * @param props
 */
function LevelCard(props: LevelCardProps) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Card
      className={classes.levelCard}
      style={{ backgroundColor: props.selected ? "rgb(235,235,235)" : "white" }}
      onMouseEnter={() => props.onSelected(props.index)}
      onClick={() => history.push(`party/${props.level.id}`)}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {props.level.name}
        </Typography>
      </CardContent>
    </Card>
  );
}

const WELL_DELETED_LABEL = "Le niveau a bien été supprimé";

/**
 * Render the list of levels
 */
export function Levels() {
  const messagingDispatcher = useContext(MessagingContext);
  const [levels, setLevels] = useState<Level[]>([]);
  const [selectedLevel, setSelectedLevel] = useState(0);
  const classes = useStyles();
  useEffect(() => {
    levelService
      .getAllLevels()
      .then(setLevels)
      .catch((error) => {
        messagingDispatcher(new ErrorMessageEvent(error.message));
      });
  }, [messagingDispatcher]);
  const deleteHandler = (id: string) => {
    levelService
      .deleteLevel(id)
      .then(() => {
        messagingDispatcher(new ValidationMessageEvent(WELL_DELETED_LABEL));
        setSelectedLevel(0);
      })
      .then(() => {
        setLevels(levels.filter((level) => level.id !== id));
      })
      .catch((error) => {
        messagingDispatcher(new ErrorMessageEvent(error.message));
      });
  };
  return (
    <div className={classes.levelMenu}>
      <div className={classes.levelList}>
        <div className={classes.levelCardGrid}>
          {levels.map((level, index) => (
            <LevelCard
              key={index}
              index={index}
              selected={selectedLevel === index}
              onSelected={setSelectedLevel}
              level={level}
            ></LevelCard>
          ))}
        </div>
      </div>
      <div className={classes.levelPreview}>
        {levels[selectedLevel] ? (
          <LevelPreview
            deleteHandler={deleteHandler}
            level={levels[selectedLevel]}
          ></LevelPreview>
        ) : null}
      </div>
    </div>
  );
}
