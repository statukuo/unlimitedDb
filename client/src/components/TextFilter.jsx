import React from "react";
import { FormControl, Grid2 as Grid, TextField } from "@mui/material";
import styled from "styled-components";
import { useCardList } from "../contexts/CardContext";

const Styles = {
  FormControl: styled(FormControl)`
    width: 100%;
    padding: 5px;
  `,
};

export function TextFilter({ activeFilters, filterId }) {
  const { apllyFilters, possibleFilters } = useCardList();

  const handleChange = (event) => {
    const filtersToUpdate = {};
    filtersToUpdate[filterId] = event.target.value;

    apllyFilters({
      ...activeFilters,
      ...filtersToUpdate,
    });
  };

  return (
    <Grid container>
      <Grid size={{ xs: 12 }}>
        <Styles.FormControl key={possibleFilters[filterId].title}>
          <TextField
            label={possibleFilters[filterId].title}
            onChange={handleChange}
            value={activeFilters[filterId]}
          />
        </Styles.FormControl>
      </Grid>
    </Grid>
  );
}
