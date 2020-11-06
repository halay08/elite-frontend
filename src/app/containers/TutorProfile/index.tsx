/* eslint-disable */
import { Helmet } from 'react-helmet-async';
import { Grid, Container, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { Tutor, mockTutor } from 'types/Tutor';
import { TutorProfile } from 'app/components/TutorProfile';
import { translations } from 'locales/i18n';
import { useTranslation } from 'react-i18next';


export default function () {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const { tutorProfile } = translations;
  const [tutor, setTutor] = useState<Tutor | undefined>();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        setTutor(mockTutor);
      })();
    }
  }, [isLoggedIn]);

  return (
    <>
      <Helmet>
        <title>{translator(tutorProfile.pageTitle)}</title>
        <meta name="description" content="Tutor profile page" />
      </Helmet>
      <Container className={classes.cardGrid} fixed>
        <Grid item xs={12} sm={12} md={12}>
          {tutor ? (
            <TutorProfile tutor={tutor} />
          ) : (
            <CircularProgress size={26} />
          )}
        </Grid>
      </Container>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));
