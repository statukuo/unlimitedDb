import {
  Divider,
  Grid2 as Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import styled from "styled-components";
import { COLORS, SIZES } from "../constants";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const Styles = {
  CardList: styled(Grid)`
    position: relative;
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
  CardInfoCount: styled(Grid)`
    display: flex;
    justify-content: space-evenly;
    backdrop-filter: blur(10px);
    align-content: center;
    align-items: center;
    background-image: linear-gradient(to left, black, rgba(255, 255, 255, 0));
    h3:before {
      content: "x";
      height: 100%;
      font-size: 14px;
      width: 100%;
    }
    h4 {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
    svg {
      color: white;
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
  CardButtons: styled(Grid)`
    border-left: solid 1px white;
    height: ${SIZES.TAB_SIZE}px;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-evenly;
  `,
};

export function SWUCardDeckSmall({
  handleSelectCard,
  data,
  editable = false,
  editableRemoveButtonFunction,
  editableAddButtonFunction,
}) {
  const theme = useTheme();

  const handleRemoveClick = (event) => {
    event.stopPropagation();

    editableRemoveButtonFunction(data);
  };

  const handleAddClick = (event) => {
    event.stopPropagation();

    editableAddButtonFunction(data);
  };

  const createEditableButtons = () => {
    return (
      <Styles.CardInfoCount size={{ xs: 3 }} offset={{ xs: 2 }}>
        <Grid container width="100%">
          <Grid size={4} alignContent="center">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={handleRemoveClick}
            >
              <RemoveCircleIcon fontSize="inherit" />
            </IconButton>
          </Grid>
          <Grid size={4}>
            <Typography align="center" variant="h4">
              {data.count}
            </Typography>
          </Grid>
          <Grid size={4} alignContent="center">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={handleAddClick}
            >
              <AddCircleIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
      </Styles.CardInfoCount>
    );
  };

  const createCount = () => {
    return (
      <Styles.CardInfoCount size={{ xs: 2 }} offset={{ xs: 3 }}>
        <Grid size={12}>
          <Typography align="center" variant="h3">
            {data.count}
          </Typography>
        </Grid>
      </Styles.CardInfoCount>
    );
  };

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
            {data.name}
            {data.subtitle ? `, ${data.subtitle}` : ""}
          </Typography>
          <Typography align="left">Cost: {data.cost}</Typography>
        </Styles.CardInfoText>
        <Styles.CardInfoGradient size={{ xs: 1 }} />
        {editable ? createEditableButtons() : createCount()}
      </Styles.CardInfo>
    </Styles.CardList>
  );
}
