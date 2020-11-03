/* eslint-disable */
import { Helmet } from 'react-helmet-async';
import { Grid, Tab, Tabs, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import TutorBlock from 'app/components/TutorBlock/TutorBlock';

export function RecommendedTutors() {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} fixed>
      <Grid item xs={12} sm={12} md={12}>
        <TutorBlock />
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  cardGrid: {
    padding: 0,
  },
}));
