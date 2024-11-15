import React, { useEffect, useState } from 'react';
import { getAllCards } from '../api/cards';
import { SWUCard } from '../components/SWUCard';
import styled from 'styled-components';
import { CardFilter } from '../components/CardFilter';
import { SidePanel } from '../components/SidePanel';
import { Grid2 as Grid } from '@mui/material';
import { BasePage } from './BasePage';

const Styles = {
  CardContainer: styled(Grid)`
    max-width: 1200px;
  `
};

export function LandingPage() {
  const [cardList, setCardList] = useState([]);
  const [ filters, setFilters] = useState({});

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
        <CardFilter onFilter={updateFilters}/>
      </SidePanel>

      <Styles.CardContainer container spacing={0.5} columns={12}>
        {cardList.map((card, idx)=> {
          return (<Grid item size={{ xs: 12, md: 6, lg: 4 }} key={idx}>
                    <SWUCard key={idx} data={card}/>
                  </Grid>);
          })}
      </Styles.CardContainer>
    </BasePage>
  );
}
