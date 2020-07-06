import { PlayerResult } from "../../../models/playerResult";
import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
} from "@material-ui/core";

export interface LevelPlayerResultsProps {
  playerResults: PlayerResult[];
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const TIME_LABEL = "Temps";
const SCORES_LABEL = "Score";
const SPEUDO_LABEL = "Speudo";

/**
 * Table of a level players results
 * @param props
 */
export function LevelPlayerResults(props: LevelPlayerResultsProps) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">{SPEUDO_LABEL}</TableCell>
            <TableCell align="right">{SCORES_LABEL}</TableCell>
            <TableCell align="right">{TIME_LABEL}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.playerResults.map((playerResult, index) => (
            <TableRow key={index}>
              <TableCell align="right">{playerResult.playerSpeudo}</TableCell>
              <TableCell align="right">{playerResult.score}</TableCell>
              <TableCell align="right">{playerResult.elapsedTicks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
