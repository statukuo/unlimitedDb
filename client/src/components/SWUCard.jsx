import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

const Styles = {
  Card: styled(Card)`
    margin: 10px;
  `,
  CardImage: styled.img`
    width: 100%;
    display: block;
  `,
};

export function SWUCard({ data }) {
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
      </CardContent>
    </Styles.Card>
  );
}
