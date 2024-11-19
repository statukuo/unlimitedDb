import React from "react";
import styled from "styled-components";
import { MultipleSelectionFilter } from "./MultipleSelectionFilter";
import { NumericFilter } from "./NumericFilter";
import { useCardList } from "../contexts/CardContext";
import { TextFilter } from "./TextFilter";

const Styles = {
  CardFilterWrapper: styled.div`
    max-width: 800px;
    width: 90vw;
  `,
};

export function CardFilter({ activeFilters }) {
  const { possibleFilters } = useCardList();

  return (
    <Styles.CardFilterWrapper>
      {Object.entries(possibleFilters).map(([key]) => {
        if (possibleFilters[key].options) {
          return (
            <MultipleSelectionFilter
              key={key}
              filterId={key}
              activeFilters={activeFilters}
            />
          );
        }

        if (possibleFilters[key].text) {
          return (
            <TextFilter
              key={key}
              filterId={key}
              activeFilters={activeFilters}
            />
          );
        }

        return (
          <NumericFilter
            key={key}
            filterId={key}
            activeFilters={activeFilters}
          />
        );
      })}
    </Styles.CardFilterWrapper>
  );
}
