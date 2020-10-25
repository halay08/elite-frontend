import React from 'react';
import { makeStyles, Avatar } from '@material-ui/core';
import { Person as PersonIcon } from '@material-ui/icons';
import { User } from 'types/User';

type Props = {
  user: User;
};

const UserAvatar = ({ user }: Props) => {
  const classes = useStyles();
  const { avatar = '', name = '', surname = '' } = user;

  if (avatar) {
    return (
      <Avatar
        className={classes.avatar}
        alt="user-avatar"
        src={avatar}
      ></Avatar>
    );
  }

  if (name || surname) {
    const iconName = `${name[0]}${surname[0]}`.toUpperCase();
    return <Avatar className={classes.avatar}>{iconName}</Avatar>;
  }

  return (
    <Avatar className={classes.avatar}>
      <PersonIcon className={classes.avatarIcon} />
    </Avatar>
  );
};

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
  },
  avatarIcon: {
    color: theme.palette.primary.main,
  },
}));

export { UserAvatar };
