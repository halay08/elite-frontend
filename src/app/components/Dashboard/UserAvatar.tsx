import React from 'react';
import { makeStyles, Avatar } from '@material-ui/core';
import { Person as PersonIcon } from '@material-ui/icons';
import { User } from 'types/User';

type Props = {
  user: User;
  size?: number;
  withBorder?: boolean;
};

const UserAvatar = ({ user, size = 7, withBorder = true }: Props) => {
  const classes = useStyles(size, withBorder)();
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

const useStyles = (size, withBorder) =>
  makeStyles(theme => ({
    avatar: props => ({
      width: theme.spacing(size),
      height: theme.spacing(size),
      border: withBorder ? `2px solid ${theme.palette.primary.main}` : 'none',
      backgroundColor: 'transparent',
      color: theme.palette.primary.main,
    }),
    avatarIcon: {
      color: theme.palette.primary.main,
    },
  }));

export { UserAvatar };
