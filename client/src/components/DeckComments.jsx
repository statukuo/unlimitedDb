import React from "react";
import { Grid2 as Grid, Typography } from "@mui/material";
import styled from "styled-components";

const Styles = {
  DataContainer: styled(Grid)`
    padding: 10px;
  `,
};

export function DeckComments({ description }) {
  return (
    <Grid container>
      <Styles.DataContainer size={{ xs: 12 }}>
        <Typography variant="h4" align="center">
          Description
        </Typography>
        <Typography m={2}>{description}</Typography>
      </Styles.DataContainer>
    </Grid>
  );
}
