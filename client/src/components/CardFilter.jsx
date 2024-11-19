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
import styled from "styled-components";
import { useCardList } from "../contexts/CardContex";

const Styles = {
  CardFilterWrapper: styled.div`
    max-width: 800px;
    width: 90vw;
  `,
  FormControl: styled(FormControl)`
    width: 100%;
    padding: 10px;
  `,
};

export function CardFilter({ activeFilters }) {
  const { apllyFilters } = useCardList();

  const filters = {
    aspects: {
      title: "Aspects",
      strict: true,
      options: {
        Vigilance: {
          value: "Vigilance",
          title: "Vigilance",
        },
        Command: {
          value: "Command",
          title: "Command",
        },
        Aggression: {
          value: "Aggression",
          title: "Aggression",
        },
        Cunning: {
          value: "Cunning",
          title: "Cunning",
        },
        Villainy: {
          value: "Villainy",
          title: "Villainy",
        },
        Heroism: {
          value: "Heroism",
          title: "Heroism",
        },
      },
    },
    sets: {
      title: "Sets",
      options: {
        SOR: {
          value: "SOR",
          title: "Spark of the rebelion",
        },
        SHD: {
          value: "SHD",
          title: "Shadows of the galaxy",
        },
        TWI: {
          value: "TWI",
          title: "Twilight of the imperium",
        },
      },
    },
    cost: {
      title: "Cost",
      options: {
        0: { value: "0", title: "0" },
        1: { value: "1", title: "1" },
        2: { value: "2", title: "2" },
        3: { value: "3", title: "3" },
        4: { value: "4", title: "4" },
        5: { value: "5", title: "5" },
        6: { value: "6", title: "6" },
        7: { value: "7", title: "7" },
        8: { value: "8", title: "8" },
        9: { value: "9", title: "9" },
        10: { value: "10", title: "10" },
        11: { value: "11", title: "11" },
        12: { value: "12", title: "12" },
        13: { value: "13", title: "13" },
        14: { value: "14", title: "14" },
        15: { value: "15", title: "15" },
      },
    },
  };

  const createStrictFilter = (key) => {
    const handleChange = (event) => {
      const filtersToUpdate = {};
      filtersToUpdate[key + "Strict"] = event.target.value;

      apllyFilters({
        ...activeFilters,
        ...filtersToUpdate,
      });
    };

    return (
      <Select
        value={activeFilters[key + "Strict"]}
        label="Method"
        onChange={handleChange}
      >
        <MenuItem value="OR">OR</MenuItem>
        <MenuItem value="AND">AND</MenuItem>
        <MenuItem value="EXCLUDE">Exclude</MenuItem>
      </Select>
    );
  };

  const createFilterGroup = (key) => {
    const handleChange = (event) => {
      const filtersToUpdate = {};
      filtersToUpdate[key] = event.target.value;

      apllyFilters({
        ...activeFilters,
        ...filtersToUpdate,
      });
    };

    const handleDelete = (option) => {
      const filtersToUpdate = {};
      filtersToUpdate[key] = activeFilters[key].filter(
        (activeOption) => activeOption !== option
      );

      apllyFilters({
        ...activeFilters,
        ...filtersToUpdate,
      });
    };

    return (
      <Grid container>
        <Grid size={{ xs: filters[key].strict ? 9 : 12 }}>
          <Styles.FormControl
            sx={{ m: 1, width: 300 }}
            key={filters[key].title}
          >
            <InputLabel>{filters[key].title}</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={activeFilters[key]}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={() => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {activeFilters[key].map((optionKey) => (
                    <Chip
                      onMouseDown={(event) => {
                        event.stopPropagation();
                      }}
                      onDelete={() => handleDelete(optionKey)}
                      key={filters[key].options[optionKey].value}
                      label={filters[key].options[optionKey].title}
                    />
                  ))}
                </Box>
              )}
            >
              {Object.values(filters[key].options).map(({ title, value }) => (
                <MenuItem key={value} value={value}>
                  {title}
                </MenuItem>
              ))}
            </Select>
          </Styles.FormControl>
        </Grid>
        <Grid size={{ xs: 3 }}>
          <Styles.FormControl
            sx={{ m: 1, width: 300 }}
            key={filters[key].title}
          >
            {filters[key].strict ? createStrictFilter(key) : null}
          </Styles.FormControl>
        </Grid>
      </Grid>
    );
  };

  return (
    <Styles.CardFilterWrapper>
      {createFilterGroup("aspects")}
      {createFilterGroup("sets")}
      {createFilterGroup("cost")}
    </Styles.CardFilterWrapper>
  );
}
