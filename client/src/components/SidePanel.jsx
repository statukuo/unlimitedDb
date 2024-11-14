import { Fab } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';

const sideBarWidth = 450;

const Styles = {
    Overall: styled.div`
        height: 100vh;
        position: absolute;
        left: 0;
    `,
    Overlay: styled.div`
        width: 0;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        backdrop-filter: blur(10px);
        ${props => props.$open && css`
            width: 100vw;
        `}
        z-index: 100;
    `,
    SidePanel: styled.div`
        margin: 0;
        width: ${sideBarWidth}px;
        position: absolute;
        top: 0;
        left: -${sideBarWidth}px;
        transition: left .2s ease-out;
        ${props => props.$open && css`
            left: 0;
            height: 100vh;
        `}
    `,
    Button: styled(Fab)`
        position: absolute;
        bottom: 50px;
        left: 50px;
        z-index: 50;
    `
};

export function SidePanel({children}) {
  const [openPanel, setOpenPanel] = useState(false);

  return (
    <Styles.Overall >
        <Styles.Button color="primary" aria-label="add" onClick={() => setOpenPanel(true)}>
            Filters
        </Styles.Button>
        <Styles.Overlay $open={openPanel} onClick={() => { console.log("CLOSE"); setOpenPanel(false);}}>
            <Styles.SidePanel $open={openPanel}>
                {children}
            </Styles.SidePanel>
        </Styles.Overlay>
    </Styles.Overall>
  );
}
