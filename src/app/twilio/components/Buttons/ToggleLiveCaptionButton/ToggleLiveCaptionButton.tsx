import React, { useCallback } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useToggle, useUpdateEffect, useUnmount } from 'ahooks';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';

import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import CaptionOffIcon from '../../../icons/CaptionOffIcon';
import CaptionOnIcon from '../../../icons/CaptionOnIcon';
import { IDataTrackCommunication } from '../../../types';
import { useAppState } from '../../../state';
import useSpeechRecognition from '../../../state/useCaption/useSpeechRecognition';
import PopupCaption from './PopupCaption';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ToggleLiveCaptionButton(props: {
  disabled?: boolean;
  className?: string;
}) {
  const classes = useStyles();
  const { room } = useVideoContext();
  const [showAlert, { toggle: setShowAlert }] = useToggle(false);
  const [activeCaption, { toggle: toggleActiveCaption }] = useToggle(false);
  const { toggleCaption } = useAppState();

  const { t: translator } = useTranslation();
  const { button: t } = translations.room;

  const [localDataTrackPublication] = [
    ...room.localParticipant.dataTracks.values(),
  ];

  const { listen, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      const msg: IDataTrackCommunication = {
        author: room.localParticipant.identity,
        message: result,
        type: 'caption',
      };

      // Send the message
      localDataTrackPublication.track.send(JSON.stringify(msg));
    },
  });

  useUnmount(() => {
    stop();
  });

  const toggleLiveCaptionButton = useCallback(() => {
    if (room.participants.size > 0) {
      toggleActiveCaption();
    } else {
      setShowAlert(true);
    }
  }, [room, setShowAlert, toggleActiveCaption]);

  useUpdateEffect(() => {
    const msg: IDataTrackCommunication = {
      author: room.localParticipant.identity,
      message: `${activeCaption}`,
      type: 'request-toggle-caption',
    };

    // Send request to be able to receive caption
    localDataTrackPublication.track.send(JSON.stringify(msg));
  }, [activeCaption]);

  useUpdateEffect(() => {
    toggleCaption ? listen() : stop();
  }, [toggleCaption]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
      >
        <Alert onClose={() => setShowAlert(false)} severity="error">
          {translator(t.caption.alert)}
        </Alert>
      </Snackbar>
      <Button
        className={[props.className, classes.container].join(' ')}
        onClick={toggleLiveCaptionButton}
        disabled={props.disabled}
        startIcon={activeCaption ? <CaptionOnIcon /> : <CaptionOffIcon />}
      >
        {translator(t.caption.buttonText)}
      </Button>
      {activeCaption && <PopupCaption />}
    </>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

export default ToggleLiveCaptionButton;
