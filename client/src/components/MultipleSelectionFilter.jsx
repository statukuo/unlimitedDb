import React from "react";
import {
  Box,
  Chip,
  FormControl,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useCardList } from "../contexts/CardContext";
import styled from "styled-components";

const Styles = {
  FormControl: styled(FormControl)`
    width: 100%;
    padding: 5px;
  `,
};

export function MultipleSelectionFilter({ activeFilters, filterId }) {
  const { apllyFilters, possibleFilters } = useCardList();

  const createStrictFilter = () => {
    const handleChange = (event) => {
      const filtersToUpdate = {};
      filtersToUpdate[filterId + "Strict"] = event.target.value;

      apllyFilters({
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
        <MenuItem value="OR">OR</MenuItem>
        <MenuItem value="AND">AND</MenuItem>
        <MenuItem value="EXCLUDE">Exclude</MenuItem>
      </Select>
    );
  };

  const handleChange = (event) => {
    const filtersToUpdate = {};
    filtersToUpdate[filterId] = event.target.value;

    apllyFilters({
      ...activeFilters,
      ...filtersToUpdate,
    });
  };

  const handleDelete = (option) => {
    const filtersToUpdate = {};
    filtersToUpdate[filterId] = activeFilters[filterId].filter(
      (activeOption) => activeOption !== option
    );

    apllyFilters({
      ...activeFilters,
      ...filtersToUpdate,
    });
  };

  return (
    <Grid container>
      <Grid size={{ xs: possibleFilters[filterId].strict ? 9 : 12 }}>
        <Styles.FormControl key={possibleFilters[filterId].title}>
          <InputLabel>{possibleFilters[filterId].title}</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={activeFilters[filterId]}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={() => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {activeFilters[filterId].map((option) => (
                  <Chip
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                    onDelete={() => handleDelete(option)}
                    key={option}
                    label={option}
                  />
                ))}
              </Box>
            )}
          >
            {Object.values(possibleFilters[filterId].options).map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Styles.FormControl>
      </Grid>
      <Grid size={{ xs: 3 }}>
        <Styles.FormControl key={possibleFilters[filterId].title}>
          {possibleFilters[filterId].strict ? createStrictFilter() : null}
        </Styles.FormControl>
      </Grid>
    </Grid>
  );
}
