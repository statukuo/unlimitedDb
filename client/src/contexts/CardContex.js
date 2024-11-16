import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { getAllCards } from "../api/cards";

// init context
const CardlistContext = createContext();

// export the consumer
export function useCardList() {
  return useContext(CardlistContext);
}

// export the provider (handle all the logic here)
export function CardListProvider({ children }) {
  const [cardList, setCardList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filter, setFilter] = useState(null);


  useEffect(() => {
    const fetchCardList = async () => {
      if (!cardList.length) {
        setCardList(await getAllCards());
      }

      if (filter) {
        setFilteredList(await getAllCards(filter));
      } else {
        setFilteredList([]);
      }
    };

    fetchCardList();
  }, [filter]);

  const apllyFilters = (filters) => {
    setFilter(filters);
  };

  const clearFilter = () => {
    setFilter(null);
  };

  const getCard = (id) => {
    const [searchSet, searchNumber] = id.split("_");

    return cardList.find(({ set, number }) => set === searchSet && number === parseInt(searchNumber));
  };


  const value = {
    cardList,
    cardCount: cardList.length,
    filteredList,
    filter,
    apllyFilters,
    clearFilter,
    getCard
  };

  return <CardlistContext.Provider value={value}>{children}</CardlistContext.Provider>;
}
