import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  makeStyles,
  Container,
  CircularProgress,
  Typography,
  Button,
  Box,
} from '@material-ui/core';
import { auth } from 'config/firebase';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Link } from 'react-router-dom';
import { getTranslatedError } from 'utils/helpers';

type Props = {
  actionCode: string;
};

export function Verification({ actionCode }: Props) {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const translatedTexts = translations.emailTemplates.emailVerification;

  const [error, setError] = useState('');
  const [validCode, setValidCode] = useState(false);
  const [verifiedCode, setVerifiedCode] = useState(false);

  useEffect(() => {
    (async () => {
      await auth.applyActionCode(actionCode).then(
        () => {
          setValidCode(true);
        },
        error => {
          setError(getTranslatedError(translator, error.message));
          setValidCode(false);
        },
      );
      setVerifiedCode(true);
    })();
  }, [actionCode, translator]);

  const renderContent = () => {
    return (
      <Container>
        {!verifiedCode && <CircularProgress size={26} />}
        {verifiedCode && validCode && (
          <>
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
          </>
        )}
        {verifiedCode && !validCode && (
          <>
            <Typography variant="h3" color="error" className={classes.title}>
              {translator(translatedTexts.fail.title)}
            </Typography>
            <Typography
              variant="body2"
              color="error"
              className={classes.subTitle}
            >
              {error}
            </Typography>
          </>
        )}
      </Container>
    );
  };

  return (
    <>
      <Helmet>
        <title>{translator(translatedTexts.pageTitle)}</title>
      </Helmet>
      {renderContent()}
    </>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    marginRight: theme.spacing(2),
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
