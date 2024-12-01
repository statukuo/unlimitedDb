import {
  Button,
  FormControlLabel,
  Grid2 as Grid,
  Switch,
  Typography,
} from "@mui/material";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { ContentRowWithDivider } from "./RowDivider";
import { SWUListCard } from "./SWUListCard";
import { SWUCardDeckSmall } from "./SWUCardDeckSmall";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { sortList } from "../utils/sortCardList";
import { SortSelect } from "./SortSelect";
import { TextInput } from "./TextInput";

const Styles = {
  ButtonHolder: styled(Grid)`
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
    justify-content: center;
  `,
};

export const DeckEditor = forwardRef(
  (
    {
      loadedDeckName,
      loadedIsPrivate,
      selectedLeader,
      selectedBase,
      deckList,
      handleAddCardToDeck,
      handleRemoveFromDeck,
      handleSelectCard,
      handleSave,
      handleReset,
    },
    _ref
  ) => {
    const [sortMethod, setSortMethod] = useState("cost");
    const [isPrivate, setIsPrivate] = useState(true);
    const deckCount = useMemo(
      () => deckList.reduce((acc, current) => (acc += current.count), 0),
      [deckList]
    );
    const deckNameInput = useRef();

    const sortedList = useMemo(
      () => sortList(deckList, sortMethod),
      [deckList, sortMethod]
    );

    useEffect(() => {
      if (loadedIsPrivate !== undefined) {
        setIsPrivate(loadedIsPrivate);
      }
    }, []);

    useImperativeHandle(_ref, () => {
      return { isPrivate, deckName: deckNameInput.current.value };
    });

    return (
      <Grid container>
        <ContentRowWithDivider>
          <Grid size={12} sx={{ m: 2 }}>
            <TextInput
              label="Name"
              loadedInput={loadedDeckName}
              ref={deckNameInput}
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
                  Deck ({deckCount}/ 50)
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <SortSelect
                  sortMethod={sortMethod}
                  setSortMethod={setSortMethod}
                />
              </Grid>
            </Grid>

            {sortedList.length ? (
              sortedList.map((card, idx) => (
                <SWUCardDeckSmall
                  handleSelectCard={() => handleSelectCard(card)}
                  data={card}
                  key={idx}
                  editable
                  editableRemoveButtonFunction={() =>
                    handleRemoveFromDeck(card)
                  }
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
                  onChange={() => setIsPrivate(!isPrivate)}
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
);

DeckEditor.displayName = "DeckEditor";
