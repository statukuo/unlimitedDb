import React from "react";
import { Stack, Typography } from "@mui/material";
import { BasePage } from "./BasePage";
import styled from "styled-components";
import { useCollection } from "../contexts/CollectionContext";
import { useCardList } from "../contexts/CardContext";
import { BatchUploader } from "../components/BatchUploader";

const Styles = {
  CollectionContainer: styled(Stack)`
    height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)";
    min-height: "100%";
    padding: 10px;
    flex-basis: 100%;
  `,
};

export function CollectionPage() {
  const { ownedUnique, owned } = useCollection();
  const { cardCount } = useCardList();

  return (
    <BasePage>
      <Styles.CollectionContainer direction="column">
        <Typography varian="h2">Analytics from {owned}</Typography>
        <Typography varian="h3">
          You have {ownedUnique} cards from {cardCount}
        </Typography>
        <BatchUploader />
      </Styles.CollectionContainer>
    </BasePage>
  );
}
