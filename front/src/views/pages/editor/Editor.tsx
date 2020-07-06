import React from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import { EditorCanvas } from "./EditorCanvas";
import { EditorForm } from "./EditorForm";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "10px",
    },
    content: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
    },
    modeAndFruits: {
      display: "flex",
      width: "100%",
    },
    select: {
      display: "flex",
      margin: "1em",
    },
    form: {
      width: "20%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    formItem: {
      margin: "1em",
      width: "100%",
    },
  })
);

export interface EditorProps {
  editMode: boolean;
  levelId?: string;
}

/**
 * Main editor layout
 * @param props
 */
export default function Editor(props: EditorProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <EditorForm
          levelId={props.levelId}
          editMode={props.editMode}
        ></EditorForm>
        <EditorCanvas></EditorCanvas>
      </div>
    </div>
  );
}
