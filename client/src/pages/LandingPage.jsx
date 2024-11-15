import React, { useEffect, useState } from "react";
import { getAllCards } from "../api/cards";
import { SWUCard } from "../components/SWUCard";
import styled from "styled-components";
import { CardFilter } from "../components/CardFilter";
import { SidePanel } from "../components/SidePanel";
import { Grid2 as Grid } from "@mui/material";
import { BasePage } from "./BasePage";
import InfiniteScroll from "react-infinite-scroll-component";

const PAGINATION = 20;

const Styles = {
  CardContainer: styled(Grid)`
    max-width: 1800px;
  `,
};

export function LandingPage() {
  const [cardList, setCardList] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentShowing, setCurrentShowing] = useState(PAGINATION);

  useEffect(() => {
    async function fetchData() {
      setCardList(await getAllCards(filters));
    }
    fetchData();
  }, [filters]);

  const updateFilters = (filters) => {
    setFilters(filters);
  };

  return (
    <BasePage>
      <SidePanel>
        <CardFilter onFilter={updateFilters} />
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
          {cardList.slice(0, currentShowing).map((card, idx) => {
            return (
              <Grid item size={{ xs: 12, md: 6, lg: 4, xl: 2 }} key={idx}>
                <SWUCard key={idx} data={card} />
              </Grid>
            );
          })}
        </Styles.CardContainer>
      </InfiniteScroll>
    </BasePage>
  );
}
