import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import { Person as PersonIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';

type UserAvatarTypes = {
  size?: number;
  user?: {
    avatar?: string;
    photoURL?: string;
    name?: string;
    surname?: string;
    displayName?: string;
  };
};

const getNameInitials = user => {
  const { name, surname, displayName } = user;
  if (name && surname) {
    return name.charAt(0) + surname.charAt(0);
  }

  if (name) {
    return name.charAt(0);
  }

  if (displayName) {
    return displayName.charAt(0);
  }

  return '';
};

export default function UserAvatar({
  size = 14,
  user = {},
}: UserAvatarTypes): JSX.Element {
  const classes = useStyles(size)();
  const { t: translator } = useTranslation();
  const { avatar } = translations;

  const url = user.photoURL || user.avatar || '';
  if (url) {
    return (
      <Avatar
        className={classes.avatar}
        alt={translator(avatar.alt)}
        src={url}
      />
    );
  }

  const nameInitials = getNameInitials(user);
  if (nameInitials) {
    return (
      <Avatar className={classes.avatar} alt={translator(avatar.alt)}>
        <Typography className={classes.nameInitials} variant="h2">
          {nameInitials}
        </Typography>
      </Avatar>
    );
  }

  return (
    <Avatar className={classes.avatar} alt={translator(avatar.alt)}>
      <PersonIcon className={classes.personIcon} />
    </Avatar>
  );
}

const useStyles = size =>
  makeStyles(theme => ({
    avatar: {
      margin: 'auto',
      width: theme.spacing(size),
      height: theme.spacing(size),
    },

    nameInitials: {
      cursor: 'default',
    },

    personIcon: {
      fontSize: theme.spacing(7),
    },
  }));
