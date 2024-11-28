import {
  Button,
  FormControlLabel,
  Grid2 as Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { ContentRowWithDivider } from "./RowDivider";
import { SWUListCard } from "./SWUListCard";
import { SWUCardDeckSmall } from "./SWUCardDeckSmall";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { sortList } from "../utils/sortCardList";
import { SortSelect } from "./SortSelect";

const Styles = {
  ButtonHolder: styled(Grid)`
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
    justify-content: center;
  `,
};

export function DeckEditor({
  isPrivate,
  deckName,
  selectedLeader,
  deckList,
  selectedBase,
  handleSetPrivate,
  handleDeckNameChange,
  handleAddCardToDeck,
  handleRemoveFromDeck,
  handleSelectCard,
  handleSave,
  handleReset,
}) {
  const [sortMethod, setSortMethod] = useState("cost");

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
          <Grid container alignItems="center" margin={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h6" align="center">
                Deck (
                {deckList.reduce((acc, current) => (acc += current.count), 0)}/
                50)
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <SortSelect
                sortMethod={sortMethod}
                setSortMethod={setSortMethod}
              />
            </Grid>
          </Grid>

          {deckList.length ? (
            sortList(deckList, sortMethod).map((card, idx) => (
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
        <Styles.ButtonHolder size={12}>
          <FormControlLabel
            control={
              <Switch
                checked={isPrivate}
                onChange={() => handleSetPrivate(!isPrivate)}
                name="Private"
              />
            }
            label="Private"
          />
        </Styles.ButtonHolder>
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
