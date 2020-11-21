import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import RatingBlock from './RatingBlock';

function SummaryBar(): JSX.Element {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const { tutorReview } = translations;

  return (
    <Grid
      container
      justify="space-around"
      alignItems="center"
      className={classes.container}
    >
      <Grid
        item
        xs={3}
        sm={3}
        md={3}
        container
        direction="column"
        alignItems="center"
      >
        <Typography component="span" variant="h2" color="primary">
          104
        </Typography>
        <Typography component="span">
          {translator(tutorReview.summary.happy)}
        </Typography>
      </Grid>
      <RatingBlock />
    </Grid>
  );
}

export default SummaryBar;

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.white,
    border: `1px solid ${theme.palette.background.dark}`,
    padding: 16,
    textTransform: 'uppercase',
  },
}));
