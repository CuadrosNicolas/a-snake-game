import React from "react";
import { Typography } from "@material-ui/core";

export interface PartyInfosProps {
  elapsedTicks: number;
  score: number;
}

const ELAPSED_TICKS_LABEL = "Temps écoulé";
const SCORE_LABEL = "Score";

/**
 * Component use to simply print a party state
 * @param props
 */
export function PartyInfos(props: PartyInfosProps) {
  return (
    <div>
      <Typography variant="body1">{`${SCORE_LABEL} : ${props.score}`}</Typography>
      <Typography variant="body1">{`${ELAPSED_TICKS_LABEL} : ${props.elapsedTicks}`}</Typography>
    </div>
  );
}
