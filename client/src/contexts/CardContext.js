import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { getAllCards, getAllFilters } from "../api/cards";
import { useDebouncedCallback } from 'use-debounce';
import { sortList } from "../utils/sortCardList";

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
  const [possibleFilters, setPossibleFilters] = useState({});
  const [filteredLeaders, setFilteredLeaders] = useState([]);
  const [filteredBases, setFilteredBases] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [filter, setFilter] = useState({});
  const [emptyFilters, setEmptyFilter] = useState({});
  const [fetchingCards, setFetchingCards] = useState(true);
  const [sortForFilter, setSortForFilter] = useState();

  useEffect(() => {
    const fetchFilters = async () => {
      const retrievedFilters = await getAllFilters();

      const tempFilter = {};

      Object.entries(retrievedFilters).forEach(([key, value]) => {
        tempFilter[key] = value.text ? "" : (value.options ? [] : 0);
        if (value.strict) {
          tempFilter[key + "Strict"] = value.options ? "OR" : "gt";
        }
      });

      setPossibleFilters(retrievedFilters);
      setFilter(tempFilter);
      setEmptyFilter(tempFilter);
    };

    const fetchCardList = async () => {
      const allCards = await getAllCards();
      setCardList(allCards);
    };

    fetchCardList();
    fetchFilters();
  }, []);

  useEffect(() => {
    debounced(filter);
  }, [filter]);



  // Debounce callback
  const debounced = useDebouncedCallback(
    async (filter) => {
      let filteredCards = await getAllCards(filter);


      if (sortForFilter) {
        filteredCards = sortList(filteredCards, sortForFilter);
      }

      setFilteredLeaders(filteredCards.filter(({ type }) => type === "Leader"));
      setFilteredBases(filteredCards.filter(({ type }) => type === "Base"));
      setFilteredCards(filteredCards.filter(({ type }) => type !== "Base" && type !== "Leader"));

      setFilteredList(filteredCards);
      setFetchingCards(false);
    },
    1000
  );

  const applyFilters = (filters, sort) => {
    setFetchingCards(true);
    setFilter(filters);
    setSortForFilter(sort);

    debounced(filters);
  };

  const clearFilter = () => {
    setFilter(emptyFilters);
  };

  const getCardData = (id) => {
    const [searchSet, searchNumber] = id.split("_");

    return cardList.find(({ set, number }) => set === searchSet && number === parseInt(searchNumber));
  };


  const value = {
    cardList,
    cardCount: cardList.length,
    filteredList,
    filter,
    applyFilters,
    clearFilter,
    getCardData,
    possibleFilters,
    fetchingCards,
    filteredLeaders,
    filteredBases,
    filteredCards
  };

  return <CardlistContext.Provider value={value}>{children}</CardlistContext.Provider>;
}
