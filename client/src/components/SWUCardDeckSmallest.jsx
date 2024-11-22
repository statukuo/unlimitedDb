import { Grid2 as Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { COLORS, SIZES } from "../constants";

const Styles = {
  CardList: styled(Grid)`
    position: relative;
    width: 90%;
    height: ${SIZES.SMALL_TAB_SIZE}px;
    overflow: hidden;
    margin: 1% 5%;
    border-radius: 12px;
    p {
      position: relative;
      font-weight: bolder;
      top: 0;
    }
  `,
  Card: styled.img`
    width: 80%;
    position: ${(props) => (props.id === 1 ? "relative" : "absolute")};
    margin-left: ${(props) => props.id * 5 + "%"};
    margin-top: ${(props) => (3 - props.id) * 5 + "%"};
    border-radius: 12px;
    width: 80%;
    display: ${(props) => (props.id !== 1 ? "none" : "block")};
    margin-top: ${(props) => (props.type !== "Event" ? "-20%" : "-60%")};
    margin-left: 30%;
  `,
  CardInfo: styled(Grid)`
    display: flex;
    position: absolute;
    font-weight: bolder;
    top: 0;
    color: white;
    height: 100%;
    width: 100%;
  `,
  CardInfoText: styled(Grid)`
    background-color: ${COLORS.TAG_BACKGROUND};
    align-content: center;
    p {
      margin-left: 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  `,
  CardInfoGradient: styled(Grid)`
    background-image: linear-gradient(
      to right,
      ${COLORS.TAG_BACKGROUND},
      rgba(255, 255, 255, 0)
    );
  `,
  CardInfoAspectWrapper: styled(Grid)`
    align-content: normal;
    background-color: ${COLORS.TAG_BACKGROUND};
  `,
  CardInfoAspect: styled.span`
    background-color: ${(props) => COLORS[props.id]};
    width: 20px;
    height: ${SIZES.SMALL_TAB_SIZE / 2}px;
    display: block;
  `,
};

export function SWUCardDeckSmallest({ handleSelectCard, data }) {
  const theme = useTheme();

  return (
    <Styles.CardList
      theme={theme}
      key={data.name}
      onClick={() => handleSelectCard(data)}
    >
      <Styles.Card
        theme={theme}
        type={data.type}
        src={data.frontArt}
        alt="sideboard"
        id={1}
      />
      <Styles.CardInfo container onClick={() => handleSelectCard(data)}>
        <Styles.CardInfoAspectWrapper size={{ xs: 1 }}>
          <Styles.CardInfoAspect id={data.aspects[0] || ""} />
          <Styles.CardInfoAspect id={data.aspects[1] || ""} />
        </Styles.CardInfoAspectWrapper>
        <Styles.CardInfoText size={{ xs: 5 }}>
          <Typography align="left">
            {data.count}x {data.name}
            {data.subtitle ? `, ${data.subtitle}` : ""}
          </Typography>
        </Styles.CardInfoText>
        <Styles.CardInfoGradient size={{ xs: 1 }} />
      </Styles.CardInfo>
    </Styles.CardList>
  );
}
