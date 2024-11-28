import { Drawer, Fab } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const Styles = {
  SidePanel: styled(Drawer)`
    width: 400px;
    height: 100%;
    overflow: auto;
  `,
  Button: styled(Fab)`
    position: fixed;
    bottom: ${(props) => (props.theme.extraBottom ? 80 : 50)}px;
    left: 0;
    width: 70px;
    border-radius: 0 25px 25px 0;
    z-index: 50;
  `,
};

export function SidePanel({
  children,
  extraBottom,
  open,
  setExternalOpen = () => {},
}) {
  const [openPanel, setOpenPanel] = useState(false);

  return (
    <div>
      <Styles.SidePanel
        open={openPanel || open}
        onClose={() => {
          setOpenPanel(false);
          setExternalOpen(false);
        }}
      >
        {children}
      </Styles.SidePanel>
      <Styles.Button
        color="primary"
        aria-label="add"
        theme={{ extraBottom }}
        onClick={() => setOpenPanel(true)}
      >
        <FilterAltIcon />
      </Styles.Button>
    </div>
  );
}
