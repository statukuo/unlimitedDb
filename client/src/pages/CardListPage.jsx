import React, { useState } from "react";
import { SWUListCard } from "../components/SWUListCard";
import styled from "styled-components";
import { CardFilter } from "../components/CardFilter";
import { SidePanel } from "../components/SidePanel";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2 as Grid,
  IconButton,
} from "@mui/material";
import { BasePage } from "./BasePage";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCardList } from "../contexts/CardContext";
import { Loading } from "../components/Loading";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const PAGINATION = 36;

const Styles = {
  CardContainer: styled(Grid)`
    max-width: 1200px;
  `,
};

export function CardListPage() {
  const { filteredList, filter, fetchingCards } = useCardList();
  const [currentShowing, setCurrentShowing] = useState(PAGINATION);
  const [clickedCard, setClickedCard] = useState(false);

  const handleSelectCard = (card) => {
    setClickedCard(card);
  };
  const handleCloseDialog = () => {
    setClickedCard(false);
  };

  const navigate = useNavigate();
  return (
    <BasePage>
      <SidePanel>
        <CardFilter activeFilters={filter} />
      </SidePanel>

      <Dialog
        onClose={handleCloseDialog}
        aria-labelledby="customized-dialog-title"
        open={clickedCard}
      >
        <DialogTitle sx={{ m: 0, p: 1 }} id="customized-dialog-title">
          {clickedCard.name}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ padding: 0 }}>
          <SWUListCard data={clickedCard} />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() =>
              navigate(`/cards/${clickedCard.set}_${clickedCard.number}`)
            }
          >
            Go to details
          </Button>
        </DialogActions>
      </Dialog>

      <Loading loadCondition={fetchingCards}>
        <InfiniteScroll
          dataLength={currentShowing} //This is important field to render the next data
          next={() =>
            setCurrentShowing(
              Math.min(currentShowing + PAGINATION, filteredList.length)
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
          <Styles.CardContainer container spacing={0.5} columns={12}>
            {filteredList.slice(0, currentShowing).map((card, idx) => {
              return (
                <Grid
                  size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
                  key={idx}
                  onClick={() => handleSelectCard(card)}
                >
                  <SWUListCard key={idx} data={card} />
                </Grid>
              );
            })}
          </Styles.CardContainer>
        </InfiniteScroll>
      </Loading>
    </BasePage>
  );
}
