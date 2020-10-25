import React from 'react';
import { Container, Typography, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ForgetPasswordForm } from 'app/components/ForgetPasswordForm';
import { translations } from 'locales/i18n';

export function ForgetPassword(props) {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const { forgetPasswordForm: forgetPasswordFormTexts } = translations;

  return (
    <Container className={classes.container}>
      <Typography variant="h3" className={classes.greeting}>
        {translator(forgetPasswordFormTexts.title)}
      </Typography>
      <Typography variant="body2" className={classes.subGreeting}>
        {translator(forgetPasswordFormTexts.subTitle)}
      </Typography>
      <ForgetPasswordForm />
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontWeight: 500,
    textAlign: 'center',
    marginTop: theme.spacing(4),
  },
  subGreeting: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));
