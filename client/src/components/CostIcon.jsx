import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Styles = {
  IconWrapper: styled.div`
    width: 25px;
    position: relative;
    display: inline-block;
    margin-left: 2px;
    margin-right: 2px;
  `,
  Icon: styled.img`
    height: 100%;
    display: block;
    position: absolute;
    float: left;
    top: -2px;
  `,
  Cost: styled(Typography)`
    z-index: 10;
    font-size: 20px;
    line-height: 25px;
    left: 15%;
    color: white;
    position: relative;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  `,
};

export function CostIcon({ cost }) {
  return (
    <Styles.IconWrapper>
      <Styles.Icon src={"/Cost.png"} alt="cost" key="cost" />
      <Styles.Cost>{cost}</Styles.Cost>
    </Styles.IconWrapper>
  );
}
