import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { getAllCards } from '../api/cards';
import { SWUCard } from '../components/SWUCard';

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
    <div className='LandingPage'>
      <Header />

      {isLoggedIn ? <LoggedInText /> : <LoggedOutText />}


      {cardList.map((card, idx)=> { return <SWUCard key={idx} data={card}/>;})}
    </div>
  );
}

const LoggedInText = () => {
  const { account } = useAuth();

  return <p>Hey, {account.username}! I'm happy to let you know: you are authenticated!</p>;
};

const LoggedOutText = () => (
  <p>Don't forget to start your backend server, then authenticate yourself.</p>
);
