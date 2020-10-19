import React from 'react';
import { makeStyles, Container, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Verification } from './Verification';

export function EmailVerification(props) {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const translatedTexts = translations.emailTemplates.emailVerification;

  // Get the one-time code from the query parameter.
  const params = new URLSearchParams(props.location.search);
  const actionCode = params.get('oobCode') || '';

  return !actionCode ? (
    <Container>
      {!actionCode && (
        <>
          <Typography variant="h2" className={classes.title}>
            {translator(translatedTexts.wrongURL)}
          </Typography>
        </>
      )}
    </Container>
  ) : (
    <Verification actionCode={actionCode} />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontWeight: 500,
    textAlign: 'center',
    marginTop: theme.spacing(4),
  },
}));
