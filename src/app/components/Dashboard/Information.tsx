import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Typography, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Link } from 'react-router-dom';
import { User, mockUser, initUser } from 'types/User';
import { UserAvatar } from 'app/components/Avatar';
import { getUserName } from 'helpers';
import RoutePath from 'config/routes';

const Information = () => {
  const classes = useStyles();
  const [user, setUser] = useState<User>(initUser);
  const { t: translator } = useTranslation();
  const translatedTexts = translations.dashboard;

  useEffect(() => {
    setUser(mockUser);
  }, []);

  const name = getUserName(user);
  const createdAt = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : '';
  const sessions = user.sessions.coming + user.sessions.completed;
  const isProfileCompleted = user.profileCompleted === 100;

  return (
    <Grid container md={7} className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        wrap="nowrap"
      >
        <Grid item>
          <UserAvatar user={user} size={7} />
        </Grid>
        <Grid item sm container>
          <Grid item xs container direction="column" spacing={1}>
            <Grid item xs>
              <Typography variant="body2" gutterBottom>
                {name}
              </Typography>
              <Typography variant="body2">
                {translator(translatedTexts.since)}: {createdAt}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-end"
        className={classes.info}
        spacing={2}
      >
        <Grid item xs={12} sm={6}>
          <ul className={classes.infoList}>
            <li>
              {translator(translatedTexts.level)}: {user.level}
            </li>
            <li>
              {translator(translatedTexts.coins)}: {user.coins}
            </li>
            <li>
              {translator(translatedTexts.sessions)}: {sessions} (
              {user.sessions.coming} {translator(translatedTexts.coming)})
            </li>
          </ul>
        </Grid>
        {!isProfileCompleted && (
          <Grid
            item
            xs={12}
            sm={6}
            container
            className={classes.infoCompletion}
          >
            <Grid item xs container direction="column" spacing={1}>
              <Grid item xs>
                <Typography variant="body2" gutterBottom>
                  {user.profileCompleted}%
                </Typography>
                <Typography variant="body2">
                  {translator(translatedTexts.uncompletedProfile)}
                </Typography>
              </Grid>
              <Grid item xs>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to={RoutePath.accountSettings}
                  className={classes.button}
                >
                  {translator(translatedTexts.completeProfile)}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(4),
    border: `2px solid ${theme.palette.primary.main}`,
  },
  infoList: {
    paddingInlineStart: '25px',
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  infoCompletion: {
    textAlign: 'center',
  },
  button: {
    textTransform: 'none',
    borderRadius: 0,
  },
  info: {
    marginTop: theme.spacing(1),
  },
}));

export { Information };
