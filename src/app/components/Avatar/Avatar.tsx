import React from 'react';
import { makeStyles, Avatar, Typography, Badge } from '@material-ui/core';
import { Person as PersonIcon } from '@material-ui/icons';
import { User } from 'types/User';

type Props = {
  user: User;
  size?: number;
  withBorder?: boolean;
  icon?: JSX.Element | undefined;
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

type BadgeAvatarType = {
  children: JSX.Element;
  icon: JSX.Element | undefined;
};
function BadgeAvatar({ children, icon }: BadgeAvatarType): JSX.Element {
  if (!icon) {
    return children;
  }

  return (
    <Badge
      overlap="circle"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      badgeContent={icon}
    >
      {children}
    </Badge>
  );
}
const UserAvatar = ({ user, size = 17, withBorder = true, icon }: Props) => {
  const classes = useStyles(size, withBorder)();
  const { avatar = '', photoURL = '' } = user;

  if (avatar || photoURL) {
    return (
      <BadgeAvatar icon={icon}>
        <Avatar
          className={classes.avatar}
          alt="user-avatar"
          src={avatar || photoURL}
        ></Avatar>
      </BadgeAvatar>
    );
  }

  const iconName = getUserAvatarName(user);
  if (iconName) {
    return (
      <BadgeAvatar icon={icon}>
        <Avatar className={classes.avatar}>
          <Typography className={classes.iconName} variant="body1">
            {iconName}
          </Typography>
        </Avatar>
      </BadgeAvatar>
    );
  }

  return (
    <BadgeAvatar icon={icon}>
      <Avatar className={classes.avatar}>
        <PersonIcon className={classes.avatarIcon} />
      </Avatar>
    </BadgeAvatar>
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
