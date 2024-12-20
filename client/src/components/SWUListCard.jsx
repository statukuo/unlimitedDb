import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCollection } from "../contexts/CollectionContext";

const Styles = {
  Card: styled(Card)`
    margin: 10px;
    border-radius: 12px;
  `,
  CardImage: styled.img`
    width: 100%;
    display: block;
  `,
  CollectionCounter: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};

export function SWUListCard({ data, showCollection, onClick, front }) {
  const { isLoggedIn } = useAuth();
  const { userCollection, updateCollection } = useCollection();

  const updateCount = (count) => {
    updateCollection({ set: data.set, number: data.number, count });
  };

  const collectionCounter = () => {
    if (!isLoggedIn || !showCollection) {
      return;
    }

    const currentCount = userCollection?.[data.set]?.[data.number] || 0;

    return (
      <CardContent>
        <Styles.CollectionCounter>
          <Button onClick={() => updateCount(Math.max(currentCount - 1, 0))}>
            <RemoveIcon />
          </Button>
          <Typography>{currentCount}</Typography>
          <Button onClick={() => updateCount(currentCount + 1)}>
            <AddIcon />
          </Button>
        </Styles.CollectionCounter>
      </CardContent>
    );
  };

  return (
    <Styles.Card>
      <Styles.CardImage
        src={front ? data.frontArt : data.backArt || data.frontArt}
        alt={data.name}
        onClick={() => onClick && onClick()}
      />
      {collectionCounter()}
    </Styles.Card>
  );
}
