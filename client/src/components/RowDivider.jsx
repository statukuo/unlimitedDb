import React from "react";
import { Grid2 as Grid } from "@mui/material";
import styled from "styled-components";

const Styles = {
  Row: styled(Grid)`
    width: 100%;
  `,
  RowDivider: styled(Grid)`
    width: 100%;
    &:before {
      content: "";
      height: 1px;
      /* I've removed the vendor prefixes, if you are looking to support older browsers
         then refer to older version of this answer.
      */
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0) 0%,
        rgba(147, 147, 147, 1) 50%,
        rgba(0, 0, 0, 0) 100%
      );
      display: block;
      margin-bottom: 10px;
      margin-top: 10px;
    }
  `,
};

export function ContentRowWithDivider({ children }) {
  return (
    <Styles.Row container>
      {children}
      <Styles.RowDivider />
    </Styles.Row>
  );
}
