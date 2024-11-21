import { Grid2 as Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { times } from "lodash";
import LensOutlinedIcon from "@mui/icons-material/LensOutlined";
import LensIcon from "@mui/icons-material/Lens";
import { SWUCardDeckSmall } from "./SWUCardDeckSmall";

const Styles = {
  CardList: styled(Grid)`
    position: relative;
    ${(props) => props.theme.breakpoints.down("sm")} {
      height: 80px;
      overflow: hidden;
      margin: 5px;
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
    ${(props) => props.theme.breakpoints.down("sm")} {
      width: 80%;
      display: ${(props) => (props.id !== 1 ? "none" : "block")};
      margin-top: ${(props) => (props.type !== "Event" ? "-20%" : "-60%")};
      margin-left: 30%;
    }
  `,
};

export function SWUCardDeck({ handleSelectCard, data }) {
  const theme = useTheme();

  const cardCount = (count) => {
    return (
      <Typography align="center">
        {times(3).map((_, idx) => {
          if (idx < count) {
            return <LensIcon key={idx}></LensIcon>;
          }
          return <LensOutlinedIcon key={idx}></LensOutlinedIcon>;
        })}
      </Typography>
    );
  };

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
      <SWUCardDeckSmall handleSelectCard={handleSelectCard} data={data} />
      {cardCount(data.count)}
    </Styles.CardList>
  );
}
