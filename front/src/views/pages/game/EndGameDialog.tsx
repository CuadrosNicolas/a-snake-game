import { PlayerResult } from "../../../models/playerResult";
import { useHistory } from "react-router-dom";
import React, { useState, useContext } from "react";
import { levelService } from "../../../services/levelsService";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";
import { PartyInfos } from "./PartyInfos";
import { MessagingContext } from "../../../context/messagingContext";
import {
  ErrorMessageEvent,
  ValidationMessageEvent,
} from "../../../context/messagingEvent";

export interface EndGameDialogProps {
  partyResults: PlayerResult;
  levelId: string;
}

const ENDGAME_LABEL = "Fin de partie !";
const SPEUDO_LABEL = "Speudo";
const SAVE_LABEL = "Sauvegarder";
const GO_BACK_LABEL = "Quitter";
const REPLAY_LABEL = "Rejouer";
const SPEUDO_ERROR_LABEL = "Le speudo ne doit pas être vide";

const SCORE_SAVED_LABEL = "Le score a bien été enregistré";
/**
 * End game dialog allowing the player to save his score
 * @param props
 */
export function EndGameDialog(props: EndGameDialogProps) {
  const history = useHistory();
  const messagingDispatcher = useContext(MessagingContext);
  const [speudo, setSpeudo] = useState("");
  const handleClose = () => {
    history.push("/");
  };
  const handleReplay = () => {
    history.go(0);
  };
  const handleSave = () => {
    const finalResults = props.partyResults;
    finalResults.playerSpeudo = speudo;
    levelService
      .postScore(props.levelId, finalResults)
      .then(() => {
        messagingDispatcher(new ValidationMessageEvent(SCORE_SAVED_LABEL));
        handleClose();
      })
      .catch((error) => {
        messagingDispatcher(new ErrorMessageEvent(error.message));
        history.push("/");
      });
  };
  return (
    <Dialog open={true}>
      <DialogTitle id="simple-dialog-title">{ENDGAME_LABEL}</DialogTitle>
      <DialogContent>
        <PartyInfos
          score={props.partyResults.score}
          elapsedTicks={props.partyResults.elapsedTicks}
        ></PartyInfos>
        <TextField
          autoFocus
          margin="dense"
          label={SPEUDO_LABEL}
          type="text"
          fullWidth
          error={!speudo.length}
          helperText={SPEUDO_ERROR_LABEL}
          onChange={(event) => setSpeudo(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReplay} color="primary">
          {REPLAY_LABEL}
        </Button>
        <Button disabled={!speudo.length} onClick={handleSave} color="primary">
          {SAVE_LABEL}
        </Button>
        <Button onClick={handleClose} color="primary">
          {GO_BACK_LABEL}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
