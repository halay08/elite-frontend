/* eslint-disable */
import { Helmet } from 'react-helmet-async';
import {
  Grid,
  Container,
  CircularProgress,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
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
      <Container className={classes.root}>
        {tutor ? (
          <TutorProfile tutor={tutor} />
        ) : (
          <CircularProgress size={26} />
        )}
      </Container>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0,
    },
  }),
);
