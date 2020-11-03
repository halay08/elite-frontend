import React from 'react';
import { makeStyles, Avatar, Typography } from '@material-ui/core';
import { Person as PersonIcon } from '@material-ui/icons';
import { User } from 'types/User';

type Props = {
  user: User;
  size?: number;
  withBorder?: boolean;
};

const getUserAvatarName = (user: User) => {
  const { name, surname, displayName } = user;
  if (name && surname) {
    return `${name[0]}${surname[0]}`.toUpperCase();
  }

  if (name) {
    return `${name[0]}`.toUpperCase();
  }

  if (displayName) {
    return `${displayName[0]}`.toUpperCase();
  }

  return '';
};

const UserAvatar = ({ user, size = 17, withBorder = true }: Props) => {
  const classes = useStyles(size, withBorder)();
  const { avatar = '', photoURL = '' } = user;

  if (avatar || photoURL) {
    return (
      <Avatar
        className={classes.avatar}
        alt="user-avatar"
        src={avatar || photoURL}
      ></Avatar>
    );
  }

  const iconName = getUserAvatarName(user);
  if (iconName) {
    return (
      <Avatar className={classes.avatar}>
        <Typography className={classes.iconName} variant="body1">
          {iconName}
        </Typography>
      </Avatar>
    );
  }

  return (
    <Avatar className={classes.avatar}>
      <PersonIcon className={classes.avatarIcon} />
    </Avatar>
  );
};

const useStyles = (size: number, withBorder: boolean) =>
  makeStyles(theme => ({
    avatar: () => ({
      width: theme.spacing(size),
      height: theme.spacing(size),
      border: withBorder ? `2px solid ${theme.palette.primary.main}` : 'none',
      backgroundColor: 'transparent',
      color: theme.palette.primary.main,
    }),
    avatarIcon: {
      color: theme.palette.primary.main,
      fontSize: theme.spacing(7),
    },
    iconName: {
      cursor: 'default',
    },
  }));

export default UserAvatar;
