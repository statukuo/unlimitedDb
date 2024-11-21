import React, { useState } from "react";
import { SWUListCard } from "../components/SWUListCard";
import styled from "styled-components";
import { CardFilter } from "../components/CardFilter";
import { SidePanel } from "../components/SidePanel";
import { Grid2 as Grid } from "@mui/material";
import { BasePage } from "./BasePage";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCardList } from "../contexts/CardContext";
import { Loading } from "../components/Loading";
import { CardDialog } from "../components/CardDialog";

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

  return (
    <BasePage>
      <SidePanel>
        <CardFilter activeFilters={filter} />
      </SidePanel>

      <CardDialog
        cardData={clickedCard}
        handleCloseDialog={handleCloseDialog}
        showCollection={true}
      />

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
