import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import { Person as PersonIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from 'contexts/AuthContext';

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

export default function UserAvatar() {
  const classes = useStyles();
  const { user } = useAuth();

  if (user.photoURL) {
    return (
      <Avatar className={classes.avatar} alt="Avatar" src={user.photoURL} />
    );
  }

  const nameInitials = getNameInitials(user);
  if (nameInitials) {
    return (
      <Avatar className={classes.avatar} alt="Avatar">
        <Typography className={classes.nameInitials} variant="h2">
          {nameInitials}
        </Typography>
      </Avatar>
    );
  }

  return (
    <Avatar className={classes.avatar} alt="Avatar">
      <PersonIcon className={classes.personIcon} />
    </Avatar>
  );
}

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 'auto',
    width: theme.spacing(14),
    height: theme.spacing(14),
  },

  nameInitials: {
    cursor: 'default',
  },

  personIcon: {
    fontSize: theme.spacing(7),
  },
}));
