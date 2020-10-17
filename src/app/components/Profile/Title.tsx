import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Title({ defaultMessage = '' }) {
  const classes = useStyles();
  const { t: translator } = useTranslation();

  return (
    <Grid item xs={12} sm={12} md={12} className={classes.container}>
      <Typography variant="h3">{translator(defaultMessage)}</Typography>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
  },
}));
