import React from "react";
import {
  FormControl,
  Grid2 as Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styled from "styled-components";
import { useCardList } from "../contexts/CardContext";

const Styles = {
  FormControl: styled(FormControl)`
    width: 100%;
    padding: 5px;
  `,
};

export function NumericFilter({ activeFilters, filterId }) {
  const { applyFilters, possibleFilters } = useCardList();
  const createNumberticStrictFilter = () => {
    const handleChange = (event) => {
      const filtersToUpdate = {};
      filtersToUpdate[filterId + "Strict"] = event.target.value;

      applyFilters({
        ...activeFilters,
        ...filtersToUpdate,
      });
    };

    return (
      <Select
        value={activeFilters[filterId + "Strict"]}
        label="Method"
        onChange={handleChange}
      >
        <MenuItem value="gt">OR GREATER</MenuItem>
        <MenuItem value="lw">OR LOWER</MenuItem>
        <MenuItem value="equal">EQUAL</MenuItem>
      </Select>
    );
  };

  const handleChange = (event) => {
    const filtersToUpdate = {};
    filtersToUpdate[filterId] = event.target.value;

    applyFilters({
      ...activeFilters,
      ...filtersToUpdate,
    });
  };

  return (
    <Grid container>
      <Grid size={{ xs: 9 }}>
        <Styles.FormControl key={possibleFilters[filterId].title}>
          <TextField
            label={possibleFilters[filterId].title}
            type="number"
            onChange={handleChange}
            value={activeFilters[filterId]}
          />
        </Styles.FormControl>
      </Grid>
      <Grid size={{ xs: 3 }}>
        <Styles.FormControl key={possibleFilters[filterId].title}>
          {possibleFilters[filterId].strict
            ? createNumberticStrictFilter(filterId)
            : null}
        </Styles.FormControl>
      </Grid>
    </Grid>
  );
}
