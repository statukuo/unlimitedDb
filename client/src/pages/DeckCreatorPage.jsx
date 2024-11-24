import React, { useEffect, useState } from "react";
import { SWUListCard } from "../components/SWUListCard";
import styled from "styled-components";
import { CardFilter } from "../components/CardFilter";
import { SidePanel } from "../components/SidePanel";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid2 as Grid,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { BasePage } from "./BasePage";
import { useCardList } from "../contexts/CardContext";
import { Loading } from "../components/Loading";
import { CardDialog } from "../components/CardDialog";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { COLORS } from "../constants";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { DeckEditor } from "../components/DeckEditor";
import { BottomPanel } from "../components/BottomPanel";
import { uploadDeck } from "../api/decks";
import { useNavigate } from "react-router-dom";

const PAGINATION = 36;
const ACCORDION_SPEED = 500;

const Styles = {
  CardContainer: styled(Grid)`
    margin-top: 30px;
    ${(props) => props.theme.breakpoints.down("md")} {
      margin-top: 10px;
    }
  `,
  DeckContiner: styled(Grid)`
    padding-left: 10px;
    padding-right: 10px;
  `,
  AddToDeckControls: styled(Box)`
    width: 90%;
    display: inline-flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
    border: 1px solid;
    border-color: ${COLORS.TAG_BACKGROUND};
    border-radius: 12px;
    margin: 0 5%;
    margin-top: -10%;
    border-top: none;
  `,
};

