import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Typography,
  Grid,
  Button,
  Theme,
  Hidden,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import LocalVideoPreview from './LocalVideoPreview/LocalVideoPreview';
import SettingsMenu from './SettingsMenu/SettingsMenu';
import { Steps } from '../PreJoinScreens';
import ToggleAudioButton from '../../Buttons/ToggleAudioButton/ToggleAudioButton';
import ToggleVideoButton from '../../Buttons/ToggleVideoButton/ToggleVideoButton';
import { useAppState } from '../../../state';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

interface DeviceSelectionScreenProps {
  name: string;
  roomName: string;
  setStep: (step: Steps) => void;
}

const verifyAccess = bearer => {
  const pageURL = window.location.href;
  const lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
  const endpoint = `${process.env.REACT_APP_API_ORIGIN}/call/verify/${lastURLSegment}`;

  return fetch(`${endpoint}`, {
    headers: {
      Authorization: bearer,
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
};

export default function DeviceSelectionScreen({
  name,
  roomName,
  setStep,
}: DeviceSelectionScreenProps) {
  const classes = useStyles();
  const [isAllow, setPermission] = useState(false);

  const { getToken, isFetching } = useAppState();
  const { connect, isAcquiringLocalTracks, isConnecting } = useVideoContext();
  const disableButtons =
    isFetching || isAcquiringLocalTracks || isConnecting || !isAllow;

  const { t: translator } = useTranslation();
  const { button: b, prejoinScreen: p } = translations.room;

  useEffect(() => {
    (async () => {
      const bearer = localStorage.getItem('token');
      const { allow } = await verifyAccess(bearer);
      setPermission(Boolean(allow));
    })();
  }, []);

  const handleJoin = () => {
    getToken(name, roomName).then(token => connect(token));
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!isAllow}
        autoHideDuration={6000}
      >
        <Alert severity="error">{translator(p.permissionAlert)}</Alert>
      </Snackbar>
      <Typography variant="h5" className={classes.gutterBottom}>
        Join {roomName}
      </Typography>

      <Grid container justify="center">
        <Grid item md={7} sm={12} xs={12}>
          <div className={classes.localPreviewContainer}>
            <LocalVideoPreview identity={name} />
          </div>
          <div className={classes.mobileButtonBar}>
            <Hidden mdUp>
              <ToggleAudioButton
                className={classes.mobileButton}
                disabled={disableButtons}
              />
              <ToggleVideoButton
                className={classes.mobileButton}
                disabled={disableButtons}
              />
            </Hidden>
            <SettingsMenu mobileButtonClass={classes.mobileButton} />
          </div>
        </Grid>
        <Grid item md={5} sm={12} xs={12}>
          <Grid
            container
            direction="column"
            justify="space-between"
            style={{ height: '100%' }}
          >
            <div>
              <Hidden smDown>
                <ToggleAudioButton
                  className={classes.deviceButton}
                  disabled={disableButtons}
                />
                <ToggleVideoButton
                  className={classes.deviceButton}
                  disabled={disableButtons}
                />
              </Hidden>
            </div>
            <div className={classes.joinButtons}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setStep(Steps.roomNameStep)}
              >
                {translator(b.cancel)}
              </Button>
              <Button
                variant="contained"
                color="primary"
                data-cy-join-now
                onClick={handleJoin}
                disabled={disableButtons}
              >
                {translator(b.joinNow)}
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  gutterBottom: {
    marginBottom: '1em',
  },
  marginTop: {
    marginTop: '1em',
  },
  deviceButton: {
    width: '100%',
    border: '2px solid #aaa',
    margin: '1em 0',
  },
  localPreviewContainer: {
    paddingRight: '2em',
    [theme.breakpoints.down('sm')]: {
      padding: '0 2.5em',
    },
  },
  joinButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      width: '100%',
      '& button': {
        margin: '0.5em 0',
      },
    },
  },
  mobileButtonBar: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '1.5em 0 1em',
    },
  },
  mobileButton: {
    padding: '0.8em 0',
    margin: 0,
  },
}));
