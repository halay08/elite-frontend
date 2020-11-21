import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChatIcon from '@material-ui/icons/CommentOutlined';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

import ChatContent from './ChatContent';
import { useAppState } from '../../../state';

export default function ChatDrawerButton() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { notificationCount, setNotificationCount } = useAppState();

  const toggleDrawer = useCallback(
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setNotificationCount(0);
      setOpen(open);
    },
    [setNotificationCount, setOpen],
  );

  return (
    <React.Fragment>
      <Badge
        color="secondary"
        badgeContent={notificationCount}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className={classes.customBadge}
      >
        <Button size="small" onClick={toggleDrawer(true)}>
          <ChatIcon fontSize="small" />
        </Button>
      </Badge>
      <Drawer
        className={classes.customDrawer}
        open={open}
        onClose={toggleDrawer(false)}
      >
        <ChatContent />
      </Drawer>
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  customBadge: {
    '& > .MuiBadge-badge': {
      right: '20px',
      top: '4px',
    },
  },
  customDrawer: {
    '& > .MuiDrawer-paper': {
      background: '#e4e6ed',
    },
  },
}));
