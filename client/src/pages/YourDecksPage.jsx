import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Grid2 as Grid,
  Paper,
} from "@mui/material";
import { BasePage } from "./BasePage";
import { useCardList } from "../contexts/CardContext";
import { useAuth } from "../contexts/AuthContext";
import { deleteDeck, getUserDecks } from "../api/decks";
import { DeckUploader } from "../components/DeckUploader";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import InfiniteScroll from "react-infinite-scroll-component";
import { DeckTile } from "../components/DeckTile";

const PAGINATION = 20;

const Styles = {
  DeckContainer: styled(Grid)`
    max-width: 1800px;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 10px;
  `,
  Deck: styled(Paper)`
    margin: 10px 20px;
    padding: 30px;
    border-radius: 12px;
  `,
  CardImage: styled.img`
    margin: 5%;
    width: 90%;
    display: block;
  `,
  DetailsButton: styled(Button)`
    margin-left: auto;
    margin-right: auto;
    display: block;
  `,
  CardList: styled(Grid)`
    ${(props) => props.theme.breakpoints.down("md")} {
      display: none;
    }
  `,
  CreateButton: styled(Fab)`
    position: fixed;
    bottom: 50px;
    right: 0;
    width: 70px;
    border-radius: 25px 0 0 25px;
    z-index: 50;
  `,
};

export function YourDecksPage() {
  const { isLoggedIn } = useAuth();
  const { getCardData, cardList } = useCardList();
  const navigate = useNavigate();

  const [userDeckList, setUserDeckList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentShowing, setCurrentShowing] = useState(PAGINATION);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deckToDelete, setDeckToDelete] = useState();

  const fetchUserDeckList = async () => {
    setUserDeckList(await getUserDecks());
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setUserDeckList([]);
      return;
    }

    fetchUserDeckList();
  }, [isLoggedIn]);

  useEffect(() => {
    setLoading(!cardList.length);
  }, [cardList]);

  const handleOpenDeleteDialog = (title, deckId) => {
    setDeleteDialogOpen(true);
    setDeckToDelete({ title, _id: deckId });
  };

  const handleClose = () => {
    setDeleteDialogOpen(false);
    setDeckToDelete();
  };

  const handleDeleteDeck = async () => {
    await deleteDeck(deckToDelete._id);
    handleClose();
    fetchUserDeckList();
  };

  const createDeckList = (deckList) => {
    if (loading) {
      return;
    }

    const leaderCardData = getCardData(deckList.leader.id);
    const baseCardData = getCardData(deckList.base.id);

    return (
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <DeckTile
          leader={leaderCardData}
          aspects={[...baseCardData.aspects, ...leaderCardData.aspects]}
          title={deckList.title}
          deckId={deckList._id}
          deleteEnabled={true}
          handleOpenDeleteDialog={handleOpenDeleteDialog}
        />
      </Grid>
    );
  };

  return (
    <BasePage>
      <Loading loadCondition={loading}>
        <Dialog
          open={deleteDialogOpen}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            {"Are you sure do you want to delete this deck?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Deleting this deck will remove any possibility to have it back.
              Once "{deckToDelete?.title}" is deleted, is gone forever.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDeleteDeck}>Delete</Button>
          </DialogActions>
        </Dialog>

        <InfiniteScroll
          dataLength={currentShowing} //This is important field to render the next data
          next={() =>
            setCurrentShowing(
              Math.min(currentShowing + PAGINATION, userDeckList.length)
            )
          }
          hasMore={currentShowing < userDeckList.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Styles.DeckContainer container spacing={2}>
            {userDeckList.slice(0, currentShowing).map(createDeckList)}
          </Styles.DeckContainer>
        </InfiniteScroll>
        <DeckUploader />

        <Styles.CreateButton
          color="success"
          aria-label="add"
          onClick={() => navigate("/deck/create")}
        >
          <NoteAddIcon />
        </Styles.CreateButton>
      </Loading>
    </BasePage>
  );
}
