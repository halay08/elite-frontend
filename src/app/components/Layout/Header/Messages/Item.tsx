import React from 'react';
import Box from '@material-ui/core/Box';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { UserAvatar } from 'app/components/Avatar';
import { getUserName } from 'helpers';
import { Message } from './mocks';
import { shouldNotRerenderItem } from 'app/components/Layout/Header/Notifications/Item';

type Props = {
  item: Message;
};

export const MessageItem = React.memo(({ item }: Props) => {
  const classes = useStyles();

  return (
    <ListItem className={clsx(classes.listItemRoot, 'item-hover')}>
      <Box mr={2}>
        <ListItemAvatar className={classes.minWidth0}>
          <UserAvatar user={item.user} size={6} withBorder={false} />
        </ListItemAvatar>
      </Box>
      <Box className={classes.textBase}>
        <Box
          mb={0.5}
          component="p"
          fontSize={14}
          className={clsx(classes.name, classes.ellipsisText)}
        >
          {getUserName(item.user)}
        </Box>
        <Box
          component="p"
          color="text.secondary"
          className={clsx(classes.ellipsisText, `${item.read ? '' : 'unread'}`)}
        >
          {item.message}
        </Box>
      </Box>
    </ListItem>
  );
}, shouldNotRerenderItem);

const useStyles = makeStyles(theme => ({
  '@global': {
    p: {
      margin: 0,
    },
    '.unread': {
      color: theme.palette.primary.main,
    },
  },
  textBase: {
    fontSize: 14,
    display: 'inline-grid',
  },
  ellipsisText: {
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'inline-block',
  },
  avatar: {
    width: 48,
    height: 48,
  },
  minWidth0: {
    minWidth: 0,
  },
  listItemRoot: {
    padding: '8px 20px',
  },
  name: {
    fontWeight: 'bold',
  },
}));
