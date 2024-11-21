import React, { useEffect, useState } from "react";
import {
  ButtonGroup,
  FormControl,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { BasePage } from "./BasePage";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getDeck } from "../api/decks";
import { useCardList } from "../contexts/CardContext";
import { Loading } from "../components/Loading";
import { ContentRowWithDivider } from "../components/RowDivider";
import { times } from "lodash";
import LensOutlinedIcon from "@mui/icons-material/LensOutlined";
import LensIcon from "@mui/icons-material/Lens";
import { AspectIcons } from "../components/AspectIcons";
import {
  ASPECT_ORDER,
  RARITY_ORDER,
  SET_ORDER,
  TYPE_ORDER,
} from "../constants";

const Styles = {
  CardList: styled(Grid)`
    position: relative;
  `,
  Card: styled.img`
    width: 80%;
    position: ${(props) => (props.id === 1 ? "relative" : "absolute")};
    margin-left: ${(props) => props.id * 5 + "%"};
    margin-top: ${(props) => (3 - props.id) * 5 + "%"};
    border-radius: 12px;
  `,
  ButtonGroup: styled(ButtonGroup)`
    margin-left: 10%;
    margin-right: 10%;
    width: 80%;
  `,
  Image: styled.img`
    width: 100%;
    border-radius: 12px;
  `,
  ImageCard: styled(Paper)`
    margin: 10px;
    border-radius: 12px;
    line-height: 0;
    display: flex;
  `,
  Title: styled(Typography)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    flex-direction: column;
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
  const [deckDoesNotExist, setDeckDoesNotExist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortMethod, setSortMethod] = useState("cost");

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        setDeckData(await getDeck(deckId));
      } catch (error) {
        console.warn(error);
        setDeckData({});
        setDeckDoesNotExist(true);
      }
    };

    fetchDeck();
  }, [deckId]);

  useEffect(() => {
    if (!deckData.title || !cardList.length) {
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

    setLoading(false);
  }, [deckData, cardList]);

  useEffect(() => {
    const sortList = (array, sortCriteria) => {
      return [...array].sort((a, b) => {
        if (sortCriteria === "aspect") {
          return (
            ASPECT_ORDER[a.aspects.join("_")] -
              ASPECT_ORDER[b.aspects.join("_")] ||
            SET_ORDER[a.set] - SET_ORDER[b.set] ||
            a.number - b.number
          );
        }

        if (sortCriteria === "cost") {
          return (
            a.cost - b.cost ||
            SET_ORDER[a.set] - SET_ORDER[b.set] ||
            a.number - b.number
          );
        }

        if (sortCriteria === "set") {
          return SET_ORDER[a.set] - SET_ORDER[b.set] || a.number - b.number;
        }

        if (sortCriteria === "type") {
          return (
            TYPE_ORDER[a.type] - TYPE_ORDER[b.type] ||
            SET_ORDER[a.set] - SET_ORDER[b.set] ||
            a.number - b.number
          );
        }

        if (sortCriteria === "rarity") {
          return (
            RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity] ||
            ASPECT_ORDER[a.aspects.join("_")] -
              ASPECT_ORDER[b.aspects.join("_")] ||
            SET_ORDER[a.set] - SET_ORDER[b.set] ||
            a.number - b.number
          );
        }
      });
    };

    setList(sortList(list, sortMethod));
    setSideboard(sortList(sideboard, sortMethod));
  }, [sortMethod]);

  const cardCount = (count) => {
    return (
      <Typography align="center">
        {times(3).map((_, idx) => {
          if (idx < count) {
            return <LensIcon key={idx}></LensIcon>;
          }
          return <LensOutlinedIcon key={idx}></LensOutlinedIcon>;
        })}
      </Typography>
    );
  };

  if (deckDoesNotExist) {
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
      <Loading loadCondition={loading}>
        <Grid container>
          <ContentRowWithDivider>
            <Grid size={{ xs: 10 }} offset={{ xs: 1 }}>
              <Styles.Title variant="h4">
                <div>
                  {!loading ? (
                    <AspectIcons
                      aspects={[...leader.aspects, ...base.aspects]}
                    ></AspectIcons>
                  ) : null}
                </div>
                {deckData.title}
              </Styles.Title>
            </Grid>
          </ContentRowWithDivider>
          <ContentRowWithDivider>
            <Grid size={{ xs: 10, sm: 4 }} offset={{ xs: 1, md: 2 }}>
              <Styles.ImageCard elevation={24}>
                <Styles.Image src={leader.frontArt} alt={leader.name} />
              </Styles.ImageCard>
            </Grid>
            <Grid size={{ xs: 10, sm: 4 }} offset={{ xs: 1, md: 0 }}>
              <Styles.ImageCard elevation={24}>
                <Styles.Image src={base.frontArt} alt={base.name} />
              </Styles.ImageCard>
            </Grid>
          </ContentRowWithDivider>
          <ContentRowWithDivider>
            <Grid size={{ xs: 5 }} offset={{ xs: 2, md: 3 }}>
              <Typography align="center">
                Deck ({list.reduce((acc, currnet) => acc + currnet.count, 0)} /
                50)
              </Typography>
            </Grid>
            <Grid size={{ xs: 4, md: 2 }} offset={{ xs: 0, md: 1 }}>
              <FormControl fullWidth>
                <InputLabel>Sort Method</InputLabel>
                <Select
                  value={sortMethod}
                  label="Sort method"
                  onChange={(event) => setSortMethod(event.target.value)}
                >
                  <MenuItem value={"cost"}>Cost</MenuItem>
                  <MenuItem value={"aspect"}>Aspect</MenuItem>
                  <MenuItem value={"set"}>Set</MenuItem>
                  <MenuItem value={"type"}>Type</MenuItem>
                  <MenuItem value={"rarity"}>Rarity</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </ContentRowWithDivider>
          <ContentRowWithDivider>
            {list.map((card) => {
              return (
                <Styles.CardList
                  size={{ xs: 6, sm: 4, md: 2 }}
                  key={card?.name}
                >
                  {times(card.count).map((_, idx) => (
                    <Styles.Card
                      src={card?.frontArt}
                      alt="sideboard"
                      key={idx}
                      id={card.count - idx}
                    />
                  ))}
                  {cardCount(card.count)}
                </Styles.CardList>
              );
            })}
          </ContentRowWithDivider>
          <ContentRowWithDivider>
            <Grid size={{ xs: 10 }} offset={{ xs: 1 }}>
              <Typography align="center">
                Sideboard (
                {sideboard.reduce((acc, currnet) => acc + currnet.count, 0)} /
                10)
              </Typography>
            </Grid>
          </ContentRowWithDivider>
          <ContentRowWithDivider>
            {sideboard.map((card) => {
              return (
                <Styles.CardList
                  size={{ xs: 6, sm: 4, md: 2 }}
                  key={card?.name}
                >
                  {times(card.count).map((_, idx) => (
                    <Styles.Card
                      src={card?.frontArt}
                      alt="sideboard"
                      key={idx}
                      id={card.count - idx}
                    />
                  ))}
                  {cardCount(card.count)}
                </Styles.CardList>
              );
            })}
          </ContentRowWithDivider>
        </Grid>
      </Loading>
    </BasePage>
  );
}
