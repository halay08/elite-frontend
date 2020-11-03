import React from 'react';
import { IconButton, Badge } from '@material-ui/core';
import { Sms as SmsIcon } from '@material-ui/icons';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface Props {
  children?: JSX.Element;
}

const Messages = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <>
      <IconButton className={classes.headerButton}>
        <Badge badgeContent={4} color="secondary">
          <SmsIcon />
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

export { Messages };
