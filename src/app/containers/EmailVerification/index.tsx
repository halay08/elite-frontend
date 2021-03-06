import React from 'react';
import { makeStyles, Container, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Verification } from './Verification';

type Props = {
  actionCode: string;
};

export function EmailVerification({ actionCode = '' }: Props) {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const translatedTexts = translations.emailTemplates.emailVerification;

  return !actionCode ? (
    <Container>
      <Typography variant="h3" className={classes.title}>
        {translator(translatedTexts.wrongURL)}
      </Typography>
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
