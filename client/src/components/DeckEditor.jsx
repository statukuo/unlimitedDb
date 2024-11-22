import { Button, Grid2 as Grid, TextField, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { ContentRowWithDivider } from "./RowDivider";
import { SWUListCard } from "./SWUListCard";
import { SWUCardDeckSmall } from "./SWUCardDeckSmall";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

const Styles = {
  ButtonHolder: styled(Grid)`
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
    justify-content: center;
  `,
};

export function DeckEditor({
  deckName,
  selectedLeader,
  deckList,
  selectedBase,
  handleDeckNameChange,
  handleAddCardToDeck,
  handleRemoveFromDeck,
  handleSelectCard,
  handleSave,
  handleReset,
}) {
  return (
    <Grid container>
      <ContentRowWithDivider>
        <Grid size={12} sx={{ m: 2 }}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            align="center"
            value={deckName}
            onChange={(event) => handleDeckNameChange(event.target.value)}
          />
        </Grid>
      </ContentRowWithDivider>
      <ContentRowWithDivider>
        <Grid size={6}>
          <Typography variant="h6" sx={{ m: 2 }}>
            Leader
          </Typography>
          {selectedLeader ? (
            <SWUListCard
              data={selectedLeader}
              front
              onClick={() => handleSelectCard(selectedLeader)}
            />
          ) : (
            <Typography>Please add a leader</Typography>
          )}
        </Grid>
        <Grid size={6}>
          <Typography variant="h6" sx={{ m: 2 }}>
            Base
          </Typography>
          {selectedBase ? (
            <SWUListCard data={selectedBase} />
          ) : (
            <Typography>Please add a base</Typography>
          )}
        </Grid>
      </ContentRowWithDivider>
      <ContentRowWithDivider>
        <Grid size={12}>
          <Typography variant="h6" sx={{ m: 2 }}>
            Deck
          </Typography>
          {deckList.length ? (
            deckList.map((card, idx) => (
              <SWUCardDeckSmall
                handleSelectCard={() => handleSelectCard(card)}
                data={card}
                key={idx}
                editable
                editableRemoveButtonFunction={() => handleRemoveFromDeck(card)}
                editableAddButtonFunction={() => handleAddCardToDeck(card)}
              />
            ))
          ) : (
            <Typography>Please add a cards to the deck</Typography>
          )}
        </Grid>
      </ContentRowWithDivider>
      <Grid container size={12}>
        <Styles.ButtonHolder size={6}>
          <Button
            variant="outlined"
            startIcon={<RestartAltIcon />}
            color="error"
            onClick={handleReset}
          >
            Reset All
          </Button>
        </Styles.ButtonHolder>
        <Styles.ButtonHolder size={6}>
          <Button
            variant="contained"
            startIcon={<SaveAltIcon />}
            color="success"
            disabled={!selectedLeader || !selectedBase}
            onClick={handleSave}
          >
            Save
          </Button>
        </Styles.ButtonHolder>
      </Grid>
    </Grid>
  );
}
