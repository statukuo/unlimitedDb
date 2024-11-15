import React from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { Box } from "@mui/material";

const Styles = {
  BasePage: styled(Box)`
    display: flex;
    justify-content: center;
    min-height: 100vh;
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
