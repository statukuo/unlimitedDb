import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { getUserCollection, updateCollectionBatch, updateUserCollection } from "../api/collection";

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
  const [needToUpdate, setNeedToUpdate] = useState(false);
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
    if (!isLoggedIn || !needToUpdate) {
      return;
    };

    const interval = setTimeout(async () => {
      setNeedToUpdate(false);

      const collection = await updateUserCollection(userCollection);
      setUserCollection(collection.userCollection);
      setOwned(collection.owned);
      setOwnedUnique(collection.ownedUnique);
    }, (5000));

    return () => {
      clearInterval(interval);
    };
  }, [userCollection]);

  const updateCollection = ({ set, number, count }) => {
    setNeedToUpdate(true);
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

  const batchUpdateCollection = async (batchCollectionData) => {
    setNeedToUpdate(false);

    const collection = await updateCollectionBatch(batchCollectionData);
    setUserCollection(collection.userCollection);
    setOwned(collection.owned);
    setOwnedUnique(collection.ownedUnique);
  };

  const value = {
    userCollection,
    updateCollection,
    batchUpdateCollection,
    owned,
    ownedUnique
  };

  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
}
