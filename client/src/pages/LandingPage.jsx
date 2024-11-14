import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { getAllCards } from '../api/cards';
import { SWUCard } from '../components/SWUCard';
import styled from 'styled-components';

const StyledLandingPage = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCardContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-columns: 1fr;
`;

export function LandingPage() {
  const { isLoggedIn } = useAuth();
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setCardList(await getAllCards());
    }
    fetchData();
  }, []);

  return (
    <StyledLandingPage className='LandingPage'>
      <Header />

      {isLoggedIn ? <LoggedInText /> : <LoggedOutText />}

      <StyledCardContainer>
        {cardList.map((card, idx)=> { return <SWUCard key={idx} data={card}/>;})}
      </StyledCardContainer>
    </StyledLandingPage>
  );
}

const LoggedInText = () => {
  const { account } = useAuth();

  return <p>Hey, {account.username}! I'm happy to let you know: you are authenticated!</p>;
};

const LoggedOutText = () => (
  <p>Don't forget to start your backend server, then authenticate yourself.</p>
);
