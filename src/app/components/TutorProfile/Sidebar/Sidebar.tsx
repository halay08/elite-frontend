import React from 'react';
import { Grid } from '@material-ui/core';
import { Tutor } from 'types/Tutor';
import Experiences from './Experiences';
import Expertises from './Expertises';
import About from './About';

type SidebarType = {
  tutor: Tutor;
};
function Sidebar({ tutor }: SidebarType): JSX.Element {
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      <Experiences tutor={tutor} />
      <Expertises tutor={tutor} />
      <About tutor={tutor} />
    </Grid>
  );
}

export default Sidebar;
