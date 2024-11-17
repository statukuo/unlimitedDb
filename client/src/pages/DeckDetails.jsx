import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
import { BasePage } from "./BasePage";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getDeck } from "../api/decks";
import { useCardList } from "../contexts/CardContex";

const Styles = {
  CardList: styled(Stack)`
    height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)";
    min-height: 100%;
    width: 100%;
    padding: 10px;
  `,
  Card: styled.img`
    margin-top: 10%;
    width: 100%;
  `,
  ButtonGroup: styled(ButtonGroup)`
    margin-left: 10%;
    margin-right: 10%;
    width: 80%;
  `,
};

export function DeckDetails() {
  const { deckId } = useParams();
  const { getCardData, cardList } = useCardList();
  const [deckData, setDeckData] = useState({});
  const [leader, setLeader] = useState({});
  const [base, setBase] = useState({});
  const [list, setList] = useState([]);
  const [sideboard, setSideboard] = useState([]);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        setDeckData(await getDeck(deckId));
      } catch (error) {
        console.warn(error);
        setDeckData({});
      }
    };

    fetchDeck();
  }, [deckId]);

  useEffect(() => {
    if (!deckData.title) {
      return;
    }

    setLeader(getCardData(deckData.leader.id));
    setBase(getCardData(deckData.base.id));

    setList(
      deckData.list.map((card) => {
        return {
          ...getCardData(card.id),
          count: card.count,
        };
      })
    );

    setSideboard(
      deckData.sideboard.map((card) => {
        return {
          ...getCardData(card.id),
          count: card.count,
        };
      })
    );
  }, [deckData, cardList]);

  if (!deckData.title) {
    return (
      <BasePage>
        <Typography>
          There is no matching deck on the DB for that deck
        </Typography>
      </BasePage>
    );
  }

  return (
    <BasePage>
      <Styles.CardList direction="column">
        <Typography variant="h2">{deckData.title}</Typography>
        <Grid container>
          <Grid size={{ xs: 12, md: 6 }} key="leader-base">
            <Styles.CardList direction="column">
              <img src={leader?.frontArt} alt="leader" />
              <img src={base?.frontArt} alt="base" />
            </Styles.CardList>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} key="cards">
            <Typography variant="h4" key="list">
              List
            </Typography>
            <Grid container>
              {list.map((card) => {
                return (
                  <Grid size={{ xs: 6, sm: 4, md: 2 }} key={card?.name}>
                    <Styles.Card src={card?.frontArt} alt="card" />
                    <Styles.ButtonGroup
                      variant="outlined"
                      aria-label="Basic button group"
                    >
                      <Button
                        variant={card.count === 1 ? "contained" : "outlined"}
                      >
                        1
                      </Button>
                      <Button
                        variant={card.count === 2 ? "contained" : "outlined"}
                      >
                        2
                      </Button>
                      <Button
                        variant={card.count === 3 ? "contained" : "outlined"}
                      >
                        3
                      </Button>
                    </Styles.ButtonGroup>
                  </Grid>
                );
              })}
            </Grid>
            <Typography variant="h4" key="sideboard">
              Sideboard
            </Typography>
            <Grid container>
              {sideboard.map((card) => {
                return (
                  <Grid size={{ xs: 6, sm: 4, md: 2 }} key={card?.name}>
                    <Styles.Card src={card?.frontArt} alt="sideboard" />
                    <Styles.ButtonGroup
                      variant="outlined"
                      aria-label="Basic button group"
                    >
                      <Button
                        variant={card.count === 1 ? "contained" : "outlined"}
                      >
                        1
                      </Button>
                      <Button
                        variant={card.count === 2 ? "contained" : "outlined"}
                      >
                        2
                      </Button>
                      <Button
                        variant={card.count === 3 ? "contained" : "outlined"}
                      >
                        3
                      </Button>
                    </Styles.ButtonGroup>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Styles.CardList>
    </BasePage>
  );
}
