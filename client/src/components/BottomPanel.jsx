import { Box, SwipeableDrawer, Typography } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import styled from "styled-components";

const PULLER_SIZE = 60;
const Styles = {
  PullerText: styled(Box)`
    position: absolute;
    top: -${PULLER_SIZE}px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    visibility: visible;
    background-color: white;
    right: 0;
    left: 0;
    height: calc(100% + ${PULLER_SIZE}px);
    p {
      margin-top: ${PULLER_SIZE / 2}px;
    }
  `,
  Puller: styled(Box)`
    width: 30%;
    height: 10px;
    background-color: grey;
    position: absolute;
    top: 12px;
    left: 35%;
    border-radius: 4px;
  `,
  Content: styled(Box)`
    height: 100%;
    overflow: auto;
  `,
};
export function BottomPanel({ children, title }) {
  const [openPanel, setOpenPanel] = useState(false);

  return (
    <div>
      <SwipeableDrawer
        anchor="bottom"
        open={openPanel}
        onClose={() => setOpenPanel(false)}
        onOpen={() => setOpenPanel(true)}
        swipeAreaWidth={PULLER_SIZE}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Styles.PullerText boxShadow={24}>
          <Styles.Puller />
          <Typography align="center">{title}</Typography>
        </Styles.PullerText>

        <Styles.Content sx={{ px: 2, pb: 2, height: "100%", overflow: "auto" }}>
          {children}
        </Styles.Content>
      </SwipeableDrawer>
    </div>
  );
}