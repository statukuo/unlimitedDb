import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Styles = {
  Card: styled(Card)`
    margin: 10px;
  `,
  CardImage: styled.img`
    width: 100%;
    display: block;
  `,
  CollectionCounter: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `
};

export function SWUCard({ data }) {
  const {isLoggedIn} = useAuth();

  const collectionCounter = () => {
    if (!isLoggedIn) {
      return;
    }

    return <Styles.CollectionCounter>
      <Button>
        <RemoveIcon />
      </Button>
      <Typography>0</Typography>
      <Button>
        <AddIcon />
      </Button>
    </Styles.CollectionCounter>;
  };

  return (
    <Styles.Card>
      <Styles.CardImage src={data.backArt || data.frontArt} alt={data.name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {data.subtitle}
        </Typography>

        { collectionCounter() }

      </CardContent>
    </Styles.Card>
  );
}
