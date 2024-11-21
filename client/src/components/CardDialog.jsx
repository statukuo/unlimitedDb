import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React from "react";
import { SWUListCard } from "./SWUListCard";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

export function CardDialog({ cardData, handleCloseDialog, showCollection }) {
  const navigate = useNavigate();

  return (
    <Dialog
      onClose={handleCloseDialog}
      aria-labelledby="customized-dialog-title"
      open={cardData}
    >
      <DialogTitle sx={{ m: 0, p: 1 }} id="customized-dialog-title">
        {cardData.name}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseDialog}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ padding: 0 }}>
        <SWUListCard data={cardData} showCollection={showCollection} />
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => navigate(`/cards/${cardData.set}_${cardData.number}`)}
        >
          Go to details
        </Button>
      </DialogActions>
    </Dialog>
  );
}
