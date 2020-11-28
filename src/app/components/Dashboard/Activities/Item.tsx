import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Activity } from './mocks';

type Props = {
  activity: Activity;
};

const Item = ({ activity }: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.listItemRoot}>
      <Box
        mr={2}
        mt={1}
        style={{
          height: 8,
          minWidth: 8,
          borderRadius: '50%',
          backgroundColor: activity.color,
        }}
      />
      <Box className={classes.contentArea}>
        <Box component="p">{activity.title}</Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  contentArea: {
    fontSize: 14,
  },
  avatarSize: {
    width: 48,
    height: 48,
  },
  listItemRoot: {
    display: 'flex',
    alignItems: 'flex-start',
    textAlign: 'left',
    paddingBottom: theme.spacing(2),
  },
}));

export default Item;
