import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useMemo } from 'react';
import { translations } from 'locales/i18n';
import { useTranslation } from 'react-i18next';

export default function Greeting(props) {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const { loginForm: loginFormTexts } = translations;

  const hour = useMemo(() => {
    const date = new Date();
    return date.getHours();
  }, []);

  const greeting =
    hour < 12
      ? loginFormTexts.greeting.morning
      : hour > 17
      ? loginFormTexts.greeting.evening
      : loginFormTexts.greeting.afternoon;
  return (
    <Typography {...props} className={classes.greeting}>
      {translator(greeting)}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  greeting: {
    fontWeight: 500,
    textAlign: 'center',
    marginTop: theme.spacing(4),
  },
  subGreeting: {
    fontWeight: 500,
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
}));
