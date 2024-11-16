import React, { useState } from "react";
import styled from "styled-components";
import { Button, Stack, TextareaAutosize } from "@mui/material";
import { uploadDeck } from "../api/decks";

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

export function DeckUploader() {
  const [deckListJSON, setDeckListJSON] = useState("");

  const uploadDeckJSON = () => {
    console.log("TEST");
    uploadDeck(deckListJSON);
  };

  return (
    <Styles.CollectionContainer direction="column">
      <Styles.TextareaAutosize
        aria-label="empty textarea"
        placeholder="Paste a JSON of a deck and pray so it doesn't crash big time"
        minRows={12}
        onChange={(event) => setDeckListJSON(event.target.value)}
      />
      <Button onClick={uploadDeckJSON}>Upload</Button>
    </Styles.CollectionContainer>
  );
}
