import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { Tabbar } from '../Tabbar';
import { Toolbar } from '../Toolbar';
import { StyledAppbar } from './style';

export const Appbar = observer(() => {
  return (
    <StyledAppbar>
      <Tabbar />
      <Toolbar />
    </StyledAppbar>
  );
});
