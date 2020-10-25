import React from 'react';
import { makeStyles, Container, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { ResetPassword } from '../ResetPassword/Loadable';
import { EmailVerification } from '../EmailVerification/Loadable';

export function AccountAction(props) {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const translatedTexts = translations.emailTemplates.emailVerification;

  // Get the one-time code from the query parameter.
  const params = new URLSearchParams(props.location.search);
  const actionMode = params.get('mode') || '';
  const actionCode = params.get('oobCode') || '';

  const renderContent = () => {
    switch (actionMode) {
      case 'resetPassword':
        return <ResetPassword actionCode={actionCode} />;
      case 'verifyEmail':
        return <EmailVerification actionCode={actionCode} />;
      default:
        return <></>;
    }
  };

  return !actionCode || !actionMode ? (
    <Container>
      <>
        <Typography variant="h3" className={classes.title}>
          {translator(translatedTexts.wrongURL)}
        </Typography>
      </>
    </Container>
  ) : (
    <>{renderContent()}</>
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
