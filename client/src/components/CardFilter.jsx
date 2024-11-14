import React, { useState } from 'react';
import Card from '@mui/material/Card';
import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import styled from 'styled-components';

const Styles = {
  Filters: styled(Card)`
    margin: 10px;
    width: 900px;
  `
};

export function CardFilter({onFilter}) {
    const [aspects, setAspects] = useState([]);


  const handleChange = (event) => {
    if (event.target.checked) {
        aspects.push(event.target.name);
        setAspects(aspects);
    } else {
        setAspects(aspects.filter(aspect => {
            return aspect !== event.target.name;
        }));
    }
  };

  return (
    <Styles.Filters>
      <FormGroup>
            <p>Aspects</p>
            <FormControlLabel control={<Checkbox />} onChange={handleChange} name="Vigilance" label="Vigilance" />
            <FormControlLabel control={<Checkbox />} onChange={handleChange} name="Command" label="Command" />
            <FormControlLabel control={<Checkbox />} onChange={handleChange} name="Aggression" label="Aggression" />
            <FormControlLabel control={<Checkbox />} onChange={handleChange} name="Cunning" label="Cunning" />
            <FormControlLabel control={<Checkbox />} onChange={handleChange} name="Villainy" label="Villainy" />
            <FormControlLabel control={<Checkbox />} onChange={handleChange} name="Heroism" label="Heroism" />
        </FormGroup>
        <Button variant="contained" color="success" onClick={() => onFilter({aspects})}>
            Filter
        </Button>
    </Styles.Filters>
  );
}
