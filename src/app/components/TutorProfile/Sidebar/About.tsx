import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Tutor } from 'types/Tutor';
import Title from './Title';

type AboutType = {
  tutor: Tutor;
};
function About({ tutor }: AboutType): JSX.Element {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const { about } = translations.tutorSidebar;
  const { shortIntro = '' } = tutor;

  return (
    <Grid item className={classes.container}>
      <Grid item xs={12} sm={12} md={12}>
        <Title title={translator(about.title)} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} className={classes.shortIntro}>
        <Typography component="p">{shortIntro}</Typography>
      </Grid>
    </Grid>
  );
}

export default About;

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3),
    border: `1px solid ${theme.palette.background.dark}`,
    backgroundColor: theme.palette.background.white,
  },
  shortIntro: {
    padding: theme.spacing(1.5),
  },
}));
