import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export function SortSelect({ sortMethod, setSortMethod }) {
  return (
    <FormControl fullWidth>
      <InputLabel>Sort Method</InputLabel>
      <Select
        value={sortMethod}
        label="Sort method"
        onChange={(event) => setSortMethod(event.target.value)}
      >
        <MenuItem value={"cost"}>Cost</MenuItem>
        <MenuItem value={"aspect"}>Aspect</MenuItem>
        <MenuItem value={"set"}>Set</MenuItem>
        <MenuItem value={"type"}>Type</MenuItem>
        <MenuItem value={"rarity"}>Rarity</MenuItem>
      </Select>
    </FormControl>
  );
}
