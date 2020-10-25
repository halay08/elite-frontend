import React from 'react';
import {
  makeStyles,
  Container,
  Typography,
  Button,
  Box,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Link } from 'react-router-dom';

export function Success() {
  const classes = useStyles();
  const { t: translator } = useTranslation();

  const { resetPassword: translatedTexts } = translations;

  return (
    <Container className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        {translator(translatedTexts.success.title)}
      </Typography>
      <Typography variant="body2" className={classes.subTitle}>
        {translator(translatedTexts.success.subTitle)}
      </Typography>
      <Box width="100%" className={classes.buttonContainer}>
        <Box width="25%" className={classes.button}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            {translator(translatedTexts.success.login)}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    '&a': {
      textDecoration: 'none',
    },
  },
  title: {
    fontWeight: 500,
    textAlign: 'center',
    marginTop: theme.spacing(4),
  },
  subTitle: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
  buttonContainer: {
    marginTop: theme.spacing(2.5),
    height: 46,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    textAlign: 'center',
  },
}));
