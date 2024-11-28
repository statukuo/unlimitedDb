import React from "react";
import { Grid2 as Grid, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import styled from "styled-components";
import { COLORS } from "../constants";
import { PieChart } from "@mui/x-charts";
import { combinations } from "mathjs";

const Styles = {
  BarChart: styled(BarChart)`
    width: 100%;
  `,
  DataContainer: styled(Grid)`
    padding: 10px;
  `,
};

export function DeckMaths({ deckList }) {
  const byCost = deckList.reduce((acc, current) => {
    acc[current.cost] += current.count;
    return acc;
  }, new Array(Math.max(...deckList.map((o) => o.cost)) + 1).fill(0));

  const byType = deckList.reduce((acc, current) => {
    if (!acc[current.type]) {
      acc[current.type] = 0;
    }

    acc[current.type] += current.count;
    return acc;
  }, {});

  const byAspect = Object.entries(
    deckList.reduce((acc, current) => {
      if (!acc[current.aspects.join("_")]) {
        acc[current.aspects.join("_")] = 0;
      }

      acc[current.aspects.join("_")] += current.count;
      return acc;
    }, {})
  ).map(([key, value]) => ({
    id: key,
    value: value,
    title: key.replace("_", " "),
    label: key.replace("_", " "),
    color: COLORS[key],
  }));

  const byRarity = Object.entries(
    deckList.reduce((acc, current) => {
      if (!acc[current.rarity]) {
        acc[current.rarity] = 0;
      }

      acc[current.rarity] += current.count;
      return acc;
    }, {})
  ).map(([key, value]) => ({
    id: key,
    value: value,
    title: key.replace("_", " "),
    label: key.replace("_", " "),
    color: COLORS[key],
  }));

  const calculateDrawProbability = (wantedCardsOnHand) => {
    try {
      const amountOfCards = byCost.reduce((partialSum, a) => partialSum + a, 0);
      const validCardCount = byCost[0] + byCost[1] + byCost[2];

      return (
        Math.round(
          ((combinations(validCardCount, wantedCardsOnHand) *
            combinations(
              amountOfCards - validCardCount,
              6 - wantedCardsOnHand
            )) /
            combinations(amountOfCards, 6)) *
            10000
        ) / 100
      );
    } catch (error) {
      return 0;
    }
  };

  return (
    <Grid container>
      <Styles.DataContainer size={{ xs: 12, md: 6 }}>
        <Typography variant="h5" align="center">
          Cards by cost
        </Typography>
        <Styles.BarChart
          dataset={byCost.map((count, cost) => ({ x: cost, y: count }))}
          series={[{ scaleType: "band", dataKey: "y" }]}
          xAxis={[{ scaleType: "band", dataKey: "x", label: "Cost" }]}
          height={300}
          borderRadius={10}
        />
      </Styles.DataContainer>
      <Styles.DataContainer size={{ xs: 12, md: 6 }}>
        <Typography variant="h5" align="center">
          Cards by type
        </Typography>
        <Styles.BarChart
          dataset={Object.keys(byType).map((key) => ({
            x: key,
            y: byType[key],
          }))}
          series={[{ scaleType: "band", dataKey: "y" }]}
          xAxis={[{ scaleType: "band", dataKey: "x", label: "Type" }]}
          height={300}
          borderRadius={12}
        />
      </Styles.DataContainer>
      <Styles.DataContainer size={{ xs: 12, md: 6 }}>
        <Typography variant="h5" align="center">
          Cards by aspect
        </Typography>
        <PieChart
          margin={{ right: 0 }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
          series={[
            {
              data: byAspect,
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          height={300}
        />
      </Styles.DataContainer>
      <Styles.DataContainer size={{ xs: 12, md: 6 }}>
        <Typography variant="h5" align="center">
          Cards by rarity
        </Typography>
        <PieChart
          margin={{ right: 0 }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
          series={[
            {
              data: byRarity,
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          height={300}
        />
      </Styles.DataContainer>
      <Styles.DataContainer size={{ xs: 12, md: 6 }}>
        <Typography variant="h5" align="center">
          Probability to draw on opening hand
        </Typography>
        <Typography>
          Probability to draw 1 card to start with:{" "}
          {calculateDrawProbability(1)}%
        </Typography>
        <Typography>
          Probability to draw 2 card to start with:{" "}
          {calculateDrawProbability(2)}%
        </Typography>
        <Typography>
          Probability to draw 3 card to start with:{" "}
          {calculateDrawProbability(3)}%
        </Typography>
        <Typography>
          Probability to draw 4 card to start with:{" "}
          {calculateDrawProbability(4)}%
        </Typography>
        <Typography>
          Probability to draw 5 card to start with:{" "}
          {calculateDrawProbability(5)}%
        </Typography>
        <Typography>
          Probability to draw 6 card to start with:{" "}
          {calculateDrawProbability(6)}%
        </Typography>
      </Styles.DataContainer>
    </Grid>
  );
}
