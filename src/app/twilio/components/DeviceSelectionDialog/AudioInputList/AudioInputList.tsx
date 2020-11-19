import React from 'react';
import AudioLevelIndicator from '../../AudioLevelIndicator/AudioLevelIndicator';
import { LocalAudioTrack } from 'twilio-video';
import {
  FormControl,
  MenuItem,
  Typography,
  Select,
  Grid,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';

import { SELECTED_AUDIO_INPUT_KEY } from '../../../constants';
import { useAudioInputDevices } from '../../../hooks/deviceHooks/deviceHooks';
import useMediaStreamTrack from '../../../hooks/useMediaStreamTrack/useMediaStreamTrack';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

export default function AudioInputList() {
  const { t: translator } = useTranslation();
  const { audio: t } = translations.room;

  const audioInputDevices = useAudioInputDevices();
  const { localTracks } = useVideoContext();

  const localAudioTrack = localTracks.find(
    track => track.kind === 'audio',
  ) as LocalAudioTrack;
  const mediaStreamTrack = useMediaStreamTrack(localAudioTrack);
  const localAudioInputDeviceId = mediaStreamTrack?.getSettings().deviceId;

  function replaceTrack(newDeviceId: string) {
    window.localStorage.setItem(SELECTED_AUDIO_INPUT_KEY, newDeviceId);
    localAudioTrack?.restart({ deviceId: { exact: newDeviceId } });
  }

  return (
    <div>
      <Typography variant="subtitle2" gutterBottom>
        {translator(t.audioInput)}
      </Typography>
      <Grid container alignItems="center" justify="space-between">
        <div className="inputSelect">
          {audioInputDevices.length > 1 ? (
            <FormControl fullWidth>
              <Select
                onChange={e => replaceTrack(e.target.value as string)}
                value={localAudioInputDeviceId || ''}
                variant="outlined"
              >
                {audioInputDevices.map(device => (
                  <MenuItem value={device.deviceId} key={device.deviceId}>
                    {device.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <Typography>
              {localAudioTrack?.mediaStreamTrack.label ||
                translator(t.noLocalAudio)}
            </Typography>
          )}
        </div>
        <AudioLevelIndicator audioTrack={localAudioTrack} color="black" />
      </Grid>
    </div>
  );
}
