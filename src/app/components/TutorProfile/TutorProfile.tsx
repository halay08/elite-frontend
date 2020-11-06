import React from 'react';
import { Grid } from '@material-ui/core';
import Header from './Header';
import { Tutor } from 'types/Tutor';

type TutorProfileType = {
  tutor: Tutor;
};
function TutorProfile({ tutor }: TutorProfileType): JSX.Element {
  return (
    <Grid container direction="row">
      <Grid item xs={12} sm={12} md={8}>
        <Header tutor={tutor} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} />
    </Grid>
  );
}

export default TutorProfile;
