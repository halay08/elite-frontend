import React, { useState } from 'react';
import { Grid, Typography, makeStyles, Button } from '@material-ui/core';
import { translations } from 'locales/i18n';
import { useTranslation } from 'react-i18next';

export default function RecommendBar(): JSX.Element {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const { recommendedBar } = translations;
  const [noRecommended, setNoRecommended] = useState(0);

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="stretch"
      className={classes.container}
    >
      <Grid
        item
        xs={6}
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item>
          <Typography variant="h1">
            {translator(recommendedBar.title)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">
            {translator(recommendedBar.subTitle, { noRecommended })}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={6}
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item>
          <Button variant="contained" color="primary" size="large">
            {translator(recommendedBar.button.choose)}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" size="large">
            {translator(recommendedBar.button.online)}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    border: `2px solid ${theme.palette.primary.dark}`,
    color: theme.palette.primary.dark,
  },
}));
