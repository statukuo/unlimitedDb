import React from "react";
import { BasePage } from "./BasePage";
import { SWUCardDetails } from "../components/SWUCardDetails";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Grid2 } from "@mui/material";

const Styles = {
  CardContainer: styled(Grid2)`
    max-width: 1200px;
  `,
};

export function CardViewPage() {
  const { id } = useParams();

  return (
    <BasePage>
      <Styles.CardContainer>
        {id ? <SWUCardDetails cardId={id} /> : null}
      </Styles.CardContainer>
    </BasePage>
  );
}
