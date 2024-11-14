import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';
import styled from 'styled-components';

const Styles = {
  Card: styled(Card)`
    margin: 10px;
  `,
  CardMedia: styled(CardMedia)`
    height: 140px;
    width: 100%;
  `
};

export function SWUCard({data}) {
  return (
    <Styles.Card>
      {data.type}
      <Styles.CardMedia
        image={data.frontArt}
        title={data.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name} - {data.subtitle}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {data.frontText}
        </Typography>
      </CardContent>
    </Styles.Card>
  );
}
