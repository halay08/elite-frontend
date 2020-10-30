import { Grid, Button, makeStyles, Typography } from '@material-ui/core';
import React, { MouseEventHandler } from 'react';
import { translations } from 'locales/i18n';
import { useTranslation } from 'react-i18next';
import logo from 'statics/logo.svg';

type toptipBannerProps = {
  handleGetAll: MouseEventHandler<HTMLButtonElement>;
};
export default function ToptipBanner({
  handleGetAll,
}: toptipBannerProps): JSX.Element {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const { banner } = translations;

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="stretch"
      className={classes.container}
    >
      <Grid item xs={4} container justify="center">
        <img src={logo} alt="logo" className={classes.logo} />
      </Grid>
      <Grid
        item
        xs={8}
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
      >
        <Grid item>
          <Typography variant="h2" className={classes.title}>
            {translator(banner.title)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5" className={classes.subTitle}>
            {translator(banner.subTitle)}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            onClick={handleGetAll}
          >
            {translator(banner.button)}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.white,
    border: `15px solid ${theme.palette.background.default}`,
  },
  logo: {
    width: '225px',
    height: '225px',
  },
  button: {
    textTransform: 'uppercase',
    marginTop: theme.spacing(3),
  },
  title: {
    fontWeight: 400,
    lineHeight: 2,
  },
  subTitle: {
    fontWeight: 100,
  },
}));
