import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { getUserCollection, updateUserCollection } from "../api/collection";

// init context
const CollectionContext = createContext();

// export the consumer
export function useCollection() {
  return useContext(CollectionContext);
}

// export the provider (handle all the logic here)
export function CollectionProvider({ children }) {
  const [userCollection, setUserCollection] = useState({});
  const [owned, setOwned] = useState(0);
  const [ownedUnique, setOwnedUnique] = useState(0);
  const { isLoggedIn } = useAuth();

  const fetchCollection = async () => {
    const collection = await getUserCollection();
    setUserCollection(collection.userCollection);
    setOwned(collection.owned);
    setOwnedUnique(collection.ownedUnique);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    };

    fetchCollection();
  }, [isLoggedIn]);


  useEffect(() => {
    if (!isLoggedIn) {
      return;
    };

    const interval = setTimeout(() => {
      updateUserCollection(userCollection);
    }, (5000));

    return () => {
      clearInterval(interval);
    };
  }, [userCollection]);

  const updateCollection = ({ set, number, count }) => {
    const tempUserCollection = { ...userCollection };

    if (!tempUserCollection[set]) {
      tempUserCollection[set] = {};
    }

    if (count === 0) {
      delete tempUserCollection[set][number];
    } else {
      tempUserCollection[set][number] = count;
    }

    setUserCollection(tempUserCollection);
  };

  const value = {
    userCollection,
    updateCollection,
    owned,
    ownedUnique
  };

  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
}
