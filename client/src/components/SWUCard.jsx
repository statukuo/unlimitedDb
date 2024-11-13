import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';

export function SWUCard({data}) {
  console.log(data);

  return (
    <Card sx={{ maxWidth: 345 }}>
      {}
      <CardMedia
        sx={{ height: 140 }}
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
    </Card>
  );
}
