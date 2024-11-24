import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Fab,
  Grid2 as Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { BasePage } from "./BasePage";
import { useCardList } from "../contexts/CardContext";
import { useAuth } from "../contexts/AuthContext";
import { getUserDecks } from "../api/decks";
import { DeckUploader } from "../components/DeckUploader";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";
import { SWUCardDeckSmallest } from "../components/SWUCardDeckSmallest";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import InfiniteScroll from "react-infinite-scroll-component";

const PAGINATION = 5;

const Styles = {
  DeckContainer: styled(Grid)`
    max-width: 1800px;
    width: 100%;
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
  const theme = useTheme();
  const { getCardData, cardList } = useCardList();
  const navigate = useNavigate();

  const [userDeckList, setUserDeckList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentShowing, setCurrentShowing] = useState(PAGINATION);

  const renderSmall = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!isLoggedIn) {
      setUserDeckList([]);
      return;
    }

    const fetchUserDeckList = async () => {
      setUserDeckList(await getUserDecks());
    };

    fetchUserDeckList();
  }, [isLoggedIn]);

  useEffect(() => {
    setLoading(!cardList.length);
  }, [cardList]);

  const createDeckList = (deckList) => {
    if (loading) {
      return;
    }

    const leaderCardData = getCardData(deckList.leader.id);
    const baseCardData = getCardData(deckList.base.id);
    const listCardData = deckList.list.map(({ id, count }) => ({
      ...getCardData(id),
      count,
    }));
    const sideboardCardData = deckList.sideboard.map(({ id, count }) => ({
      ...getCardData(id),
      count,
    }));

    const renderDeckDetails = () => {
      if (renderSmall) {
        return null;
      }

      return [
        <Styles.CardList theme={theme} size={{ md: 6 }} key="list">
          <Grid container>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h4" align="center">
                List
              </Typography>
            </Grid>
            {listCardData.map((cardData, idx) => (
              <Grid size={{ xs: 12 }} key={idx}>
                <SWUCardDeckSmallest
                  handleSelectCard={() => {}}
                  data={cardData}
                  smallest
                />
              </Grid>
            ))}
          </Grid>
        </Styles.CardList>,
        <Styles.CardList theme={theme} size={{ md: 3 }} key="sideboard">
          <Typography variant="h4" align="center">
            Sideboard
          </Typography>
          {sideboardCardData.map((cardData, idx) => (
            <SWUCardDeckSmallest
              handleSelectCard={() => {}}
              data={cardData}
              key={idx}
            />
          ))}
        </Styles.CardList>,
      ];
    };

    return (
      <Styles.Deck key={deckList.title} elevation={24}>
        <Grid container>
          <Typography variant="h5">{deckList.title}</Typography>
          <Grid container>
            <Grid size={{ xs: 12, md: 3 }} alignContent="center">
              <Styles.CardImage
                src={leaderCardData?.frontArt}
                alt={leaderCardData?.name}
              />
              <Styles.CardImage
                src={baseCardData?.frontArt}
                alt={baseCardData?.name}
              />
              <Styles.DetailsButton
                variant="contained"
                onClick={() => navigate("/deck/" + deckList._id)}
              >
                View details
              </Styles.DetailsButton>
            </Grid>

            {renderDeckDetails()}
          </Grid>
        </Grid>
      </Styles.Deck>
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
          <Styles.DeckContainer container spacing={0.5}>
            {userDeckList.slice(0, currentShowing).map(createDeckList)}
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
