import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { getAllCards } from '../api/cards';
import { SWUCard } from '../components/SWUCard';
import styled from 'styled-components';
import { CardFilter } from '../components/CardFilter';
import { SidePanel } from '../components/SidePanel';
import { Grid2 as Grid } from '@mui/material';

const Styles = {
  LandingPage: styled.div`
    width: 100vw;
    min-height: 100vh;
    align-items: center;
  `,
  CardContainer: styled(Grid)`
    max-width: 1200px;
  `
};

export function LandingPage() {
  const { isLoggedIn } = useAuth();
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
    <Styles.LandingPage className='LandingPage'>
      <Header />

      {isLoggedIn ? <LoggedInText /> : <LoggedOutText />}

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
    </Styles.LandingPage>
  );
}

const LoggedInText = () => {
  const { account } = useAuth();

  return <p>Hey, {account.username}! I'm happy to let you know: you are authenticated!</p>;
};

const LoggedOutText = () => (
  <p>Don't forget to start your backend server, then authenticate yourself.</p>
);
