import { Grid2 as Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { times } from "lodash";
import LensOutlinedIcon from "@mui/icons-material/LensOutlined";
import LensIcon from "@mui/icons-material/Lens";
import { SWUCardDeckSmall } from "./SWUCardDeckSmall";
import useMediaQuery from "@mui/material/useMediaQuery";

const Styles = {
  CardList: styled(Grid)`
    position: relative;
  `,
  Card: styled.img`
    width: 80%;
    position: ${(props) => (props.id === 1 ? "relative" : "absolute")};
    margin-left: ${(props) => props.id * 5 + "%"};
    margin-top: ${(props) => (3 - props.id) * 5 + "%"};
    border-radius: 12px;
  `,
  CardCount: styled(Typography)`
    display: block;
  `,
};

export function SWUCardDeck({ handleSelectCard, data, forceSmall }) {
  const theme = useTheme();
  const renderSmall = useMediaQuery(theme.breakpoints.down("sm"));

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

  if (forceSmall || renderSmall) {
    return (
      <SWUCardDeckSmall
        handleSelectCard={() => handleSelectCard(data)}
        data={data}
      ></SWUCardDeckSmall>
    );
  }

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
      {cardCount(data.count)}
    </Styles.CardList>
  );
}
