import { EnvironmentContextProvider } from "../../../context/environmentContext";
import React, { useEffect, useState, useRef, useContext } from "react";
import Party from "./Party";
import { makeStyles, createStyles } from "@material-ui/core";
import {
  pushKeyPressed,
  resetKeyPressed,
} from "../../../hooks/keyPressedHooks";
import { useParams, useHistory } from "react-router-dom";
import { levelService } from "../../../services/levelsService";
import { Environment } from "../../../models/environment";
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
 * Game wrapper allowing to provide the environment
 */
export default function GameEnvironment() {
  const { id } = useParams();
  const [environment, setEnvironment] = useState<Environment | null>(null);
  const history = useHistory();
  const messagingDispatcher = useContext(MessagingContext);
  useEffect(() => {
    if (id) {
      levelService
        .getLevelById(id)
        .then((level) => setEnvironment(Environment.fromLevel(level)))
        .catch((error) => {
          messagingDispatcher(new ErrorMessageEvent(error.message));
          history.push("/");
        });
      resetKeyPressed();
    }
  }, [id, history, messagingDispatcher]);
  const classes = useStyles();
  const handleKey = (keyPressedEvent: React.KeyboardEvent<HTMLDivElement>) => {
    pushKeyPressed(keyPressedEvent.keyCode);
  };
  const refContainer = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (refContainer) {
      refContainer.current?.focus();
    }
  }, [refContainer]);
  return (
    <div
      ref={refContainer}
      tabIndex={0}
      onKeyDown={handleKey}
      className={classes.root}
    >
      {environment ? (
        <EnvironmentContextProvider environment={environment}>
          <Party></Party>
        </EnvironmentContextProvider>
      ) : null}
    </div>
  );
}
