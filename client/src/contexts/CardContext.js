import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { getAllCards, getAllFilters } from "../api/cards";
import { useDebounce } from 'use-debounce';

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
  const [filter, setFilter] = useState({});
  const [emptyFilters, setEmptyFilter] = useState({});

  useEffect(() => {
    const fetchCardList = async () => {
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

    fetchCardList();
  }, []);

  const [debouncedFilter] = useDebounce(filter, 1000);

  useEffect(() => {
    const fetchCardList = async () => {
      if (!cardList.length) {
        setCardList(await getAllCards());
      }

      if (debouncedFilter) {
        setFilteredList(await getAllCards(debouncedFilter));
      } else {
        setFilteredList([]);
      }
    };

    fetchCardList();
  }, [debouncedFilter]);

  const apllyFilters = (filters) => {
    setFilter(filters);
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
    apllyFilters,
    clearFilter,
    getCardData,
    possibleFilters
  };

  return <CardlistContext.Provider value={value}>{children}</CardlistContext.Provider>;
}
