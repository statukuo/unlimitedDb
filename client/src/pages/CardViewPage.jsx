import React from "react";
import { BasePage } from "./BasePage";
import { SWUCardDetails } from "../components/SWUCardDetails";
import { useParams } from "react-router-dom";

export function CardViewPage() {
  const { id } = useParams();

  return <BasePage>{id ? <SWUCardDetails cardId={id} /> : null}</BasePage>;
}
