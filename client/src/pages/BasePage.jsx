import React from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { Box } from "@mui/material";

const Styles = {
  BasePage: styled(Box)`
    display: flex;
    justify-content: center;
    max-width: 1800px;
    width: 100%;
    place-self: center;
  `,
};

export function BasePage({ children }) {
  return (
    <div>
      <Header />
      <Styles.BasePage className="BasePage">{children}</Styles.BasePage>
    </div>
  );
}
