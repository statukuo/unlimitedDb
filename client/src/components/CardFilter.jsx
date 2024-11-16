import React, { useState } from "react";
import Card from "@mui/material/Card";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import styled from "styled-components";
import { useCardList } from "../contexts/CardContex";

const Styles = {
  Filters: styled(Card)`
    height: 100%;
    padding-left: 20px;
  `,
  FormGroup: styled(FormGroup)`
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr;
    grid-auto-columns: 1fr;
  `,
  Button: styled(Button)`
    margin-left: 20px;
  `,
};

export function CardFilter() {
  const { apllyFilters } = useCardList();
  const [aspects, setAspects] = useState([]);
  const [sets, setSets] = useState([]);

  const handleChange = (event, group, setFunction) => {
    if (event.target.checked) {
      group.push(event.target.name);
      setFunction(group);
    } else {
      setFunction(
        group.filter((item) => {
          return item !== event.target.name;
        })
      );
    }
  };

  const onFilter = (filters) => {
    apllyFilters(filters);
  };

  const createFilterGroup = (title, filterFields, group, setFunction) => {
    return [
      <h2 key="title">{title}</h2>,
      <Styles.FormGroup key="filters">
        {filterFields.map((field) => {
          return (
            <FormControlLabel
              key={field}
              control={<Checkbox />}
              onChange={(event) => handleChange(event, group, setFunction)}
              name={field}
              label={field}
            />
          );
        })}
      </Styles.FormGroup>,
    ];
  };

  return (
    <Styles.Filters>
      {createFilterGroup(
        "Aspects",
        [
          "Vigilance",
          "Command",
          "Aggression",
          "Cunning",
          "Villainy",
          "Heroism",
        ],
        aspects,
        setAspects
      )}
      {createFilterGroup("Sets", ["SOR", "SHD", "TWI"], sets, setSets)}

      <Styles.Button
        variant="contained"
        color="success"
        onClick={() => onFilter({ aspects, sets })}
      >
        Filter
      </Styles.Button>
    </Styles.Filters>
  );
}
