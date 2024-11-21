import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Grid2 as Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { BasePage } from "./BasePage";
import { useCardList } from "../contexts/CardContext";
import { useAuth } from "../contexts/AuthContext";
import { getUserDecks } from "../api/decks";
import { DeckUploader } from "../components/DeckUploader";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";
import { SWUCardDeck } from "../components/SWUCardDeck";

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
};

export function LandingPage() {
  const { isLoggedIn } = useAuth();
  const theme = useTheme();
  const { getCardData, cardList } = useCardList();
  const navigate = useNavigate();

  const [userDeckList, setUserDeckList] = useState([]);
  const [loading, setLoading] = useState(true);

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

            <Styles.CardList theme={theme} size={{ md: 6 }}>
              <Grid container>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h4" align="center">
                    List
                  </Typography>
                </Grid>
                {listCardData.map((cardData, idx) => (
                  <Grid size={{ xs: 6 }} key={idx}>
                    <SWUCardDeck
                      handleSelectCard={() => {}}
                      data={cardData}
                      forceSmall={true}
                    />
                  </Grid>
                ))}
              </Grid>
            </Styles.CardList>
            <Styles.CardList theme={theme} size={{ md: 3 }}>
              <Typography variant="h4" align="center">
                Sideboard
              </Typography>
              {sideboardCardData.map((cardData, idx) => (
                <SWUCardDeck
                  handleSelectCard={() => {}}
                  data={cardData}
                  forceSmall={true}
                  key={idx}
                />
              ))}
            </Styles.CardList>
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
        <Styles.DeckContainer container spacing={0.5}>
          {userDeckList.map(createDeckList)}
        </Styles.DeckContainer>
        {isLoggedIn ? <DeckUploader /> : notLoggedInMessage()}
      </Loading>
    </BasePage>
  );
}
