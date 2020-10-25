import React from 'react';
import { makeStyles, Grid, Button, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Link } from 'react-router-dom';

const EmptySessions = () => {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const translatedTexts = translations.dashboard.emptySessions;

  return (
    <Grid container md={7} className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item md={7} className={classes.item}>
          <Typography variant="body2" gutterBottom>
            {translator(translatedTexts.title)}
          </Typography>
        </Grid>
        <Grid item md={7} className={classes.item}>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            component={Link}
            to="/"
            className={classes.button}
          >
            {translator(translatedTexts.button)}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  item: {
    textAlign: 'center',
  },
  button: {
    textTransform: 'none',
    borderRadius: 0,
    marginTop: theme.spacing(1),
  },
}));

export { EmptySessions };
