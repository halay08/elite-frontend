import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { Favorite as FavoriteIcon } from '@material-ui/icons';
import UserAvatar from 'app/components/Avatar/Avatar';
import { mockTutor } from 'types/Tutor';
import { getUserName } from 'helpers';
import RatingBlock from './RatingBlock';

function FeedbackBlock(): JSX.Element {
  const classes = useStyles();
  const tutor = mockTutor;
  const name = getUserName(tutor);

  return (
    <Grid container className={classes.container}>
      <Grid item className={classes.avatar}>
        <UserAvatar
          size={7}
          user={tutor}
          icon={<FavoriteIcon className={classes.icon} />}
        />
      </Grid>
      <Grid container direction="column" className={classes.comment}>
        <Typography component="p" className={classes.name}>
          {name}
        </Typography>
        <Typography component="p">
          I enjoyed my first session very much. I found Mr Rudi is kind and
          sincere. Hopefully I can continue learning from him.
        </Typography>
        <Grid item container justify="space-around" className={classes.rating}>
          <RatingBlock />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FeedbackBlock;

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
    flexWrap: 'nowrap',
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  comment: {
    backgroundColor: theme.palette.background.white,
    padding: 12,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  rating: {
    textTransform: 'uppercase',
    marginTop: theme.spacing(2),
  },
  icon: {
    color: 'red',
  },
}));
