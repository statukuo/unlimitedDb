import React, { useState } from "react";
import styled from "styled-components";
import { Button, Stack, TextareaAutosize } from "@mui/material";
import { useCollection } from "../contexts/CollectionContext";

const Styles = {
  CollectionContainer: styled(Stack)`
    height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)";
    min-height: "100%";
    padding: 10px;
    flex-basis: 100%;
  `,
  TextareaAutosize: styled(TextareaAutosize)`
    margin: 10px;
  `,
};

export function BatchUploader() {
  const { batchUpdateCollection } = useCollection();
  const [cardTextList, setCardTextList] = useState("");

  const uploadCardList = () => {
    batchUpdateCollection(cardTextList);
  };

  return (
    <Styles.CollectionContainer direction="column">
      <Styles.TextareaAutosize
        aria-label="empty textarea"
        placeholder="Paste a list of cards (this will override any collection you have)"
        minRows={12}
        onChange={(event) => setCardTextList(event.target.value)}
      />
      <Button onClick={uploadCardList}>Upload</Button>
    </Styles.CollectionContainer>
  );
}
