import React from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';

import { FormControl, MenuItem, Typography, Select } from '@material-ui/core';
import { useAppState } from '../../../state';
import { useAudioOutputDevices } from '../../../hooks/deviceHooks/deviceHooks';

export default function AudioOutputList() {
  const { t: translator } = useTranslation();
  const { audio: t } = translations.room;

  const audioOutputDevices = useAudioOutputDevices();
  const { activeSinkId, setActiveSinkId } = useAppState();
  const activeOutputLabel = audioOutputDevices.find(
    device => device.deviceId === activeSinkId,
  )?.label;

  return (
    <div className="inputSelect">
      {audioOutputDevices.length > 1 ? (
        <FormControl fullWidth>
          <Typography variant="subtitle2" gutterBottom>
            {translator(t.audioOutput)}
          </Typography>
          <Select
            onChange={e => setActiveSinkId(e.target.value as string)}
            value={activeSinkId}
            variant="outlined"
          >
            {audioOutputDevices.map(device => (
              <MenuItem value={device.deviceId} key={device.deviceId}>
                {device.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <>
          <Typography variant="subtitle2">
            {translator(t.audioOutput)}
          </Typography>
          <Typography>
            {activeOutputLabel || translator(t.defaultAudioOutput)}
          </Typography>
        </>
      )}
    </div>
  );
}
