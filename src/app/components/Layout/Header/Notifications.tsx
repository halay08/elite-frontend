import React from 'react';
import { IconButton, Badge } from '@material-ui/core';
import { NotificationsActive as NotificationsActiveIcon } from '@material-ui/icons';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface Props {
  children?: JSX.Element;
}

const Notifications = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <>
      <IconButton className={classes.headerButton}>
        <Badge badgeContent={11} color="secondary">
          <NotificationsActiveIcon />
        </Badge>
      </IconButton>
      {children}
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerButton: {
      color: theme.palette.mainSidebarText.main,
    },
  }),
);

export { Notifications };
