import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { getAllCards } from '../api/cards';
import { SWUCard } from '../components/SWUCard';
import styled from 'styled-components';
import { CardFilter } from '../components/CardFilter';
import { SidePanel } from '../components/SidePanel';

const Styles = {
  LandingPage: styled.div`
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  CardContainer: styled.div`
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-columns: 1fr;
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

      <Styles.CardContainer>
        {cardList.map((card, idx)=> { return <SWUCard key={idx} data={card}/>;})}
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
