import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Container,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import { auth } from 'config/firebase';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Form } from './Form';
import { getTranslatedError } from 'utils/helpers';

type Props = {
  actionCode: string;
};

export function Verification({ actionCode }: Props) {
  const classes = useStyles();
  const { t: translator } = useTranslation();

  const { resetPassword: translatedTexts, errorMessages } = translations;

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [validCode, setValidCode] = useState(false);
  const [verifiedCode, setVerifiedCode] = useState(false);

  useEffect(() => {
    (async () => {
      await auth.verifyPasswordResetCode(actionCode).then(
        email => {
          setEmail(email);
          setValidCode(true);
          setVerifiedCode(true);
        },
        error => {
          setError(getTranslatedError(translator, error.message));
          setValidCode(false);
          setVerifiedCode(true);
        },
      );
    })();
  }, [actionCode, errorMessages, translator]);

  const renderContent = () => {
    if (!verifiedCode) {
      return (
        <Container className={classes.loading}>
          <CircularProgress size={26} />
        </Container>
      );
    }

    if (verifiedCode && !validCode) {
      return (
        <Container>
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
        </Container>
      );
    }

    return <Form actionCode={actionCode} email={email} />;
  };

  return <>{renderContent()}</>;
}

const useStyles = makeStyles(theme => ({
  loading: {
    textAlign: 'center',
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
}));
