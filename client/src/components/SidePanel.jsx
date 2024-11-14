import { Drawer, Fab } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const Styles = {
    Button: styled(Fab)`
        position: fixed;
        bottom: 50px;
        left: 50px;
        z-index: 50;
    `
};

export function SidePanel({children}) {
  const [openPanel, setOpenPanel] = useState(false);

  return (
    <div>
        <Drawer open={openPanel} onClose={() => setOpenPanel(false)}>
            {children}
        </Drawer>
        <Styles.Button color="primary" aria-label="add" onClick={() => setOpenPanel(true)}>
            Filters
        </Styles.Button>
    </div>
  );
}
