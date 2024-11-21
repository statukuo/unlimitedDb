import React from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { Box } from "@mui/material";

const Styles = {
  BasePage: styled(Box)`
    display: flex;
    justify-content: center;
    width: 100%;
    place-self: center;
    max-width: 1200px;
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
