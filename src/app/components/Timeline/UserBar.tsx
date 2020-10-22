import { makeStyles, Grid, Typography } from '@material-ui/core';
import { Settings as SettingsIcon } from '@material-ui/icons';
import React from 'react';
import { translations } from 'locales/i18n';
import { useTranslation } from 'react-i18next';
import { UserAvatar } from '../Avatar';
import { User } from 'types/User';
import { getUserName } from 'helpers';

type userBarProps = {
  userData: User;
};
export default function UserBar({ userData }: userBarProps): JSX.Element {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const { timeline } = translations;
  const name = getUserName(userData);
  const createdAt = userData.createdAt
    ? new Date(userData.createdAt).toLocaleDateString()
    : '';

  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      className={classes.container}
    >
      <Grid item>
        <UserAvatar size={7} />
      </Grid>
      <Grid item>
        <Grid container direction="column" className={classes.infomation}>
          <Grid item>
            <Typography variant="h2">{name}</Typography>
          </Grid>
          <Grid item>{translator(timeline.userBar.since) + createdAt}</Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.setting}>
        <SettingsIcon />
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  infomation: {
    marginLeft: theme.spacing(2),
  },
  setting: {
    marginLeft: 'auto',
  },
}));
