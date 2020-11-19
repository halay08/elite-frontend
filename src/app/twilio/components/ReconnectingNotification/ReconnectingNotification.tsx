import React from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';

import Snackbar from '../Snackbar/Snackbar';
import useRoomState from '../../hooks/useRoomState/useRoomState';

export default function ReconnectingNotification() {
  const roomState = useRoomState();
  const { t: translator } = useTranslation();
  const { prejoinScreen: p } = translations.room;

  return (
    <Snackbar
      variant="error"
      headline={translator(p.connectionLost)}
      message={translator(p.reconnecting)}
      open={roomState === 'reconnecting'}
    />
  );
}
