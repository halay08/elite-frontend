import React from 'react';

import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';

import MicIcon from '../../../icons/MicIcon';
import MicOffIcon from '../../../icons/MicOffIcon';

import useLocalAudioToggle from '../../../hooks/useLocalAudioToggle/useLocalAudioToggle';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

export default function ToggleAudioButton(props: {
  disabled?: boolean;
  className?: string;
}) {
  const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();
  const { localTracks } = useVideoContext();
  const hasAudioTrack = localTracks.some(track => track.kind === 'audio');

  const { t: translator } = useTranslation();
  const { button: b } = translations.room;

  return (
    <Button
      className={props.className}
      onClick={toggleAudioEnabled}
      disabled={!hasAudioTrack || props.disabled}
      startIcon={isAudioEnabled ? <MicIcon /> : <MicOffIcon />}
      data-cy-audio-toggle
    >
      {!hasAudioTrack
        ? translator(b.audio.noAudio)
        : isAudioEnabled
        ? translator(b.audio.mute)
        : translator(b.audio.unMute)}
    </Button>
  );
}
