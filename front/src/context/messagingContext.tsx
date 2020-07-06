import { Message, messageCategoryToSeverity } from "../models/message";
import { MessagingEvent } from "./messagingEvent";
import React, { useState, createContext, useEffect, useReducer } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function messageReducer(
  message: Message | null,
  action: MessagingEvent | null
): Message | null {
  if (!action) return message;
  return action.action(message);
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const MessagingContext = createContext<React.Dispatch<any>>(() => null);

const autoHideDuraction = 2000;

/**
 * Context allowing to provide a global envrionment
 * @param props
 */
export function MessagingContextProvider(props: { children: any }) {
  const [message, messagingDispatcher] = useReducer(messageReducer, null);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (message) {
      setOpen(true);
      setTimeout(() => {
        handleClose();
      }, autoHideDuraction);
    }
  }, [message]);

  return (
    <MessagingContext.Provider value={messagingDispatcher}>
      {props.children}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={autoHideDuraction}
        onClose={handleClose}
      >
        {message ? (
          <Alert
            onClose={handleClose}
            severity={messageCategoryToSeverity(message.category)}
          >
            {message.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </MessagingContext.Provider>
  );
}
