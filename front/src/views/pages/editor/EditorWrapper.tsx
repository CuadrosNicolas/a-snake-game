import { EnvironmentContextProvider } from "../../../context/environmentContext";
import React, { useState, useEffect, useContext } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import {
  pushKeyPressed,
  resetKeyPressed,
} from "../../../hooks/keyPressedHooks";
import Editor from "./Editor";
import { Environment } from "../../../models/environment";
import { useParams, useHistory } from "react-router-dom";
import { levelService } from "../../../services/levelsService";
import { MessagingContext } from "../../../context/messagingContext";
import { ErrorMessageEvent } from "../../../context/messagingEvent";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      width: "100%",
      height: "100%",
    },
  })
);

/**
 * Editor wrapper providing an environment
 */
export default function EditorWrapper() {
  const classes = useStyles();
  const handleKey = (keyPressedEvent: React.KeyboardEvent<HTMLDivElement>) => {
    pushKeyPressed(keyPressedEvent.keyCode);
  };
  const history = useHistory();
  const messagingDispatcher = useContext(MessagingContext);
  const [environment, setEnvironment] = useState<Environment | null>(null);
  /**
   * Define if the editor is currently on an already level
   */
  const [editMode, setEditMode] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      levelService
        .getLevelById(id)
        .then((level) => setEnvironment(Environment.fromLevel(level)))
        .then(() => setEditMode(true))
        .catch((error) => {
          messagingDispatcher(new ErrorMessageEvent(error.message));
          history.push("/");
        });
      resetKeyPressed();
    } else {
      setEnvironment(new Environment());
      setEditMode(false);
    }
  }, [id, history, messagingDispatcher]);

  return (
    <div tabIndex={0} onKeyDown={handleKey} className={classes.root}>
      {environment ? (
        <EnvironmentContextProvider environment={environment}>
          <Editor levelId={id} editMode={editMode}></Editor>
        </EnvironmentContextProvider>
      ) : null}
    </div>
  );
}
