import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { getDeck } from "../api/decks";
import { BasePage } from "./BasePage";
import { Button, Typography } from "@mui/material";
import { DeckCreatorPage } from "./DeckCreatorPage";
import { Loading } from "../components/Loading";

export function DeckEditorPage() {
  const { account } = useAuth();
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deckData, setDeckData] = useState();

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        setDeckData(await getDeck(deckId));
      } catch (error) {
        console.warn(error);
        setDeckData({});
      }
    };

    fetchDeck();
  }, [deckId]);

  if (account?._id === deckData?.ownerId) {
    return <DeckCreatorPage deckData={deckData} />;
  }

  return (
    <BasePage>
      <Loading loadCondition={!deckData?.ownerId}>
        <Typography>
          Seems that you are trying to edit a deck that doesn't belong to you go
          back to home page
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/")}
        >
          Go to home
        </Button>
      </Loading>
    </BasePage>
  );
}
