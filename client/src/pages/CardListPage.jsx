import React, { useState } from "react";
import { SWUCard } from "../components/SWUCard";
import styled from "styled-components";
import { CardFilter } from "../components/CardFilter";
import { SidePanel } from "../components/SidePanel";
import { Grid2 as Grid } from "@mui/material";
import { BasePage } from "./BasePage";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCardList } from "../contexts/CardContex";

const PAGINATION = 36;

const Styles = {
  CardContainer: styled(Grid)`
    max-width: 1800px;
  `,
};

export function CardListPage() {
  const { cardList, filteredList } = useCardList();
  const [currentShowing, setCurrentShowing] = useState(PAGINATION);

  return (
    <BasePage>
      <SidePanel>
        <CardFilter />
      </SidePanel>

      <InfiniteScroll
        dataLength={currentShowing} //This is important field to render the next data
        next={() =>
          setCurrentShowing(
            Math.min(currentShowing + PAGINATION, cardList.length)
          )
        }
        hasMore={currentShowing < cardList.length}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Styles.CardContainer container spacing={0.5} columns={12}>
          {(filteredList.length ? filteredList : cardList)
            .slice(0, currentShowing)
            .map((card, idx) => {
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2, xl: 1 }} key={idx}>
                  <SWUCard key={idx} data={card} />
                </Grid>
              );
            })}
        </Styles.CardContainer>
      </InfiniteScroll>
    </BasePage>
  );
}
