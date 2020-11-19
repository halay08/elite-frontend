import React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';

import { makeStyles } from '@material-ui/core/styles';
import { Participant } from 'twilio-video';
import useParticipantIsReconnecting from '../../../hooks/useParticipantIsReconnecting/useParticipantIsReconnecting';
import { Tooltip } from '@material-ui/core';

export default function ParticipantConnectionIndicator({
  participant,
}: {
  participant: Participant;
}) {
  const isReconnecting = useParticipantIsReconnecting(participant);
  const classes = useStyles();

  const { t: translator } = useTranslation();
  const { participant: p } = translations.room;

  return (
    <Tooltip
      title={
        isReconnecting
          ? translator(p.isReconnecting).toString()
          : translator(p.isConnected).toString()
      }
    >
      <span
        className={clsx(classes.indicator, {
          [classes.isReconnecting]: isReconnecting,
        })}
      ></span>
    </Tooltip>
  );
}

const useStyles = makeStyles({
  indicator: {
    width: '10px',
    height: '10px',
    borderRadius: '100%',
    background: '#0c0',
    display: 'inline-block',
    marginRight: '3px',
  },
  isReconnecting: {
    background: '#ffb100',
  },
});
