import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import { User, mockUser, initUser } from 'types/User';
import { UserAvatar } from 'app/components/Avatar';
import { getUserName } from 'helpers';

const UserInfo = () => {
  const classes = useStyles();
  const [user, setUser] = useState<User>(initUser);

  useEffect(() => {
    setUser(mockUser);
  }, []);

  const name = getUserName(user);

  return (
    <Grid container className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        wrap="nowrap"
      >
        <Grid item>
          <UserAvatar user={user} withBorder={false} size={6} />
        </Grid>
        <Grid item sm container>
          <Grid item xs container direction="column">
            <Grid item xs>
              <Typography variant="h5" className={classes.name}>
                {name}
              </Typography>
              <Typography
                variant="body2"
                className={classes.subName}
              ></Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
  },
  name: {
    fontWeight: 500,
    color: theme.palette.primary.contrastText,
  },
  subName: {
    fontWeight: 400,
    color: theme.palette.mainSidebarText.main,
  },
}));

export { UserInfo };
