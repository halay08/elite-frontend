import React from 'react';
import { ListItem, makeStyles, Box, fade } from '@material-ui/core';
import clsx from 'clsx';
import { Notification } from './mocks';
import path from 'ramda.path';

type Props = {
  item: Notification;
};

export const shouldNotRerenderItem = (prevProps, nextProps) => {
  const idParam = ['item', 'id'];
  const readParam = ['item', 'read'];
  return (
    path(idParam, prevProps) === path(idParam, nextProps) &&
    path(readParam, prevProps) === path(readParam, nextProps)
  );
};

const NotificationItem = React.memo(({ item }: Props) => {
  const classes = useStyles();
  return (
    <ListItem
      className={clsx(
        classes.listItemRoot,
        'item-hover',
        `${item.read ? '' : 'unread'}`,
      )}
    >
      <Box className={classes.textBase} color="text.secondary">
        {item.message}
      </Box>
    </ListItem>
  );
}, shouldNotRerenderItem);

export { NotificationItem };

const useStyles = makeStyles(theme => ({
  '@global': {
    '.item-hover': {
      '&:hover': {
        backgroundColor: fade(theme.palette.primary.main, 0.1),
      },
    },
    '.unread': {
      color: theme.palette.primary.main,
    },
  },
  textBase: {
    fontSize: 14,
    color: 'inherit',
  },
  listItemRoot: {
    padding: theme.spacing(2),
  },
}));
