import React from 'react';
import { Grid } from '@material-ui/core';
import { Tutor } from 'types/Tutor';
import Course from './Course';
import VideoIntro from './VideoIntro';

type TutorProfileType = {
  tutor: Tutor;
};
function TutorProfile({ tutor }: TutorProfileType): JSX.Element {
  return (
    <Grid container direction="row">
      <Grid item xs={12} sm={12} md={8}>
        <VideoIntro tutor={tutor} />
        <Course />
      </Grid>
      <Grid item xs={12} sm={12} md={4} />
    </Grid>
  );
}

export default TutorProfile;
