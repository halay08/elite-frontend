import React from 'react';
import { makeStyles, Box } from '@material-ui/core';
import { User } from 'types/User';
import { UserAvatar } from 'app/components/Avatar';
import { getUserName } from 'helpers';
import { hideIfNoData } from 'helpers';
import isEmpty from 'ramda.isempty';

type Props = {
  user: User;
};

const checkProps = hideIfNoData(({ user }: Props) => isEmpty(user));

const Profile = ({ user }: Props) => {
  const classes = useStyles();

  const name = getUserName(user);

  return (
    <Box display="flex" flexDirection="column" width={1} height={1}>
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <UserAvatar user={user} size={14} withBorder={false} />
        <Box
          component="p"
          color="text.secondary"
          className={classes.name}
          mt={2}
          mb={0.5}
        >
          {name}
        </Box>
        <Box component="p" color="text.secondary">
          {user.level}
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  name: {
    fontSize: '1.125rem',
  },
}));
export default checkProps(Profile);
