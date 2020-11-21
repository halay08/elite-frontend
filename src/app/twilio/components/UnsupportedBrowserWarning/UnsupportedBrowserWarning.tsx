import React from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';

import Video from 'twilio-video';
import { Container, Link, Typography, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function ({ children }: { children: React.ReactElement }) {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const { prejoinScreen: p } = translations.room;

  if (!Video.isSupported) {
    return (
      <Container>
        <Grid container justify="center" className={classes.container}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <Typography variant="h4" className={classes.heading}>
                {translator(p.unsupportedBrowserWarning.heading)}
              </Typography>
              <Typography>
                {translator(p.unsupportedBrowserWarning.openOneOf)}{' '}
                <Link
                  href="https://www.twilio.com/docs/video/javascript#supported-browsers"
                  target="_blank"
                  rel="noopener"
                >
                  {translator(p.unsupportedBrowserWarning.supportedBrowsers)}
                </Link>
                .
                <br />
                {translator(
                  p.unsupportedBrowserWarning.ifUsingSupportedBrowser,
                )}{' '}
                <Link
                  href="https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts"
                  target="_blank"
                  rel="noopener"
                >
                  {translator(p.unsupportedBrowserWarning.secureContext)}
                </Link>{' '}
                (e.g. https or localhost).
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return children;
}

const useStyles = makeStyles({
  container: {
    marginTop: '2.5em',
  },
  paper: {
    padding: '1em',
  },
  heading: {
    marginBottom: '0.4em',
  },
});
