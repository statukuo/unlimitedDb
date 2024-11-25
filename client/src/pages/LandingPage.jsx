import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Fab, Grid2 as Grid, Paper, Typography } from "@mui/material";
import { BasePage } from "./BasePage";
import { useCardList } from "../contexts/CardContext";
import { useAuth } from "../contexts/AuthContext";
import { getLatestDecks } from "../api/decks";
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
    margin-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
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

export function LandingPage() {
  const { isLoggedIn } = useAuth();
  const { getCardData, cardList } = useCardList();
  const navigate = useNavigate();

  const [deckLists, setDeckLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentShowing, setCurrentShowing] = useState(PAGINATION);

  useEffect(() => {
    const fetchDeckLists = async () => {
      setDeckLists(await getLatestDecks());
    };

    fetchDeckLists();
  }, []);

  useEffect(() => {
    setLoading(!cardList.length);
  }, [cardList]);

  const createDeckList = (deckList) => {
    if (loading) {
      return;
    }

    const leaderCardData = getCardData(deckList.leader.id);
    const baseCardData = getCardData(deckList.base.id);

    return (
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <DeckTile
          likeCount={deckList.likeCount.length}
          commentCount={deckList.comments.length}
          leader={leaderCardData}
          aspects={[...baseCardData.aspects, ...leaderCardData.aspects]}
          title={deckList.title}
          deckId={deckList._id}
        />
      </Grid>
    );
  };

  const notLoggedInMessage = () => {
    return (
      <div>
        <Typography>
          You are not logged in, if you want to upload a deck, please log in:
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Typography>Or you can always check out the cards database</Typography>
        <Button variant="contained" onClick={() => navigate("/cards")}>
          Go to cards
        </Button>
      </div>
    );
  };

  return (
    <BasePage>
      <Loading loadCondition={loading}>
        <InfiniteScroll
          dataLength={currentShowing} //This is important field to render the next data
          next={() =>
            setCurrentShowing(
              Math.min(currentShowing + PAGINATION, deckLists.length)
            )
          }
          hasMore={currentShowing < deckLists.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Styles.DeckContainer container spacing={2}>
            {deckLists.slice(0, currentShowing).map(createDeckList)}
          </Styles.DeckContainer>
        </InfiniteScroll>
        {isLoggedIn ? <DeckUploader /> : notLoggedInMessage()}

        {isLoggedIn ? (
          <Styles.CreateButton
            color="success"
            aria-label="add"
            onClick={() => navigate("/deck/create")}
          >
            <NoteAddIcon />
          </Styles.CreateButton>
        ) : null}
      </Loading>
    </BasePage>
  );
}
