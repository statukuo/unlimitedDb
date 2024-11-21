import { Grid2 as Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { times } from "lodash";
import LensOutlinedIcon from "@mui/icons-material/LensOutlined";
import LensIcon from "@mui/icons-material/Lens";
import { SWUCardDeckSmall } from "./SWUCardDeckSmall";
import { SIZES } from "../constants";

const getBreakpoint = (theme) => {
  if (theme.forceSmall) {
    return theme.breakpoints.up("sm");
  }
  return theme.breakpoints.down("sm");
};

const Styles = {
  CardList: styled(Grid)`
    position: relative;
    ${(props) => getBreakpoint(props.theme)} {
      width: 90%;
      height: ${SIZES.TAB_SIZE}px;
      overflow: hidden;
      margin: 1% 5%;
      border-radius: 12px;
      p {
        position: relative;
        font-weight: bolder;
        top: 0;
      }
    }
  `,
  Card: styled.img`
    width: 80%;
    position: ${(props) => (props.id === 1 ? "relative" : "absolute")};
    margin-left: ${(props) => props.id * 5 + "%"};
    margin-top: ${(props) => (3 - props.id) * 5 + "%"};
    border-radius: 12px;
    ${(props) => getBreakpoint(props.theme)} {
      width: 80%;
      display: ${(props) => (props.id !== 1 ? "none" : "block")};
      margin-top: ${(props) => (props.type !== "Event" ? "-20%" : "-60%")};
      margin-left: 30%;
    }
  `,
  CardCount: styled(Typography)`
    display: block;
    ${(props) => getBreakpoint(props.theme)} {
      display: none;
    }
  `,
  CardSmall: styled.div`
    display: none;
    ${(props) => getBreakpoint(props.theme)} {
      display: block;
    }
  `,
};

export function SWUCardDeck({ handleSelectCard, data, forceSmall }) {
  const theme = useTheme();
  theme.forceSmall = forceSmall;

  const cardCount = (count) => {
    return (
      <Styles.CardCount align="center" theme={theme}>
        {times(3).map((_, idx) => {
          if (idx < count) {
            return <LensIcon key={idx}></LensIcon>;
          }
          return <LensOutlinedIcon key={idx}></LensOutlinedIcon>;
        })}
      </Styles.CardCount>
    );
  };

  console.log(data);

  return (
    <Styles.CardList
      theme={theme}
      size={{ xs: 12, sm: 4, md: 2 }}
      key={data.name}
      onClick={() => handleSelectCard(data)}
    >
      {times(data.count).map((_, idx) => (
        <Styles.Card
          theme={theme}
          type={data.type}
          src={data.frontArt}
          alt="sideboard"
          key={idx}
          id={data.count - idx}
        />
      ))}
      <Styles.CardSmall theme={theme}>
        <SWUCardDeckSmall handleSelectCard={handleSelectCard} data={data} />
      </Styles.CardSmall>
      {cardCount(data.count)}
    </Styles.CardList>
  );
}
