import { Grid2 as Grid, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { COLORS, SIZES } from "../constants";

const Styles = {
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
  CardInfoCount: styled(Grid)`
    backdrop-filter: blur(10px);
    align-content: center;
    h3:before {
      content: "x";
      font-size: 14px;
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
    height: ${SIZES.TAB_SIZE / 2}px;
    display: block;
  `,
};

export function SWUCardDeckSmall({ handleSelectCard, data }) {
  return (
    <Styles.CardInfo container onClick={() => handleSelectCard(data)}>
      <Styles.CardInfoAspectWrapper size={{ xs: 1 }}>
        <Styles.CardInfoAspect id={data.aspects[0] || ""} />
        <Styles.CardInfoAspect id={data.aspects[1] || ""} />
      </Styles.CardInfoAspectWrapper>
      <Styles.CardInfoText size={{ xs: 5 }}>
        <Typography align="left">
          {data.name}
          {data.subtitle ? `, ${data.subtitle}` : ""}
        </Typography>
        <Typography align="left">Cost: {data.cost}</Typography>
      </Styles.CardInfoText>
      <Styles.CardInfoGradient size={{ xs: 2 }} />
      <Styles.CardInfoCount size={{ xs: 2 }} offset={{ xs: 2 }}>
        <Typography align="center" variant="h3">
          {data.count}
        </Typography>
      </Styles.CardInfoCount>
    </Styles.CardInfo>
  );
}
