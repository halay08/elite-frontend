import React, { useCallback, ChangeEvent } from 'react';
import { Grid, Typography, makeStyles, Switch } from '@material-ui/core';
import { UserAvatar } from '../Avatar';
import { getUserName } from 'helpers';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Tutor } from 'types/Tutor';
import { lazyLoad } from 'utils/loadable';

const ReactPlayer = lazyLoad(
  () => import('react-player'),
  module => module.default,
);

type HeaderType = {
  tutor: Tutor;
};
function Header({ tutor }: HeaderType): JSX.Element {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const { tutorHeader } = translations;

  const name = getUserName(tutor);
  const { name: category } = tutor.category;

  const handleChange = useCallback((e: ChangeEvent) => {}, []);

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      <Grid item>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          className={classes.container}
        >
          <Grid item>
            <UserAvatar size={7} user={tutor} />
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <Grid container direction="column" className={classes.infomation}>
              <Grid item>
                <Typography variant="h2">{name}</Typography>
              </Grid>
              <Grid item>{translator(tutorHeader.subHead, { category })}</Grid>
            </Grid>
          </Grid>
          <Grid item xs={3} sm={3} md={3} className={classes.follow}>
            <Grid container alignItems="center">
              <Grid item justify="center">
                <Typography component="span" variant="body2">
                  {translator(tutorHeader.follow)}
                </Typography>
              </Grid>
              <Grid item justify="center">
                <Switch color="primary" onChange={handleChange} name="follow" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.playerWrapper}>
        <ReactPlayer
          className={classes.player}
          url={tutor.videoIntro}
          controls={true}
          width="100%"
          height="100%"
        />
      </Grid>
    </Grid>
  );
}

export default Header;

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  infomation: {
    marginLeft: theme.spacing(2),
  },
  follow: {
    marginLeft: 'auto',
    textAlign: 'center',
  },
  playerWrapper: {
    position: 'relative',
    paddingTop: '56.25%' /* Player ratio: 100 / (1280 / 720) */,
  },
  player: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
}));
