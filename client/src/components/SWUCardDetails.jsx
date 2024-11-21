import React, { useEffect, useState } from "react";
import { Chip, Grid2 as Grid, Paper, Typography } from "@mui/material";
import { useCardList } from "../contexts/CardContext";
import { Loading } from "./Loading";
import styled from "styled-components";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { AspectIcons } from "./AspectIcons";
import { CardText } from "./CardText";
import { COLORS } from "../constants";
import BrushIcon from "@mui/icons-material/Brush";
import { ContentRowWithDivider } from "./RowDivider";

const Styles = {
  Image: styled.img`
    width: ${(props) => (props.show ? "100%" : "0")};
    opacity: ${(props) => (props.show ? "100%" : "0%")};
    transition: all 500ms ease-in-out;
    border-radius: 12px;
  `,
  Text: styled(Typography)`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  ImageCard: styled(Paper)`
    margin: 10px;
    border-radius: 12px;
    line-height: 0;
    display: flex;
  `,
  DataCard: styled(Grid)`
    margin: 10px;
    padding: 10px;
  `,
  Chip: styled(Chip)`
    margin: 5px;
  `,
};

export function SWUCardDetails({ cardId }) {
  const { cardList, getCardData } = useCardList();
  const [cardData, setCardData] = useState({});
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    setCardData(getCardData(cardId) || {});
  }, [cardList]);

  const handleShowBack = () => {
    if (!cardData.backArt) {
      return;
    }

    setShowBack(!showBack);
  };

  return (
    <Loading loadCondition={!cardData.name}>
      <Grid container>
        <Grid size={{ xs: 12, md: 4 }}>
          <Styles.ImageCard elevation={24} onClick={handleShowBack}>
            <Styles.Image
              src={cardData.frontArt}
              alt={cardData.name}
              show={!showBack}
            />
            <Styles.Image
              src={cardData.backArt}
              alt={cardData.name}
              show={showBack}
            />
          </Styles.ImageCard>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Styles.DataCard container>
            <ContentRowWithDivider>
              <Grid size={{ xs: 12 }}>
                <Styles.Text variant="h2">
                  {cardData.unique ? <AutoAwesomeRoundedIcon /> : null}
                  {cardData.name}
                </Styles.Text>
                <Styles.Text variant="h3">{cardData.subtitle}</Styles.Text>
              </Grid>
            </ContentRowWithDivider>
            <ContentRowWithDivider>
              <Grid size={{ xs: 2 }}>
                <Styles.Text variant="h4" color={COLORS.COST}>
                  {cardData.cost}
                </Styles.Text>
              </Grid>
              <Grid size={{ xs: 8 }}>
                <Styles.Text variant="h2">
                  <AspectIcons aspects={cardData.aspects || []} />
                </Styles.Text>
              </Grid>
              <Grid size={{ xs: 2 }}>
                <Styles.Text variant="h4">{cardData.type}</Styles.Text>
              </Grid>
            </ContentRowWithDivider>
            <ContentRowWithDivider>
              <Grid size={{ xs: 2 }}>
                <Styles.Text variant="h4" color={COLORS.POWER}>
                  {cardData.power}
                </Styles.Text>
              </Grid>
              <Grid size={{ xs: 8 }}>
                <Styles.Text variant="h4" sx={{ flexFlow: "wrap" }}>
                  {cardData.traits?.map((trait) => {
                    return <Styles.Chip label={trait} key={trait} />;
                  })}
                </Styles.Text>
              </Grid>
              <Grid size={{ xs: 2 }}>
                <Styles.Text variant="h4" color={COLORS.HP}>
                  {cardData.hp}
                </Styles.Text>
              </Grid>
            </ContentRowWithDivider>
            <ContentRowWithDivider>
              <Grid size={{ xs: 10 }}>
                <CardText cardText={cardData.frontText} variant="h5" />
              </Grid>
            </ContentRowWithDivider>
            {cardData.backText ? (
              <ContentRowWithDivider>
                <Grid size={{ xs: 10 }}>
                  <CardText cardText={cardData.backText} variant="h5" />
                </Grid>
              </ContentRowWithDivider>
            ) : null}
            <ContentRowWithDivider>
              <Grid size={{ xs: 12 }}>
                <Styles.Text variant="h8">
                  <BrushIcon />
                  {cardData.artist}
                </Styles.Text>
              </Grid>
            </ContentRowWithDivider>
          </Styles.DataCard>
        </Grid>
      </Grid>
    </Loading>
  );
}
