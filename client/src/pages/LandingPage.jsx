import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card, Grid2 as Grid, Typography } from "@mui/material";
import { BasePage } from "./BasePage";
import { useCardList } from "../contexts/CardContex";
import { useAuth } from "../contexts/AuthContext";
import { getUserDecks } from "../api/decks";
import { DeckUploader } from "../components/DeckUploader";

const Styles = {
  CardContainer: styled(Grid)`
    max-width: 1800px;
  `,
  Card: styled(Card)`
    margin: 10px;
  `,
  CardImage: styled.img`
    width: 100%;
    display: block;
  `,
};

export function LandingPage() {
  const { isLoggedIn } = useAuth();
  const { getCard } = useCardList();

  const [userDeckList, setUserDeckList] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const fetchUserDeckList = async () => {
      setUserDeckList(await getUserDecks());
    };

    fetchUserDeckList();
  }, [isLoggedIn]);

  const createDeckList = (deckList) => {
    console.log(deckList);
    const leaderCardData = getCard(deckList.leader.id);
    const baseCardData = getCard(deckList.base.id);

    return (
      <Styles.Card key={deckList.title}>
        <Typography variant="h5">{deckList.title}</Typography>
        <Grid container>
          <Grid size={6}>
            <Styles.CardImage
              src={leaderCardData?.frontArt}
              alt={leaderCardData?.name}
            />
          </Grid>
          <Grid size={6}>
            <Styles.CardImage
              src={baseCardData?.frontArt}
              alt={baseCardData?.name}
            />
          </Grid>
        </Grid>
      </Styles.Card>
    );
  };

  return (
    <BasePage>
      <Styles.CardContainer container spacing={0.5} columns={2}>
        {userDeckList.map(createDeckList)}
      </Styles.CardContainer>

      {isLoggedIn ? <DeckUploader /> : null}
    </BasePage>
  );
}
