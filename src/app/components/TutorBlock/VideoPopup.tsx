import React from 'react';
import {
  Button,
  Dialog,
  Grid,
  makeStyles,
  Slide,
  SlideProps,
  Typography,
} from '@material-ui/core';
import { Report as ReportIcon, Stars as StarsIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { lazyLoad } from 'utils/loadable';
import { Tutor } from 'types/Tutor';
import { getUserName, hideIfNoData } from 'helpers';
import { UserAvatar } from 'app/components/Avatar';

const ReactPlayer = lazyLoad(
  () => import('react-player'),
  module => module.default,
);

const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

type VideoPopupType = {
  isOpen: boolean;
  tutor: Tutor;
  handleClose: (e: Event) => void;
};

const checkProps = hideIfNoData(({ tutor }: VideoPopupType) => tutor === null);

function VideoPopup({
  isOpen,
  tutor,
  handleClose,
}: VideoPopupType): JSX.Element {
  const classes = useStyles();
  const name = getUserName(tutor);
  const { videoPopup: videoPopupText } = translations;
  const { t: translator } = useTranslation();

  return (
    <Dialog
      maxWidth="md"
      TransitionComponent={Transition}
      open={isOpen}
      onClose={handleClose}
    >
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        <Grid item className={classes.playerWrapper}>
          <ReactPlayer
            className={classes.player}
            url={tutor.videoIntro}
            controls={true}
            width="100%"
            height="100%"
          />
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          className={classes.container}
        >
          <UserAvatar size={7} user={tutor} />
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            container
            direction="column"
            className={classes.infomation}
          >
            <Typography variant="h3" color="primary">
              {name}
            </Typography>
            <Typography component="p" variant="body2">
              <Typography component="span" className={classes.label}>
                {`${translator(videoPopupText.accent)}: `}
              </Typography>
              {tutor.country.name}
            </Typography>
            <Typography component="p" variant="body2">
              <Typography component="span" className={classes.label}>
                {`${translator(videoPopupText.happy)}: `}
              </Typography>
              <StarsIcon fontSize="inherit" />
              {tutor.reviews}
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sm={3}
            md={3}
            className={classes.follow}
            container
            justify="flex-end"
          >
            <Button
              variant="contained"
              color="primary"
              className={classes.profileButton}
            >
              <Typography
                component="span"
                variant="body2"
                className={classes.label}
              >
                {translator(videoPopupText.profileButton)}
              </Typography>
            </Button>
            <Button startIcon={<ReportIcon />} className={classes.report}>
              <Typography component="span" variant="body2">
                {translator(videoPopupText.report)}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default checkProps(VideoPopup);

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.dark,
  },
  infomation: {
    marginLeft: theme.spacing(2),
  },
  label: {
    fontWeight: 700,
  },
  follow: {
    marginLeft: 'auto',
    textAlign: 'center',
  },
  playerWrapper: {
    minWidth: 768,
    position: 'relative',
    paddingTop: '56.25%' /* Player ratio: 100 / (1280 / 720) */,
  },
  player: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  profileButton: {
    borderRadius: theme.spacing(4),
    textTransform: 'uppercase',
  },
  report: {
    paddingBottom: 0,
    marginTop: theme.spacing(1),
  },
}));
