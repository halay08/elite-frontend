import React, { PropsWithChildren } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';

import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';

import Video from 'twilio-video';
import { useAppState } from '../../state';

interface AboutDialogProps {
  open: boolean;
  onClose(): void;
}

function AboutDialog({ open, onClose }: PropsWithChildren<AboutDialogProps>) {
  const { roomType } = useAppState();
  const { room } = useVideoContext();

  const { t: translator } = useTranslation();
  const { about: t } = translations.room;

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="xs">
      <DialogTitle>{translator(t.title)}</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>
          {translator(t.roomName)}: {room.name}
        </DialogContentText>
        <DialogContentText>
          {translator(t.browserSupported)}: {String(Video.isSupported)}
        </DialogContentText>
        {roomType && (
          <DialogContentText>
            {translator(t.roomType)}: {roomType}
          </DialogContentText>
        )}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained" autoFocus>
          {translator(t.OK)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AboutDialog;