export function DeckCreatorPage({ deckData }) {
  const theme = useTheme();
  const renderMedium = useMediaQuery(theme.breakpoints.down("md"));

  const {
    filteredList,
    filter,
    fetchingCards,
    applyFilters,
    possibleFilters,
    getCardData,
    possibleLeaders,
    possibleBases,
  } = useCardList();
  const [currentShowing, setCurrentShowing] = useState(PAGINATION);
  const [clickedCard, setClickedCard] = useState(false);
  const [expanded, setExpanded] = React.useState("leader");
  const [deckName, setDeckName] = useState("Change this");
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [selectedBase, setSelectedBase] = useState(null);
  const [deckList, setDeckList] = useState([]);
  const [deckListCount, setDeckListCount] = useState({});
  const [needToLoadDeck, setNeedToLoadDeck] = useState(!!deckData);
  const [isPrivate, setIsPrivate] = useState(true);
  const navigate = useNavigate();
  const convertId = (n) => String(n).padStart(3, "0");

  useEffect(() => {
    if (!possibleFilters?.aspects) {
      return;
    }

    if (deckData?.leader && deckData?.base) {
      setSelectedLeader(getCardData(deckData.leader.id));
      setSelectedBase(getCardData(deckData.base.id));

      applyFilters(
        {
          ...filter,
          aspectsStrict: "EXCLUDE",
          aspects: possibleFilters.aspects.options.filter(
            (aspect) =>
              !(
                getCardData(deckData.leader.id).aspects.includes(aspect) ||
                getCardData(deckData.base.id).aspects.includes(aspect)
              )
          ),
        },
        "aspect",
        true
      );
    }

    if (deckData?.name) {
      setDeckName(deckData.name);
    }

    setIsPrivate(!!deckData?.private);

    if (deckData?.list) {
      setDeckList(
        deckData.list.map(({ id, count }) => ({
          ...getCardData(id),
          count,
        }))
      );
      const tempDeckListCount = {};

      deckData.list.forEach(({ id, count }) => {
        tempDeckListCount[id] = count;
      });

      setDeckListCount(tempDeckListCount);

      setExpanded("cards");
      setNeedToLoadDeck(false);
    }
  }, [deckData, possibleFilters]);

  const handleExpandAccordion = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleSelectCard = (card) => {
    setClickedCard(card);
  };
  const handleCloseDialog = () => {
    setClickedCard(false);
  };

  const handleSelectLeader = (card) => {
    setSelectedLeader(card);
    setExpanded(card ? "base" : "leader");

    if (selectedBase && card) {
      applyFilters(
        {
          ...filter,
          aspectsStrict: "EXCLUDE",
          aspects: possibleFilters.aspects.options.filter(
            (aspect) =>
              !(
                selectedBase.aspects.includes(aspect) ||
                card.aspects.includes(aspect)
              )
          ),
        },
        "aspect",
        true
      );
    }
  };

  const handleSelectBase = (card) => {
    setSelectedBase(card);
    setExpanded(card ? "cards" : "base");

    if (selectedLeader && card) {
      applyFilters(
        {
          ...filter,
          aspectsStrict: "EXCLUDE",
          aspects: possibleFilters.aspects.options.filter(
            (aspect) =>
              !(
                selectedLeader.aspects.includes(aspect) ||
                card.aspects.includes(aspect)
              )
          ),
        },
        "aspect",
        true
      );
    }
  };

  const handleAddCardToDeck = (card) => {
    const tempDeckListCount = { ...deckListCount };
    if (tempDeckListCount[card.set + "_" + convertId(card.number)]) {
      tempDeckListCount[card.set + "_" + convertId(card.number)] += 1;
    } else {
      tempDeckListCount[card.set + "_" + convertId(card.number)] = 1;
    }

    setDeckListCount(tempDeckListCount);

    if (deckList.some(({ _id }) => _id === card._id)) {
      setDeckList(
        deckList.map((deckCard) => {
          if (deckCard._id === card._id) {
            return {
              ...card,
              count: deckCard.count + 1,
            };
          }

          return deckCard;
        })
      );

      return;
    }

    setDeckList([...deckList, { ...card, count: 1 }]);
  };

  const handleRemoveFromDeck = (card) => {
    setDeckList(
      deckList
        .filter(({ _id, count }) => !(_id === card._id && count === 1))
        .map((deckCard) => {
          if (deckCard._id === card._id) {
            return {
              ...card,
              count: deckCard.count - 1,
            };
          }

          return deckCard;
        })
    );

    const tempDeckListCount = { ...deckListCount };

    if (tempDeckListCount[card.set + "_" + convertId(card.number)]) {
      tempDeckListCount[card.set + "_" + convertId(card.number)] -= 1;
      setDeckListCount(tempDeckListCount);
    }
  };

  const handleSave = async () => {
    const deckToUpload = {};

    if (deckData._id) {
      deckToUpload._id = deckData._id;
    }

    deckToUpload.metadata = {
      name: deckName,
    };
    deckToUpload.leader = {
      id: selectedLeader.set + "_" + convertId(selectedLeader.number),
      count: 1,
    };
    deckToUpload.base = {
      id: selectedBase.set + "_" + convertId(selectedBase.number),
      count: 1,
    };
    deckToUpload.sideboard = [];
    deckToUpload.deck = deckList.map(({ count, set, number }) => {
      return {
        id: set + "_" + convertId(number),
        count,
      };
    });

    const res = await uploadDeck(JSON.stringify(deckToUpload), isPrivate);

    navigate("/deck/" + res._id);
  };

  const handleReset = () => {
    setDeckList([]);
    setDeckListCount({});
    setSelectedBase();
    setSelectedLeader();
    setExpanded("leader");
  };

  const renderDeckEditor = () => {
    const deckEditor = (
      <DeckEditor
        isPrivate={isPrivate}
        selectedLeader={selectedLeader}
        deckName={deckName}
        deckList={deckList}
        selectedBase={selectedBase}
        handleSetPrivate={setIsPrivate}
        handleDeckNameChange={setDeckName}
        handleAddCardToDeck={handleAddCardToDeck}
        handleRemoveFromDeck={handleRemoveFromDeck}
        handleSelectCard={handleSelectCard}
        handleReset={handleReset}
        handleSave={handleSave}
      ></DeckEditor>
    );

    if (renderMedium) {
      return (
        <BottomPanel
          title={`Deck size ${deckList.reduce(
            (acc, current) => (acc += current.count),
            0
          )} / 50`}
        >
          {deckEditor}
        </BottomPanel>
      );
    }

    return (
      <Styles.DeckContiner size={4} theme={theme}>
        <Paper elevation={24}>{deckEditor}</Paper>
      </Styles.DeckContiner>
    );
  };

  return (
    <BasePage>
      <Loading loadCondition={(deckData && fetchingCards) || needToLoadDeck}>
        <SidePanel extraBottom={renderMedium}>
          <CardFilter activeFilters={filter} />
        </SidePanel>
        <CardDialog
          cardData={clickedCard}
          handleCloseDialog={handleCloseDialog}
        />

        <Styles.CardContainer container spacing={2} theme={theme}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Accordion
              expanded={expanded === "leader"}
              onChange={handleExpandAccordion("leader")}
              TransitionProps={{
                timeout: ACCORDION_SPEED,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="leader-content"
                id="leader-header"
              >
                Leader
              </AccordionSummary>
              <AccordionDetails>
                <Grid container>
                  {possibleLeaders.map((card, idx) => {
                    return (
                      <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={idx}>
                        <SWUListCard
                          key={idx}
                          data={card}
                          onClick={() => handleSelectCard(card)}
                        />

                        <Styles.AddToDeckControls>
                          <IconButton
                            size="small"
                            disabled={
                              !selectedLeader || card._id !== selectedLeader._id
                            }
                            onClick={() => handleSelectLeader()}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography>
                            {card._id === selectedLeader?._id ? 1 : 0}
                          </Typography>
                          <IconButton
                            size="small"
                            disabled={!!selectedLeader}
                            onClick={() => handleSelectLeader(card)}
                          >
                            <AddIcon />
                          </IconButton>
                        </Styles.AddToDeckControls>
                      </Grid>
                    );
                  })}
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "base"}
              onChange={handleExpandAccordion("base")}
              TransitionProps={{
                timeout: ACCORDION_SPEED,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="base-content"
                id="base-header"
              >
                Base
              </AccordionSummary>
              <AccordionDetails>
                <Grid container>
                  {possibleBases.map((card, idx) => {
                    return (
                      <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={idx}>
                        <SWUListCard
                          key={idx}
                          data={card}
                          onClick={() => handleSelectCard(card)}
                        />
                        <Styles.AddToDeckControls>
                          <IconButton
                            size="small"
                            disabled={
                              !selectedBase || card._id !== selectedBase._id
                            }
                            onClick={() => handleSelectBase()}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography>
                            {card._id === selectedBase?._id ? 1 : 0}
                          </Typography>
                          <IconButton
                            size="small"
                            disabled={!!selectedBase}
                            onClick={() => handleSelectBase(card)}
                          >
                            <AddIcon />
                          </IconButton>
                        </Styles.AddToDeckControls>
                      </Grid>
                    );
                  })}
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "cards"}
              onChange={handleExpandAccordion("cards")}
              TransitionProps={{
                timeout: ACCORDION_SPEED,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="card-content"
                id="cards-header"
              >
                Cards
              </AccordionSummary>
              <AccordionDetails>
                <Loading loadCondition={fetchingCards}>
                  <Grid container>
                    <InfiniteScroll
                      dataLength={currentShowing} //This is important field to render the next data
                      next={() =>
                        setCurrentShowing(
                          Math.min(
                            currentShowing + PAGINATION,
                            filteredList.length
                          )
                        )
                      }
                      hasMore={currentShowing < filteredList.length}
                      loader={<h4>Loading...</h4>}
                      endMessage={
                        <p style={{ textAlign: "center" }}>
                          <b>Yay! You have seen it all</b>
                        </p>
                      }
                    >
                      <Grid container spacing={0.5} columns={12}>
                        {filteredList
                          .slice(0, currentShowing)
                          .map((card, idx) => {
                            return (
                              <Grid
                                size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
                                key={idx}
                              >
                                <SWUListCard
                                  key={idx}
                                  data={card}
                                  onClick={() => handleSelectCard(card)}
                                />
                                <Styles.AddToDeckControls>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleRemoveFromDeck(card)}
                                  >
                                    <RemoveIcon />
                                  </IconButton>
                                  <Typography>
                                    {deckListCount[
                                      card.set + "_" + convertId(card.number)
                                    ] || 0}
                                  </Typography>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleAddCardToDeck(card)}
                                  >
                                    <AddIcon />
                                  </IconButton>
                                </Styles.AddToDeckControls>
                              </Grid>
                            );
                          })}
                      </Grid>
                    </InfiniteScroll>
                  </Grid>
                </Loading>
              </AccordionDetails>
            </Accordion>
          </Grid>
          {renderDeckEditor()}
        </Styles.CardContainer>
      </Loading>
    </BasePage>
  );
}
